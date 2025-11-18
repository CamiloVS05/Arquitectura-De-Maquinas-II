"use client"

import React, { useEffect, useState } from "react"
import TopicCard from "../components/TopicCard"

export default function Unidad2() {
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch("/src/data/unidad2.json")
      .then((response) => response.json())
      .then((jsonData) => setData(jsonData))
      .catch((error) => console.error("Error al cargar los datos de la Unidad 2:", error))
  }, [])

  if (!data) {
    return (
      <div className="container text-center mt-5">
        <h2 className="text-muted">Cargando contenido de la Unidad 2...</h2>
      </div>
    )
  }

  return (
    <div
      className="container mt-4"
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "2rem",
      }}
    >
      <h1
        style={{
          color: "#4a4a4a",
          textAlign: "center",
          marginBottom: "2rem",
          borderBottom: "3px solid #667eea",
          display: "inline-block",
          paddingBottom: "0.5rem",
        }}
      >
        {data.unidad}
      </h1>

      {data.temas.map((tema, index) => (
        <TopicCard
          key={index}
          titulo={tema.titulo}
          descripcion={tema.descripcion}
          detalles={tema.detalles}
        />
      ))}
    </div>
  )
}
