"use client"

import React from "react"
import { createPortal } from "react-dom"

export default function ImageCarousel({ imagenes = [] }) {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [isHovered, setIsHovered] = React.useState(false)
  const [isModalOpen, setIsModalOpen] = React.useState(false)

  const hasImages = Array.isArray(imagenes) && imagenes.length > 0
  const current = hasImages ? imagenes[currentIndex] : null

  const goPrev = () => {
    if (!hasImages) return
    setCurrentIndex((prev) => (prev === 0 ? imagenes.length - 1 : prev - 1))
  }

  const goNext = () => {
    if (!hasImages) return
    setCurrentIndex((prev) => (prev === imagenes.length - 1 ? 0 : prev + 1))
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

  const modalContent = isModalOpen && hasImages && createPortal(
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
      {/* Botón cerrar */}
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
        onMouseEnter={(e) => {
          e.target.style.background = "rgba(255, 255, 255, 0.2)"
          e.target.style.transform = "rotate(90deg)"
        }}
        onMouseLeave={(e) => {
          e.target.style.background = "rgba(255, 255, 255, 0.1)"
          e.target.style.transform = "rotate(0deg)"
        }}
      >
        ✕
      </button>

      {/* Contador de imágenes */}
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
        {currentIndex + 1} / {imagenes.length}
      </div>

      {/* Botón anterior */}
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
        onMouseEnter={(e) => {
          e.target.style.background = "rgba(255, 255, 255, 0.2)"
          e.target.style.transform = "scale(1.1)"
        }}
        onMouseLeave={(e) => {
          e.target.style.background = "rgba(255, 255, 255, 0.1)"
          e.target.style.transform = "scale(1)"
        }}
      >
        ‹
      </button>

      {/* Imagen grande */}
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
      </div>

      {/* Botón siguiente */}
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
        onMouseEnter={(e) => {
          e.target.style.background = "rgba(255, 255, 255, 0.2)"
          e.target.style.transform = "scale(1.1)"
        }}
        onMouseLeave={(e) => {
          e.target.style.background = "rgba(255, 255, 255, 0.1)"
          e.target.style.transform = "scale(1)"
        }}
      >
        ›
      </button>
    </div>,
    document.body
  )

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
          height: "300px",
          overflow: "hidden",
          backgroundColor: "#252d4a",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {hasImages ? (
          <img
            src={current.url}
            alt={current.alt}
            onClick={openModal}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.4s ease",
              transform: isHovered ? "scale(1.05)" : "scale(1)",
              cursor: "pointer",
            }}
          />
        ) : (
          <div style={{ textAlign: "center", color: "#a0aec0", padding: "2rem" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🖼️</div>
            <p style={{ margin: 0, fontSize: "1rem" }}>No hay imágenes disponibles</p>
          </div>
        )}

        {hasImages && (
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
              {imagenes.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  aria-label={`Ir a la imagen ${i + 1}`}
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "999px",
                    border: 0,
                    background: i === currentIndex ? "#8b7ee8" : "rgba(255,255,255,0.5)",
                    cursor: "pointer",
                  }}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div style={{ padding: "1.75rem" }}>
        {current && (
          <>
            <h3
              style={{
                color: "#ffffff",
                fontSize: "1.5rem",
                fontWeight: "700",
                marginBottom: "0.75rem",
                marginTop: 0,
              }}
            >
              {current.alt}
            </h3>
            <p
              style={{
                color: "#a0aec0",
                fontSize: "1rem",
                lineHeight: "1.7",
                margin: 0,
              }}
            >
              {current.descripcion}
            </p>
          </>
        )}
      </div>
      {modalContent}
    </div>
  )
}


