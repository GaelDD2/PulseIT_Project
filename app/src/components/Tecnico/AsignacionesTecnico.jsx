import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LoadingGrid } from "../ui/custom/LoadingGrid";
import { ErrorAlert } from "../ui/custom/ErrorAlert";
import { EmptyState } from "../ui/custom/EmptyState";
import { Clock, Layers, Eye, MessageSquarePlus } from "lucide-react";
import TecnicoService from "@/services/TecnicoService";
import TecnicoIcon from "../../assets/TecnicoIcon2.png";
import { useTranslation } from 'react-i18next';

export function AsignacionesTecnico() {
  const { t } = useTranslation(); // <- NUEVO
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const idRol = localStorage.getItem("idRol");
  const idUsuario = id;

  // 🎨 Colores por estado (incluye “Abierto”)
  const estadoColor = {
    Pendiente: "bg-yellow-500/80",
    Asignado: "bg-blue-500/80",
    "En Proceso": "bg-purple-500/80",
    Resuelto: "bg-green-600/80",
    Cerrado: "bg-gray-600/80",
    Abierto: "bg-sky-500/80",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await TecnicoService.getAsignacionesByTecnico(idRol, idUsuario);
        if (!response.data.success) throw new Error(response.data.message);
        setData(response.data.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (idRol && idUsuario) {
      fetchData();
    } else {
      setError(t('assignments.errors.noUserInfo')); // <- TRADUCIDO
      setLoading(false);
    }
  }, [idRol, idUsuario]);

  if (loading) return <LoadingGrid count={3} type="grid" />;
  if (error) return <ErrorAlert title={t('common.errorLoading')} message={error} />; // <- TRADUCIDO
  if (!data || data.length === 0)
    return (
      <EmptyState
        title={t('assignments.noAssignments')} // <- TRADUCIDO
        message={t('assignments.noTicketsAssigned')} // <- TRADUCIDO
      />
    );

  const estadosUnicos = [...new Set(data.map((t) => t.estado_actual))];
  const asignacionesPorEstado = estadosUnicos.map((estado) => ({
    estado,
    tickets: data.filter((t) => t.estado_actual === estado),
  }));

  const calcularProgreso = (horasRest) => {
    if (!horasRest) return 0;
    const restante = parseInt(horasRest);
    if (restante < 0) return 100;
    return Math.min((restante / 24) * 100, 100);
  };

  return (
    <div className="max-w-[1600px] mx-auto px-6 py-10 text-white">
      {/* Encabezado */}
      <div className="flex items-center gap-4 mb-10">
        <img
          src={TecnicoIcon}
          alt={t('technicians.photoAlt')} // <- TRADUCIDO
          className="w-16 h-16 rounded-full bg-blue-900/40 p-2 shadow-md"
        />
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">
            {t('assignments.dashboard')} {/* <- TRADUCIDO */}
          </h1>
          <p className="text-black/70 text-sm">
            {t('assignments.subtitle')} {/* <- TRADUCIDO */}
          </p>
        </div>
      </div>

      {/* Contenedor tipo tablero */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 overflow-x-auto pb-6">
        {asignacionesPorEstado.map((columna, index) => (
          <div
            key={index}
            className="bg-blue-950/70 border border-blue-800/50 rounded-xl p-4 flex flex-col shadow-md min-w-[320px]"
          >
            <h2
              className={`text-center text-lg font-semibold mb-3 pb-1 border-b border-blue-700/60`}
            >
              {columna.estado}
            </h2>

            {columna.tickets.length === 0 ? (
              <p className="text-center text-white/50 text-sm mt-4">
                {t('assignments.noTickets')} {/* <- TRADUCIDO */}
              </p>
            ) : (
              columna.tickets.map((item) => {
                const urgente = parseInt(item.horas_restantes) < 0;
                const progreso = calcularProgreso(item.horas_restantes);

                return (
                  <Card
                    key={item.id_asignacion}
                    className="bg-blue-900/50 border border-blue-700/40 mb-4 text-white shadow-sm hover:scale-[1.02] transition-transform"
                  >
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-semibold flex flex-col gap-1">
                        <span className="truncate">{item.titulo}</span>
                        <Badge
                          className={`w-fit ${
                            estadoColor[item.estado_actual] || "bg-gray-600"
                          } text-white text-xs mt-1`}
                        >
                          {item.estado_actual}
                        </Badge>
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="text-xs space-y-1">
                      <p className="text-white/60">ID: #{item.id_ticket}</p>
                      <p className="text-white/60">
                        {t('common.date')}: {item.fecha_creacion} {/* <- TRADUCIDO */}
                      </p>

                      <div className="flex items-center gap-1 text-white/80">
                        <Layers className="h-3 w-3" />
                        <span>{item.categoria}</span>
                      </div>

                      <div className="flex items-center gap-1 text-white/60">
                        <Clock className="h-3 w-3" />
                        <span>
                          {t('assignments.slaRemaining')}:{" "} {/* <- TRADUCIDO */}
                          <span
                            className={`${
                              urgente ? "text-red-400" : "text-green-400"
                            }`}
                          >
                            {item.horas_restantes} {t('common.hours')} {/* <- TRADUCIDO */}
                          </span>
                        </span>
                      </div>

                      <div className="w-full bg-blue-900/60 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-2 ${
                            urgente ? "bg-red-500" : "bg-green-400"
                          }`}
                          style={{ width: `${progreso}%` }}
                        ></div>
                      </div>

                      <div className="flex justify-between items-center pt-2">
                        {/* Botón Ver Detalle */}
                        <Button
                          size="xs"
                          variant="outline"
                          className="border-blue-500 text-white/80 hover:bg-blue-700/50 text-[11px]"
                          onClick={() =>
                            navigate(`/tickets/detail/${item.id_ticket}`)
                          }
                        >
                          <Eye className="h-3 w-3 mr-1" /> {t('common.view')} {/* <- TRADUCIDO */}
                        </Button>

                        

                        
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>
        ))}
      </div>
    </div>
  );
}