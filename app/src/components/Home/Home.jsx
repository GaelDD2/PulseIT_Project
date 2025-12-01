import React from "react";
import { useTranslation } from 'react-i18next'; // <- NUEVO IMPORT
import { Link } from "react-router-dom"; // <- CAMBIA <a> por <Link>
import supportImg from "../../assets/Software-Gestion-clinica.avif";

export function Home() {
  const { t } = useTranslation(); // <- NUEVO HOOK

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
          {t('home.title')}
        </h1>
        <p className="text-lg md:text-xl text-white/80 mb-6 drop-shadow">
          {t('home.subtitle')}
        </p>

        <div className="flex justify-center gap-4">
          <Link
            to="/tickets"
            className="px-6 py-3 bg-primary text-white rounded-lg font-semibold shadow-lg hover:bg-primary/90 transition"
          >
            {t('home.viewTickets')}
          </Link>
        </div>

        {/* Sección de características */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-2">{t('home.feature1.title')}</h3>
            <p className="text-sm text-white/80">
              {t('home.feature1.description')}
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-2">{t('home.feature2.title')}</h3>
            <p className="text-sm text-white/80">
              {t('home.feature2.description')}
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-2">{t('home.feature3.title')}</h3>
            <p className="text-sm text-white/80">
              {t('home.feature3.description')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 