import TopicCard from "../../components/TopicCard"
import ImageCard from "../../components/ImageCard"
import ImageCarousel from "../../components/ImageCarousel"
import VideoCard from "../../components/VideoCard"
import DefinitionCard from "../../components/DefinitionCard"
import PowerPointCarousel from "../../components/PowerPointCarousel"
import Unidad6 from "../../data/Unidad6.json"

export default function ArquitecturaOrganizacion() {
  const tema = Unidad6.find((t) => t.id === 1)

  return (
    <div style={{ 
      maxWidth: "1400px", 
      margin: "0 auto", 
      padding: "2rem 1rem",
      minHeight: "100vh",
      background: "linear-gradient(135deg, rgba(15, 23, 41, 0.8) 0%, rgba(26, 31, 58, 0.9) 100%)"
    }}>
      {/* Header Section */}
      <div style={{
        textAlign: "center",
        marginBottom: "3rem",
        padding: "3rem 2rem",
        background: "linear-gradient(135deg, rgba(108, 93, 211, 0.15) 0%, rgba(139, 126, 232, 0.15) 100%)",
        borderRadius: "24px",
        border: "2px solid rgba(108, 93, 211, 0.3)",
        backdropFilter: "blur(20px)",
        boxShadow: "0 20px 40px rgba(108, 93, 211, 0.1)",
        position: "relative",
        overflow: "hidden"
      }}>
        {/* Background decoration */}
        <div style={{
          position: "absolute",
          top: "-50%",
          right: "-20%",
          width: "200px",
          height: "200px",
          background: "radial-gradient(circle, rgba(108, 93, 211, 0.1) 0%, transparent 70%)",
          borderRadius: "50%"
        }} />
        <div style={{
          position: "absolute",
          bottom: "-30%",
          left: "-15%",
          width: "150px",
          height: "150px",
          background: "radial-gradient(circle, rgba(139, 126, 232, 0.1) 0%, transparent 70%)",
          borderRadius: "50%"
        }} />
        
        <h1
          style={{
            color: "#ffffff",
            marginBottom: "1rem",
            fontSize: "clamp(2rem, 5vw, 3rem)",
            fontWeight: "800",
            background: "linear-gradient(135deg, #6c5dd3 0%,rgb(252, 252, 252) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            textShadow: "0 4px 20px rgba(108, 93, 211, 0.3)",
            position: "relative",
            zIndex: 1
          }}
        >
          Tema 6.1: Sistema De Memoria
        </h1>
        <p style={{
          fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
          color: "#a0aec0",
          maxWidth: "600px",
          margin: "0 auto",
          lineHeight: 1.6,
          position: "relative",
          zIndex: 1
        }}>


        </p>
      </div>

      {/* Main Content Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
        gap: "2rem",
        marginBottom: "2rem",
        alignItems: "start"
      }}>
        {/* Left Column - Main Content */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
          order: 1
        }}>
          {/* Definiciones */}
          {tema.definiciones &&
            tema.definiciones.map((def, index) => (
              <DefinitionCard 
                key={index} 
                termino={def.termino} 
                definicion={def.definicion} 
                ejemplo={def.ejemplo} 
              />
            ))}

          {/* Contenido principal */}
          <TopicCard 
            titulo={tema.titulo} 
            descripcion={tema.descripcion} 
            detalles={tema.detalles} 
          />
        </div>

        {/* Right Column - Media Content */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
          order: 2,
          position: "sticky",
          top: "2rem",
          height: "fit-content"
        }}>

          {/* PowerPoint complementario */}
          {tema.powerpoint && tema.powerpoint.url && (
            <div style={{
              background: "rgba(30, 38, 64, 0.6)",
              borderRadius: "16px",
              padding: "1rem",
              border: "1px solid rgba(108, 93, 211, 0.2)",
              backdropFilter: "blur(10px)"
            }}>
              <PowerPointCarousel 
                archivoUrl={tema.powerpoint.url}
                titulo={tema.powerpoint.titulo || "Presentación PowerPoint"}
              />
            </div>
          )}

          {/* Video complementario */}
          {tema.video && (
            <div style={{
              background: "rgba(30, 38, 64, 0.6)",
              borderRadius: "16px",
              padding: "1rem",
              border: "1px solid rgba(108, 93, 211, 0.2)",
              backdropFilter: "blur(10px)"
            }}>
              <VideoCard 
                titulo={tema.video.titulo} 
                descripcion={tema.video.descripcion} 
                videoId={tema.video.id} 
              />
            </div>
          )}
        </div>
      </div>

      {/* Additional CSS for better responsive behavior */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @media (max-width: 768px) {
            .main-content-grid {
              grid-template-columns: 1fr !important;
              gap: 1rem !important;
            }
            .sticky-column {
              position: static !important;
              order: 1 !important;
            }
            .content-column {
              order: 2 !important;
            }
          }
          
          @media (max-width: 480px) {
            .main-content-grid {
              grid-template-columns: 1fr !important;
              gap: 0.5rem !important;
            }
          }
        `
      }} />
    </div>
  )
}
