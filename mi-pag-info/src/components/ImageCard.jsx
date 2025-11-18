"use client"

import React from "react"
import { createPortal } from "react-dom"

export default function ImageCard({ titulo, descripcion, imagenUrl, alt }) {
  const [isHovered, setIsHovered] = React.useState(false)
  const [imageError, setImageError] = React.useState(false)
  const [isModalOpen, setIsModalOpen] = React.useState(false)

  const handleImageError = () => {
    setImageError(true)
  }

  const openModal = () => {
    if (imagenUrl && !imageError) {
      setIsModalOpen(true)
    }
  }

  const closeModal = () => {
    setIsModalOpen(false)
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
          width: "100%",
          height: "300px",
          overflow: "hidden",
          backgroundColor: "#252d4a",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {imageError || !imagenUrl ? (
          <div style={{
            textAlign: "center",
            color: "#a0aec0",
            padding: "2rem"
          }}>
            <div style={{
              fontSize: "3rem",
              marginBottom: "1rem"
            }}>🖼️</div>
            <p style={{ margin: 0, fontSize: "1rem" }}>
              {imageError ? "Error al cargar la imagen" : "Imagen no disponible"}
            </p>
            <p style={{ margin: "0.5rem 0 0 0", fontSize: "0.8rem", opacity: 0.7 }}>
              URL: {imagenUrl || "No proporcionado"}
            </p>
          </div>
        ) : (
          <img
            src={imagenUrl}
            alt={alt}
            onError={handleImageError}
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
          {descripcion}
        </p>
      </div>

      {/* Modal para imagen expandida */}
      {isModalOpen && imagenUrl && !imageError && createPortal(
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
              src={imagenUrl}
              alt={alt}
              style={{
                maxWidth: "100%",
                maxHeight: "90vh",
                objectFit: "contain",
                borderRadius: "12px",
                boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
              }}
            />
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}
