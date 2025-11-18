"use client"

import React, { useState, useEffect } from "react"
import { createPortal } from "react-dom"

export default function PowerPointCarousel({ archivoUrl, titulo = "Presentación PowerPoint" }) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [slides, setSlides] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!archivoUrl) {
      setError("No se proporcionó una URL del archivo PowerPoint")
      setLoading(false)
      return
    }

    // Intentar cargar y parsear el PowerPoint
    loadPowerPoint(archivoUrl)
  }, [archivoUrl])

  const loadPowerPoint = async (url) => {
    try {
      setLoading(true)
      setError(null)

      // Si la URL es de Office Online o OneDrive, usar iframe con el visor embebido
      if (url.includes('office.com') || url.includes('onedrive.live.com') || url.includes('sharepoint') || url.includes('1drv.ms')) {
        // Convertir URL de OneDrive/SharePoint a formato de visor
        let viewerUrl = url
        
        // Si es una URL corta de OneDrive (1drv.ms), expandirla primero
        if (url.includes('1drv.ms')) {
          try {
            // Intentar expandir la URL corta siguiendo la redirección
            const response = await fetch(url, { method: 'HEAD', redirect: 'follow' })
            const expandedUrl = response.url || url
            
            // Convertir la URL expandida al formato de OneDrive para compartir
            // Las URLs de OneDrive compartidas tienen formato: https://onedrive.live.com/...
            // Si la URL expandida es de OneDrive, usarla directamente
            if (expandedUrl.includes('onedrive.live.com') || expandedUrl.includes('sharepoint.com')) {
              viewerUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(expandedUrl)}`
            } else {
              // Si no se pudo expandir, intentar con la URL original
              viewerUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(url)}`
            }
          } catch (err) {
            // Si falla la expansión, intentar con la URL original
            console.warn('No se pudo expandir la URL de OneDrive, usando URL original:', err)
            viewerUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(url)}`
          }
        } else if (url.includes('onedrive.live.com') || url.includes('sharepoint')) {
          // Formato para Office Online Viewer
          viewerUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(url)}`
        }
        
        setSlides([{ type: 'iframe', url: viewerUrl }])
        setLoading(false)
        return
      }

      // Verificar si es una URL de Google Presentations y mostrar advertencia si es necesario
      if (url.includes('docs.google.com/presentation') && url.includes('/edit')) {
        console.log('⚠️ URL de edición detectada. Se convertirá automáticamente a formato de visualización.')
      }

      // Si es Google Drive o Google Docs/Presentations, usar el visor de Google
      if (url.includes('drive.google.com') || url.includes('docs.google.com')) {
        let fileId = null
        let viewerUrl = null
        
        // Detectar Google Presentations
        if (url.includes('docs.google.com/presentation')) {
          fileId = url.match(/\/presentation\/d\/([a-zA-Z0-9-_]+)/)?.[1]
          if (fileId) {
            // Intentar primero con el formato de publicación (pub) que es mejor para incrustar
            // Si no funciona, el usuario puede cambiar a /preview manualmente
            viewerUrl = `https://docs.google.com/presentation/d/${fileId}/preview?rm=minimal&usp=embed_googleplus`
          }
        }
        // Detectar Google Drive (archivos)
        else if (url.includes('drive.google.com')) {
          fileId = url.match(/\/d\/([a-zA-Z0-9-_]+)/)?.[1]
          if (fileId) {
            viewerUrl = `https://drive.google.com/file/d/${fileId}/preview`
          }
        }
        // Detectar Google Docs (documentos)
        else if (url.includes('docs.google.com/document')) {
          fileId = url.match(/\/document\/d\/([a-zA-Z0-9-_]+)/)?.[1]
          if (fileId) {
            viewerUrl = `https://docs.google.com/document/d/${fileId}/preview`
          }
        }
        
        if (viewerUrl) {
          setSlides([{ type: 'iframe', url: viewerUrl }])
          setLoading(false)
          return
        }
      }

      // Intentar cargar el archivo PPTX local
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`Error al cargar el archivo: ${response.statusText}`)
      }

      const blob = await response.blob()
      
      // Verificar que sea un archivo PPTX
      if (!blob.type.includes('presentation') && !url.endsWith('.pptx') && !url.endsWith('.ppt')) {
        throw new Error("El archivo no parece ser un PowerPoint válido")
      }

      const arrayBuffer = await blob.arrayBuffer()

      // Parsear el PPTX usando JSZip
      const JSZip = (await import('jszip')).default
      const zip = await JSZip.loadAsync(arrayBuffer)
      
      // Extraer las diapositivas
      const slideFiles = []
      
      // Buscar todas las diapositivas
      zip.forEach((relativePath) => {
        const match = relativePath.match(/ppt\/slides\/slide(\d+)\.xml/)
        if (match) {
          slideFiles.push(parseInt(match[1]))
        }
      })

      // Ordenar las diapositivas
      slideFiles.sort((a, b) => a - b)

      if (slideFiles.length === 0) {
        throw new Error("No se encontraron diapositivas en el archivo")
      }

      // Para cada diapositiva, intentar extraer imágenes
      const slidesData = []
      for (const index of slideFiles) {
        try {
          const relsFile = zip.file(`ppt/slides/_rels/slide${index}.xml.rels`)
          
          // Buscar imágenes en la diapositiva
          const imageFiles = []
          if (relsFile) {
            const relsContent = await relsFile.async('string')
            const imageMatches = relsContent.match(/Target="media\/([^"]+)"/g)
            if (imageMatches) {
              imageMatches.forEach(match => {
                const imagePath = match.match(/media\/([^"]+)/)?.[1]
                if (imagePath) {
                  imageFiles.push(`ppt/media/${imagePath}`)
                }
              })
            }
          }

          // Si hay imágenes, usar la primera como preview
          if (imageFiles.length > 0) {
            const imageBlob = await zip.file(imageFiles[0]).async('blob')
            const imageUrl = URL.createObjectURL(imageBlob)
            slidesData.push({
              index,
              type: 'image',
              url: imageUrl,
              alt: `Diapositiva ${index}`
            })
          } else {
            // Si no hay imagen, crear un placeholder
            slidesData.push({
              index,
              type: 'placeholder',
              alt: `Diapositiva ${index}`
            })
          }
        } catch (err) {
          console.error(`Error procesando diapositiva ${index}:`, err)
          slidesData.push({
            index,
            type: 'error',
            alt: `Diapositiva ${index} - Error al cargar`
          })
        }
      }

      setSlides(slidesData)
      setLoading(false)
    } catch (err) {
      console.error("Error al cargar PowerPoint:", err)
      setError(`Error: ${err.message}. Asegúrate de que el archivo esté accesible públicamente o usa un servicio como OneDrive/Google Drive.`)
      setLoading(false)
    }
  }

  const goPrev = () => {
    if (slides.length === 0) return
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  const goNext = () => {
    if (slides.length === 0) return
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const modalGoPrev = (e) => {
    e.stopPropagation()
    goPrev()
  }

  const modalGoNext = (e) => {
    e.stopPropagation()
    goNext()
  }

  const current = slides[currentSlide]

  const modalContent = isModalOpen && current && createPortal(
    <div
      onClick={closeModal}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0, 0, 0, 0.95)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        padding: "2rem",
      }}
    >
      <button
        onClick={closeModal}
        style={{
          position: "absolute",
          top: "2rem",
          right: "2rem",
          background: "rgba(255, 255, 255, 0.1)",
          border: "2px solid rgba(255, 255, 255, 0.3)",
          borderRadius: "50%",
          width: "50px",
          height: "50px",
          color: "#fff",
          fontSize: "1.5rem",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.3s ease",
          zIndex: 10000,
        }}
      >
        ✕
      </button>

      <div
        style={{
          position: "absolute",
          top: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          background: "rgba(0, 0, 0, 0.6)",
          padding: "0.5rem 1rem",
          borderRadius: "20px",
          color: "#8b7ee8",
          fontSize: "0.9rem",
          fontWeight: "600",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(139, 126, 232, 0.3)",
        }}
      >
        {currentSlide + 1} / {slides.length}
      </div>

      <button
        onClick={modalGoPrev}
        style={{
          position: "absolute",
          left: "2rem",
          background: "rgba(255, 255, 255, 0.1)",
          border: "2px solid rgba(255, 255, 255, 0.3)",
          borderRadius: "50%",
          width: "60px",
          height: "60px",
          color: "#fff",
          fontSize: "2rem",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.3s ease",
        }}
      >
        ‹
      </button>

      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          maxWidth: "90vw",
          maxHeight: "90vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {current.type === 'iframe' ? (
          <iframe
            src={current.url}
            allow="fullscreen"
            allowFullScreen
            style={{
              width: "90vw",
              height: "90vh",
              border: "none",
              borderRadius: "12px",
            }}
            title="Presentación PowerPoint"
          />
        ) : current.type === 'image' ? (
          <img
            src={current.url}
            alt={current.alt}
            style={{
              maxWidth: "100%",
              maxHeight: "90vh",
              objectFit: "contain",
              borderRadius: "12px",
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
            }}
          />
        ) : (
          <div style={{
            background: "#fff",
            padding: "2rem",
            borderRadius: "12px",
            color: "#000",
            maxWidth: "800px",
            maxHeight: "90vh",
            overflow: "auto"
          }}>
            <p>{current.alt}</p>
          </div>
        )}
      </div>

      <button
        onClick={modalGoNext}
        style={{
          position: "absolute",
          right: "2rem",
          background: "rgba(255, 255, 255, 0.1)",
          border: "2px solid rgba(255, 255, 255, 0.3)",
          borderRadius: "50%",
          width: "60px",
          height: "60px",
          color: "#fff",
          fontSize: "2rem",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.3s ease",
        }}
      >
        ›
      </button>
    </div>,
    document.body
  )

  if (loading) {
    return (
      <div style={{
        border: "2px solid #2d3748",
        borderRadius: "20px",
        padding: "3rem",
        textAlign: "center",
        backgroundColor: "#1e2640",
      }}>
        <div style={{ color: "#8b7ee8", fontSize: "2rem", marginBottom: "1rem" }}>⏳</div>
        <p style={{ color: "#a0aec0" }}>Cargando presentación...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div style={{
        border: "2px solid #2d3748",
        borderRadius: "20px",
        padding: "3rem",
        textAlign: "center",
        backgroundColor: "#1e2640",
      }}>
        <div style={{ color: "#e53e3e", fontSize: "2rem", marginBottom: "1rem" }}>⚠️</div>
        <p style={{ color: "#a0aec0", marginBottom: "1rem" }}>{error}</p>
        <div style={{ 
          background: "rgba(108, 93, 211, 0.1)", 
          borderRadius: "12px", 
          padding: "1.5rem", 
          marginTop: "1.5rem",
          textAlign: "left"
        }}>
          <p style={{ color: "#8b7ee8", fontWeight: "600", marginBottom: "0.5rem" }}>
            💡 Soluciones para Google Presentations:
          </p>
          <ol style={{ color: "#a0aec0", fontSize: "0.9rem", margin: 0, paddingLeft: "1.5rem" }}>
            <li style={{ marginBottom: "0.5rem" }}>
              <strong>Publicar la presentación:</strong>
              <ul style={{ marginTop: "0.25rem", paddingLeft: "1.5rem" }}>
                <li>Abre tu presentación en Google Slides</li>
                <li>Ve a <strong>Archivo → Compartir → Publicar en la web</strong></li>
                <li>Selecciona "Vínculo" y haz clic en "Publicar"</li>
                <li>Copia la URL de publicación y úsala en lugar de la URL de edición</li>
              </ul>
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              O verifica que la presentación esté configurada como <strong>"Cualquiera con el vínculo puede ver"</strong>
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              Alternativa: Sube el archivo .pptx a Google Drive (no como Google Presentation) y comparte el enlace
            </li>
            <li>
              Otra opción: Convierte las diapositivas a imágenes (PNG/JPG) y úsalas en el carrusel de imágenes
            </li>
          </ol>
        </div>
      </div>
    )
  }

  if (slides.length === 0) {
    return (
      <div style={{
        border: "2px solid #2d3748",
        borderRadius: "20px",
        padding: "3rem",
        textAlign: "center",
        backgroundColor: "#1e2640",
      }}>
        <div style={{ color: "#a0aec0", fontSize: "2rem", marginBottom: "1rem" }}>📄</div>
        <p style={{ color: "#a0aec0" }}>No se encontraron diapositivas</p>
      </div>
    )
  }

  return (
    <div
      style={{
        border: "2px solid #2d3748",
        borderRadius: "20px",
        overflow: "hidden",
        marginBottom: "2rem",
        backgroundColor: "#1e2640",
        boxShadow: isHovered ? "0 12px 32px rgba(108, 93, 211, 0.3)" : "0 4px 12px rgba(0, 0, 0, 0.3)",
        transform: isHovered ? "translateY(-6px)" : "translateY(0)",
        transition: "all 0.4s ease",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "400px",
          overflow: "hidden",
          backgroundColor: "#252d4a",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {current.type === 'iframe' ? (
          <iframe
            src={current.url}
            allow="fullscreen"
            allowFullScreen
            style={{
              width: "100%",
              height: "100%",
              border: "none",
            }}
            title="Presentación PowerPoint"
          />
        ) : current.type === 'image' ? (
          <img
            src={current.url}
            alt={current.alt}
            onClick={openModal}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              transition: "transform 0.4s ease",
              transform: isHovered ? "scale(1.05)" : "scale(1)",
              cursor: "pointer",
              backgroundColor: "#fff",
            }}
          />
        ) : current.type === 'placeholder' ? (
          <div
            onClick={openModal}
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#fff",
              color: "#000",
              padding: "2rem",
              cursor: "pointer",
            }}
          >
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📄</div>
            <p style={{ margin: 0, fontWeight: "600" }}>{current.alt}</p>
            <p style={{ margin: "0.5rem 0 0 0", fontSize: "0.9rem", color: "#666" }}>
              (Contenido no disponible como imagen)
            </p>
          </div>
        ) : (
          <div
            onClick={openModal}
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#fff",
              color: "#000",
              padding: "2rem",
              cursor: "pointer",
            }}
          >
            <p>{current.alt}</p>
          </div>
        )}

        {slides.length > 1 && (
          <>
            <button
              onClick={goPrev}
              aria-label="Anterior"
              style={{
                position: "absolute",
                left: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "rgba(0,0,0,0.4)",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "999px",
                width: "36px",
                height: "36px",
                cursor: "pointer",
                backdropFilter: "blur(4px)",
              }}
            >
              ‹
            </button>
            <button
              onClick={goNext}
              aria-label="Siguiente"
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "rgba(0,0,0,0.4)",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "999px",
                width: "36px",
                height: "36px",
                cursor: "pointer",
                backdropFilter: "blur(4px)",
              }}
            >
              ›
            </button>

            <div
              style={{
                position: "absolute",
                bottom: "10px",
                left: 0,
                right: 0,
                display: "flex",
                justifyContent: "center",
                gap: "6px",
              }}
            >
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  aria-label={`Ir a la diapositiva ${i + 1}`}
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "999px",
                    border: 0,
                    background: i === currentSlide ? "#8b7ee8" : "rgba(255,255,255,0.5)",
                    cursor: "pointer",
                  }}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div style={{ padding: "1.75rem" }}>
        <h3
          style={{
            color: "#ffffff",
            fontSize: "1.5rem",
            fontWeight: "700",
            marginBottom: "0.75rem",
            marginTop: 0,
          }}
        >
          {titulo}
        </h3>
        <p
          style={{
            color: "#a0aec0",
            fontSize: "1rem",
            lineHeight: "1.7",
            margin: 0,
          }}
        >
          Diapositiva {currentSlide + 1} de {slides.length}
        </p>
      </div>
      {modalContent}
    </div>
  )
}

