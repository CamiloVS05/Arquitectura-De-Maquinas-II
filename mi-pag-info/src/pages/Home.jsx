"use client"

import { Link } from "react-router-dom"

export default function Home() {
  const unidades = [
    { id: 1, nombre: "Unidad 1", descripcion: "Fundamentos de Arquitectura", activa: true, icon: "📖", ruta: "/Arquitectura-organizacion" },
    { id: 2, nombre: "Unidad 2", descripcion: "Organización del CPU", activa: true, icon: "⚙️", ruta: "/procesador" },
    { id: 3, nombre: "Unidad 3", descripcion: "Diseño Del Conjunto De Instrucciones", activa: true, icon: "💿", ruta: "/unidad-conjunto-instrucciones" },
    { id: 4, nombre: "Unidad 4", descripcion: "Unidad de Ejecucion", activa: true, icon: "🔌", ruta: "/unidad-ejecucion" },
    { id: 5, nombre: "Unidad 5", descripcion: "Unidad Control", activa: true, icon: "🚀", ruta: "/unidad-control" },
    { id: 6, nombre: "Unidad 6", descripcion: "Sistema De Memoria", activa: true, icon: "⚡", ruta:"sistema-memoria" },
    { id: 7, nombre: "Unidad 7", descripcion: "Sistemas De Entrada/Salida", activa: true, icon: "🔀", ruta: "/entrada-salida" },
  ]

  return (
    
    <main style={{ maxWidth: "1400px", margin: "0 auto", padding: "2rem 1rem" }}>
       <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "2rem" }}>
        <Link
          to="/about"
          style={{
            padding: "0.75rem 1.5rem",
            background: "linear-gradient(135deg, #6c5dd3 0%, #8b7ee8 100%)",
            color: "#ffffff",
            borderRadius: "12px",
            textDecoration: "none",
            fontWeight: "600",
            transition: "all 0.3s ease",
            boxShadow: "0 4px 12px rgba(108, 93, 211, 0.3)",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = "scale(1.05)"
            e.currentTarget.style.boxShadow = "0 6px 20px rgba(108, 93, 211, 0.5)"
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "scale(1)"
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(108, 93, 211, 0.3)"
          }}
        >
          👥 Acerca de Nosotros
        </Link>
      </div>
      
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <h1
          style={{
            fontSize: "3rem",
            fontWeight: "800",
            background: "linear-gradient(135deg, #6c5dd3 0%, #8b7ee8 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            marginBottom: "1rem",
          }}
        >
          Arquitectura de Máquina 2
        </h1>
        <p style={{ fontSize: "1.25rem", color: "#a0aec0", maxWidth: "700px", margin: "0 auto", lineHeight: 1.6 }}>
          Explora los conceptos fundamentales de la arquitectura de computadoras a través de contenido interactivo y
          multimedia
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {unidades.map((unidad) => (
          <div
            key={unidad.id}
            style={{
              background: unidad.activa ? "#1e2640" : "#1a1f3a",
              borderRadius: "20px",
              padding: "2rem",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
              transition: "all 0.3s ease",
              opacity: unidad.activa ? 1 : 0.6,
              cursor: unidad.activa ? "pointer" : "not-allowed",
              border: "2px solid #2d3748",
            }}
            onMouseOver={(e) => {
              if (unidad.activa) {
                e.currentTarget.style.transform = "translateY(-8px)"
                e.currentTarget.style.boxShadow = "0 12px 32px rgba(108, 93, 211, 0.4)"
                e.currentTarget.style.borderColor = "#6c5dd3"
              }
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)"
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.3)"
              e.currentTarget.style.borderColor = "#2d3748"
            }}
          >
            <div
              style={{
                width: "70px",
                height: "70px",
                borderRadius: "16px",
                background: unidad.activa ? "linear-gradient(135deg, #6c5dd3 0%, #8b7ee8 100%)" : "#2d3748",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1.5rem",
                fontSize: "2rem",
              }}
            >
              <span>{unidad.icon}</span>
            </div>

            <h2 style={{ fontSize: "1.5rem", fontWeight: "700", color: "#ffffff", marginBottom: "0.5rem" }}>
              {unidad.nombre}
            </h2>
            <p style={{ color: "#a0aec0", marginBottom: "1.5rem", lineHeight: 1.6 }}>{unidad.descripcion}</p>

            {unidad.activa ? (
              <Link
                to={unidad.ruta}
                style={{
                  display: "inline-block",
                  padding: "0.875rem 1.75rem",
                  background: "linear-gradient(135deg, #6c5dd3 0%, #8b7ee8 100%)",
                  color: "#ffffff",
                  borderRadius: "12px",
                  textDecoration: "none",
                  fontWeight: "600",
                  transition: "all 0.3s ease",
                  boxShadow: "0 4px 12px rgba(108, 93, 211, 0.3)",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)"
                  e.currentTarget.style.boxShadow = "0 6px 20px rgba(108, 93, 211, 0.5)"
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "scale(1)"
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(108, 93, 211, 0.3)"
                }}
              >
                Ver temas
              </Link>
            ) : (

              
              <span
                style={{
                  display: "inline-block",
                  padding: "0.875rem 1.75rem",
                  background: "#2d3748",
                  color: "#718096",
                  borderRadius: "12px",
                  fontWeight: "600",
                }}
              >
                Próximamente
              </span>
            )}
          </div>
        ))}
      </div>
    </main>
  )
}
