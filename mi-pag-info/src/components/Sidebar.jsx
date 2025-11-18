"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"

export default function Sidebar() {
  const [expandedUnidad, setExpandedUnidad] = useState(1)
  const location = useLocation()

  const toggleUnidad = (unidadNum) => {
    setExpandedUnidad(expandedUnidad === unidadNum ? null : unidadNum)
  }

  const unidades = [
    {
      numero: 1,
      titulo: "Fundamentos",
      icon: "📖",
      temas: [
        { to: "/Arquitectura-organizacion", text: "Arquitectura y Organización", icon: "📐" },
        { to: "/evolucion", text: "Evolución de las Computadoras", icon: "🔄" },
        { to: "/maquina-secuencial", text: "Máquina Secuencial", icon: "💾" },
      ],
    },
    {
      numero: 2,
      titulo: "Organización del CPU",
      icon: "⚙️",
      temas: [
        { to: "/procesador", text: "El Procesador", icon: "🔧" },
        { to: "/ciclo-instruccion", text: "Ciclo de Instrucción", icon: "🔧" }
      ],
    },
    {
      numero: 3,
      titulo: "Diseño Del Conjunto De Instrucciones",
      icon: "💿",
      temas: [
        { to: "/unidad-conjunto-instrucciones", text: " Conjunto De Instrucciones", icon: "💿" },
      ],
    },
    {
      numero: 4,
      titulo: "Unidad De Ejecucion",
      icon: "🔌",
      temas: [
        { to: "/Unidad-ejecucion", text: "Unidad De Ejecucion", icon: "🔌" },
      ],
    },
    {
      numero: 5,
      titulo: "Unidad De Control",
      icon: "🚀",
      temas: [
        { to: "/Unidad-control", text: "Unidad De Control", icon: "🚀" },
      ],
    },
    {
      numero: 6,
      titulo: "Sistema De Memoria",
      icon: "⚡",
      temas: [
        { to: "/sistema-memoria", text: "Sistema De Memoria", icon: "⚡" },
      ],
    },
    {
      numero: 7,
      titulo: "Sistemas De Entrada Salida",
      icon: "🔀",
      temas: [
        { to: "/entrada-salida", text: "Sistema De Entrada/Salida", icon: "🔀" },
      ],
    },
  ]

  return (
    <aside
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
        width: "320px",
        background: "linear-gradient(180deg, #1a1f3a 0%, #0f1729 100%)",
        borderRight: "2px solid #2d3748",
        overflowY: "auto",
        zIndex: 1000,
        boxShadow: "4px 0 20px rgba(0, 0, 0, 0.5)",
      }}
    >
      {/* Header del Sidebar */}
      <div
        style={{
          padding: "1.5rem",
          borderBottom: "2px solid #2d3748",
          background: "rgba(108, 93, 211, 0.1)",
        }}
      >
        <Link to="/" style={{ textDecoration: "none" }}>
          <h1
            style={{
              margin: 0,
              fontSize: "1.25rem",
              fontWeight: "700",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              lineHeight: 1.3,
            }}
          >
            <img
            src="/Logo_UNI.PNG"
            alt="Logo"
            style={{
            width: "8rem",   // tamaño parecido a 1.5rem pero un poco más grande
            height: "1.8rem",
            objectFit: "contain",
            }}
          />
            <span>Arquitectura de Máquina II</span>
          </h1>
        </Link>
      </div>

      {/* Lista de Unidades */}
      <div style={{ padding: "1rem" }}>
        {unidades.map((unidad) => (
          <div
            key={unidad.numero}
            style={{
              marginBottom: "0.5rem",
              border: "2px solid #2d3748",
              borderRadius: "12px",
              overflow: "hidden",
              background: "#252d4a",
            }}
          >
            {/* Botón de Unidad */}
            <button
              onClick={() => toggleUnidad(unidad.numero)}
              disabled={unidad.temas.length === 0}
              style={{
                width: "100%",
                background:
                  expandedUnidad === unidad.numero
                    ? "linear-gradient(135deg, rgba(108, 93, 211, 0.3) 0%, rgba(108, 93, 211, 0.2) 100%)"
                    : unidad.temas.length === 0
                      ? "#1a1f3a"
                      : "#252d4a",
                border: "none",
                padding: "0.875rem 1rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: unidad.temas.length === 0 ? "not-allowed" : "pointer",
                transition: "all 0.2s ease",
                opacity: unidad.temas.length === 0 ? 0.5 : 1,
              }}
              onMouseOver={(e) => {
                if (unidad.temas.length > 0 && expandedUnidad !== unidad.numero) {
                  e.currentTarget.style.background = "rgba(108, 93, 211, 0.15)"
                }
              }}
              onMouseOut={(e) => {
                if (unidad.temas.length > 0 && expandedUnidad !== unidad.numero) {
                  e.currentTarget.style.background = "#252d4a"
                }
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                <span style={{ fontSize: "1.25rem" }}>{unidad.icon}</span>
                <div style={{ textAlign: "left" }}>
                  <div style={{ fontWeight: "700", fontSize: "0.875rem", color: "#ffffff" }}>
                    Unidad {unidad.numero}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "#a0aec0", marginTop: "0.125rem" }}>{unidad.titulo}</div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                {unidad.temas.length === 0 && (
                  <span
                    style={{
                      fontSize: "0.625rem",
                      color: "#718096",
                      fontWeight: "600",
                      background: "#2d3748",
                      padding: "0.25rem 0.5rem",
                      borderRadius: "6px",
                    }}
                  >
                    Próximamente
                  </span>
                )}
                {unidad.temas.length > 0 && (
                  <span style={{ fontSize: "0.875rem", color: "#a0aec0" }}>
                    {expandedUnidad === unidad.numero ? "▲" : "▼"}
                  </span>
                )}
              </div>
            </button>

            {/* Temas de la Unidad */}
            {expandedUnidad === unidad.numero && unidad.temas.length > 0 && (
              <div
                style={{
                  background: "#1a1f3a",
                  padding: "0.5rem",
                  borderTop: "2px solid #2d3748",
                }}
              >
                {unidad.temas.map((tema, index) => {
                  const isActive = location.pathname === tema.to
                  return (
                    <Link
                      key={index}
                      to={tema.to}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.625rem",
                        padding: "0.75rem 0.875rem",
                        margin: "0.25rem 0",
                        borderRadius: "8px",
                        textDecoration: "none",
                        color: isActive ? "#ffffff" : "#e4e7eb",
                        fontSize: "0.875rem",
                        fontWeight: isActive ? "600" : "500",
                        transition: "all 0.2s ease",
                        background: isActive ? "#6c5dd3" : "#252d4a",
                        borderLeft: isActive ? "3px solid #ffffff" : "3px solid transparent",
                      }}
                      onMouseOver={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.background = "#6c5dd3"
                          e.currentTarget.style.transform = "translateX(4px)"
                          e.currentTarget.style.color = "#ffffff"
                        }
                      }}
                      onMouseOut={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.background = "#252d4a"
                          e.currentTarget.style.transform = "translateX(0)"
                          e.currentTarget.style.color = "#e4e7eb"
                        }
                      }}
                    >
                      <span style={{ fontSize: "1rem" }}>{tema.icon}</span>
                      <span style={{ flex: 1, lineHeight: 1.3 }}>{tema.text}</span>
                    </Link>
                  )
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </aside>
  )
}
