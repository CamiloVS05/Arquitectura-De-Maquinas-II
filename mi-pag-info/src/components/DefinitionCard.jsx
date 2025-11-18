"use client"

import React from "react"

export default function DefinitionCard({ termino, definicion, ejemplo }) {
  const [isHovered, setIsHovered] = React.useState(false)

  return (
    <div
      style={{
        border: "3px solid #6c5dd3",
        borderRadius: "16px",
        padding: "2rem",
        marginBottom: "2rem",
        backgroundColor: "#1e2640",
        boxShadow: isHovered ? "0 8px 24px rgba(108, 93, 211, 0.4)" : "0 4px 12px rgba(108, 93, 211, 0.2)",
        transform: isHovered ? "translateY(-4px)" : "translateY(0)",
        transition: "all 0.3s ease",
        position: "relative",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        style={{
          position: "absolute",
          top: "-12px",
          left: "24px",
          backgroundColor: "#6c5dd3",
          color: "#ffffff",
          padding: "0.5rem 1.25rem",
          borderRadius: "20px",
          fontSize: "0.875rem",
          fontWeight: "700",
          letterSpacing: "0.5px",
        }}
      >
        DEFINICIÓN
      </div>

      <h3
        style={{
          color: "#ffffff",
          fontSize: "1.75rem",
          fontWeight: "800",
          marginBottom: "1rem",
          marginTop: "0.5rem",
        }}
      >
        {termino}
      </h3>

      <p
        style={{
          color: "#a0aec0",
          fontSize: "1.1rem",
          lineHeight: "1.8",
          marginBottom: ejemplo ? "1.5rem" : 0,
          fontWeight: "500",
        }}
      >
        {definicion}
      </p>

      {ejemplo && (
        <div
          style={{
            backgroundColor: "#252d4a",
            padding: "1.25rem",
            borderRadius: "12px",
            borderLeft: "4px solid #6c5dd3",
          }}
        >
          <p
            style={{
              color: "#e4e7eb",
              fontSize: "0.95rem",
              margin: 0,
              fontStyle: "italic",
            }}
          >
            <strong style={{ color: "#8b7ee8" }}>Ejemplo:</strong> {ejemplo}
          </p>
        </div>
      )}
    </div>
  )
}
