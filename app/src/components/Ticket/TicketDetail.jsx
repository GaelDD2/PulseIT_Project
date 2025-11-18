import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TicketService from "@/services/TicketService";
import { ErrorAlert } from "../ui/custom/ErrorAlert";
import { LoadingGrid } from "../ui/custom/LoadingGrid";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Calendar,
  User,
  FileText,
  Clock,
  AlertCircle,
  CheckCircle,
  MessageSquare,
  ChevronRight,
  Star,
} from "lucide-react";
import ticketIMG from "../../assets/ticket.png";

export function TicketDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [ticket, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const BASE_URL = import.meta.env.VITE_BASE_URL + 'uploads';


  const prioridadColores = {
    1: "text-green-500",
    2: "text-yellow-400",
    3: "text-red-500",
  };

  const prioridadTitulo = {
    1: "Normal",
    2: "Alta",
    3: "Urgente",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await TicketService.getDetalleById(id);
        setData(response.data);
        if (!response.data.success) setError(response.data.message);
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <LoadingGrid count={1} type="grid" />;
  if (error) return <ErrorAlert title="Error al cargar detalle" message={error} />;

  const t = ticket.data;

  return (
    <div className="max-w-6xl mx-auto py-10 px-6 text-white ">
      {/* Título y encabezado */}
      <div className="flex items-center gap-4 mb-8">
        <img
          src={ticketIMG}
          alt="Ticket"
          className="w-20 h-20 rounded-lg shadow-lg bg-white/10 p-2"
        />
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-accent-foreground">{t.titulo}</h1>
          <p className="text-accent-foreground/70">{t.descripcion}</p>
        </div>
      </div>

      {/* Información general */}
      <Card className="bg-blue-950/80 border-none shadow-lg backdrop-blur-md">
        <CardContent className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
          <div className="flex items-center gap-3">
            <User className="text-secondary h-5 w-5" />
            <div>
              <p className="text-sm text-white/60">Solicitante</p>
              <p className="font-semibold">{t.solicitante}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Calendar className="text-secondary h-5 w-5" />
            <div>
              <p className="text-sm text-white/60">Fecha de creación</p>
              <p className="font-semibold">{t.fecha_creacion}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <AlertCircle className="text-secondary h-5 w-5" />
            <div>
              <p className="text-sm text-white/60">Estado</p>
              <Badge
                variant="secondary"
                className="text-white bg-blue-700/60 px-3 py-1 rounded-full"
              >
                {t.estado}
              </Badge>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <FileText className="text-secondary h-5 w-5" />
            <div>
              <p className="text-sm text-white/60">Categoría</p>
              <p className="font-semibold">{t.categoria}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Clock className="text-secondary h-5 w-5" />
            <div>
              <p className="text-sm text-white/60">SLA Respuesta</p>
              <p className="font-semibold">{t.sla_respuesta_calculado}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Clock className="text-secondary h-5 w-5" />
            <div>
              <p className="text-sm text-white/60">SLA Resolución</p>
              <p className="font-semibold">{t.sla_resolucion_calculado}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <CheckCircle
              className={`h-5 w-5 ${prioridadColores[t.prioridad] || "text-white"}`}
            />
            <div>
              <p className="text-sm text-white/60">Prioridad</p>
              <p className="font-semibold">
                {prioridadTitulo[t.prioridad] || "Sin definir"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Historial */}
      {t.historial && t.historial.length > 0 && (
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-accent-foreground">
            <MessageSquare className="text-accent-foreground h-5 w-5" /> Historial del Ticket
          </h2>

          <div className="space-y-4">
            {t.historial.map((h, index) => (
              <Card key={index} className="bg-blue-950/70 border-none shadow-md">
                <CardContent className="p-4">
                  <div>
                    <p className="font-semibold">{h.estado_nuevo}</p>
                    <p className="text-sm text-white/70">{h.observaciones}</p>
                    <p className="text-xs text-white/50 mt-1">
                      Por {h.usuario_cambio} - {h.fecha_cambio}
                    </p>

                    {/* Mostrar evidencias solo si existen */}
                    {h.evidencias && h.evidencias.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-3">
                        <p className="font-semibold text-white">Evidencias:</p>
                   
                      
                        {h.evidencias.map((img, i) => (
                          <img
                            key={i}
                            src={`${BASE_URL}/${img}`}
                            alt={`Evidencia ${i + 1}`}
                            className="w-100 h-100 object-contain rounded-lg  hover:scale-105 transition-transform"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Valoración */}
      {t.valoracion && t.valoracion.length > 0 && (
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-accent-foreground">
            <Star className="text-yellow-400 h-7 w-7" /> Valoración del Usuario
          </h2>

          {t.valoracion.map((v, index) => (
            <Card key={index} className="bg-blue-950/70 border-none shadow-md">
              <CardContent className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                  <p className="font-semibold">{v.usuario_valorador}</p>
                  <p className="text-sm text-white/70">{v.comentario}</p>
                  <p className="text-xs text-white/50 mt-1">
                    {v.fecha_creacion}
                  </p>
                </div>
                <div className="flex items-center gap-1 mt-3 md:mt-0">
                  {Array.from({ length: v.puntuacion }).map((_, i) => (
                    <Star key={i} className="text-yellow-400 h-5 w-5 fill-yellow-400" />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Botón regresar */}
      <Button
        type="button"
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 bg-destructive text-white hover:bg-accent/90 mt-10"
      >
        <ArrowLeft className="w-4 h-4" />
        Regresar
      </Button>
    </div>
  );
}
