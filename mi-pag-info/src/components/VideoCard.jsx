"use client"

import React from "react"

export default function VideoCard({ titulo, descripcion, videoId }) {
  const [isHovered, setIsHovered] = React.useState(false)

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
          paddingBottom: "56.25%",
          height: 0,
          overflow: "hidden",
          backgroundColor: "#000000",
        }}
      >
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title={titulo}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        />
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
    </div>
  )
}
