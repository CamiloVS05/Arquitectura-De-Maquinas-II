"use client"

import { Link } from "react-router-dom"

export default function About() {
  const team = [
    {
      id: 1,
      nombre: "Alanis",
      edad: 21,
      carrera: "Ingeniería en Computación",
      descripcion: "Soy Alanis del Carmen Tobias Sotelo, estudiante de cuarto año de Ingeniería en Computación en la Universidad Nacional de Ingeniería. Me interesa la Arquitectura de Máquinas porque es clave para comprender el funcionamiento interno del hardware y su relación con el desempeño de los sistemas computacionales.",
      foto: "/alanis.jpg"
    },
    {
      id: 2,
      nombre: "Camilo",
      edad: 21,
      carrera: "Ingeniería en Computacion",
      descripcion: "jugador de legue of leyends y OTP SHEN",
      foto: "/camilo.jpg"
    },
    {
      id: 3,
      nombre: "Sergio",
      edad: 21,
      carrera: "Ingeniería en Computación",
      descripcion: "Me llamo Sergio Martínez, soy estudiante de ingeniería en computación. Esforzado y dispuesto por aprender en todo momento",
      foto: "/sergio.jpg"
    },
    {
      id: 4,
      nombre: "Alejandro",
      edad: 21,
      carrera: "Ingeniería en Computacion",
      descripcion: "Estudiante de Ingenieria de Computacion, apasiondo por el desarrollo web especialmente en el Backend (Novio de la Ingeniera Madeling Cabrera rojas ,, Lafise Sistematica ,,)",
      foto: "/ale.jpg"
    },
  ]

  return (
    <main style={{ maxWidth: "1400px", margin: "0 auto", padding: "2rem 1rem" }}>
      {/* Header */}
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
          Acerca de Nosotros
        </h1>
        <p style={{ fontSize: "1.25rem", color: "#a0aec0", maxWidth: "700px", margin: "0 auto", lineHeight: 1.6 }}>
          Somos un equipo apasionado de estudiantes de ingeniería comprometidos a compartir conocimiento sobre
          arquitectura de computadoras
        </p>
      </div>

      {/* Team Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "2rem",
          marginBottom: "3rem",
        }}
      >
        {team.map((member) => (
          <div
            key={member.id}
            style={{
              background: "#1e2640",
              borderRadius: "20px",
              overflow: "hidden",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
              transition: "all 0.3s ease",
              border: "2px solid #2d3748",
              cursor: "pointer",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-12px)"
              e.currentTarget.style.boxShadow = "0 12px 32px rgba(108, 93, 211, 0.4)"
              e.currentTarget.style.borderColor = "#6c5dd3"
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)"
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.3)"
              e.currentTarget.style.borderColor = "#2d3748"
            }}
          >
            {/* Foto */}
            <div
              style={{
                width: "100%",
                height: "280px",
                backgroundColor: "#2d3748",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={member.foto || "/placeholder.svg"}
                alt={member.nombre}
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                }}
              />
            </div>

            {/* Información */}
            <div style={{ padding: "1.5rem" }}>
              <h3 style={{ fontSize: "1.5rem", fontWeight: "700", color: "#ffffff", marginBottom: "0.25rem" }}>
                {member.nombre}
              </h3>
              <p style={{ color: "#6c5dd3", fontWeight: "600", marginBottom: "0.75rem" }}>
                {member.edad} años
              </p>
              <p style={{ color: "#a0aec0", marginBottom: "1rem", fontSize: "0.95rem" }}>
                {member.carrera}
              </p>
              <p style={{ color: "#cbd5e0", lineHeight: 1.6, fontSize: "0.95rem" }}>
                {member.descripcion}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Botón volver */}
      <div style={{ textAlign: "center" }}>
        <Link
          to="/"
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
          ← Volver al inicio
        </Link>
      </div>
    </main>
  )
}
