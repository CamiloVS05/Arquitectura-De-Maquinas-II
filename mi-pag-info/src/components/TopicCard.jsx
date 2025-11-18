"use client"

import React from "react"

export default function TopicCard({ titulo, descripcion, detalles }) {
  const [isHovered, setIsHovered] = React.useState(false)

  return (
    <div
      style={{
        border: "2px solid #e0e0e0",
        borderRadius: "16px",
        padding: "1.5rem",
        marginBottom: "1.5rem",
        backgroundColor: "#ffffff",
        boxShadow: isHovered ? "0 8px 24px rgba(102, 126, 234, 0.15)" : "0 2px 8px rgba(0, 0, 0, 0.08)",
        transform: isHovered ? "translateY(-4px)" : "translateY(0)",
        transition: "all 0.3s ease",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          background: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
          borderRadius: "16px 16px 0 0",
        }}
      />

      <h2
        style={{
          color: "#667eea",
          fontSize: "1.5rem",
          fontWeight: "700",
          marginTop: "0.5rem",
          marginBottom: "1rem",
          letterSpacing: "-0.5px",
        }}
      >
        {titulo}
      </h2>

      <p
        style={{
          color: "#4a5568",
          fontSize: "1rem",
          lineHeight: "1.6",
          marginBottom: "1.25rem",
        }}
      >
        {descripcion}
      </p>

      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {detalles.map((detalle, i) => (
          <li
            key={i}
            style={{
              padding: "1rem",
              marginBottom: "0.75rem",
              backgroundColor: "#f7fafc",
              borderRadius: "8px",
              borderLeft: "3px solid #667eea",
              transition: "all 0.2s ease",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "#edf2f7"
              e.currentTarget.style.transform = "translateX(4px)"
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "#f7fafc"
              e.currentTarget.style.transform = "translateX(0)"
            }}
          >
            <h3
              style={{
                color: "#2d3748",
                fontSize: "1.1rem",
                fontWeight: "600",
                marginBottom: "0.4rem",
              }}
            >
              ▸ {detalle.titulo}
            </h3>
            <p
              style={{
                color: "#4a5568",
                fontSize: "0.95rem",
                lineHeight: "1.6",
                margin: 0,
                whiteSpace: "pre-line",  //para el salto de linea
              }}
            >
              {detalle.descripcion}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}
