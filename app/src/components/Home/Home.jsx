import React from "react";
import supportImg from "../../assets/Software-Gestion-clinica.avif";
import PulseITLogo from "../../assets/PulseITLogo.png";


export function Home() {
  return (
    <div className="relative w-full h-screen flex items-center justify-center text-center overflow-hidden">
      {/* Fondo */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: `url(${supportImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.3)",
        }}
      />

      {/* Contenido principal */}
      <div className="px-4 max-w-2xl text-white">
          
        <h1 className="text-6xl md:text-6xl font-bold text-white mb-6 drop-shadow">
         PulseIT
        </h1>
        <p className="text-lg md:text-xl text-white/80 mb-6 drop-shadow">
          Registra, asigna y controla tickets de soporte técnico con eficiencia.
        </p>

        <div className="flex justify-center gap-4">
          <a
            href="tickets"
            className="px-6 py-3 bg-primary text-white rounded-lg font-semibold shadow-lg hover:bg-primary/90 transition"
          >
            Ver Tickets
          </a>
          
        </div>

        {/* Sección de características */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-2">Gestión de Técnicos</h3>
            <p className="text-sm text-white/80">
              Asigna técnicos por especialidad y controla su carga de trabajo.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-2">Control de Tickets</h3>
            <p className="text-sm text-white/80">
              Registra incidentes y da seguimiento a su ciclo de vida completo.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-2">Reportes y SLA</h3>
            <p className="text-sm text-white/80">
              Visualiza métricas de cumplimiento y rendimiento técnico.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
