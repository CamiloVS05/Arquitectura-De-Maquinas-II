import React from "react";
import "./index.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Sidebar from "./components/Sidebar";
import Evolucion from "./pages/Unidad_1/Evolucion";
import MaquinaSecuencial from "./pages/Unidad_1/MaquinaSecuencial";
import Procesador from "./pages/Unidad_2/Procesador"
import Home from "./pages/Home"
import ArquitecturaOrganizacion from "./pages/Unidad_1/ArquitecturaOrganizacion";
import CicloInstruccion from "./pages/Unidad_2/CicloInstruccion";
import ConjuntoInstrucciones from "./pages/Unidad_3/ConjuntoInstrucciones";
import UnidadEjecucion from "./pages/Unidad_4/UnidadEjecucion";
import UnidadControl from "./pages/Unidad_5/Control"
import SistemaMemoria from "./pages/Unidad_6/SistemaMemoria"
import EntradaSalida from "./pages/Unidad_7/EntradaSalida"
import About from "./pages/About";


export default function App() {
  return (
    
      <div style={{ display: "flex", minHeight: "100vh", background: "#0f1729" }}>
        <Sidebar />

        <main
          style={{
            marginLeft: "320px",
            flex: 1,
            padding: "2rem",
            minHeight: "100vh",
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Arquitectura-organizacion" element={<ArquitecturaOrganizacion />} />
            <Route path="/evolucion" element={<Evolucion />} />
            <Route path="/maquina-secuencial" element={<MaquinaSecuencial />} />
            <Route path="/procesador" element={<Procesador />} />
            <Route path="/ciclo-instruccion" element={<CicloInstruccion />} />
            <Route path="/unidad-conjunto-instrucciones" element={<ConjuntoInstrucciones />} />
            <Route path="/unidad-ejecucion" element={<UnidadEjecucion />} />
            <Route path="/unidad-control" element={<UnidadControl />} />
            <Route path="/sistema-memoria" element={<SistemaMemoria />} />
            <Route path="/entrada-salida" element={<EntradaSalida />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </div>

    
  );
}
