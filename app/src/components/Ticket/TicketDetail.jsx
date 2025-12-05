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
import { useTranslation } from 'react-i18next';
export function TicketDetail() {
  const navigate = useNavigate();
  const { t } = useTranslation();
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

  const ti = ticket.data;

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
          <h1 className="text-4xl font-extrabold tracking-tight text-accent-foreground">{ti.titulo}</h1>
          <p className="text-accent-foreground/70">{ti.descripcion}</p>
        </div>
      </div>

      {/* Información general */}
      <Card className="bg-blue-950/80 border-none shadow-lg backdrop-blur-md">
        <CardContent className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
          <div className="flex items-center gap-3">
            <User className="text-secondary h-5 w-5" />
            <div>
              <p className="text-sm text-white/60">{t('tickets.detail.user')}</p>
              <p className="font-semibold">{ti.solicitante}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Calendar className="text-secondary h-5 w-5" />
            <div>
              <p className="text-sm text-white/60">{t('tickets.detail.createdDate')}</p>
              <p className="font-semibold">{ti.fecha_creacion}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <AlertCircle className="text-secondary h-5 w-5" />
            <div>
              <p className="text-sm text-white/60">{t('tickets.detail.state')}</p>
              <Badge
                variant="secondary"
                className="text-white bg-blue-700/60 px-3 py-1 rounded-full"
              >
                {ti.estado}
              </Badge>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <FileText className="text-secondary h-5 w-5" />
            <div>
              <p className="text-sm text-white/60">{t('tickets.detail.category')}</p>
              <p className="font-semibold">{ti.categoria}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Clock className="text-secondary h-5 w-5" />
            <div>
              <p className="text-sm text-white/60">{t('tickets.detail.SLARespuesta')}</p>
              <p className="font-semibold">{ti.sla_respuesta_calculado}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Clock className="text-secondary h-5 w-5" />
            <div>
              <p className="text-sm text-white/60">{t('tickets.detail.SLAResolucion')}</p>
              <p className="font-semibold">{ti.sla_resolucion_calculado}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <CheckCircle
              className={`h-5 w-5 ${prioridadColores[ti.prioridad] || "text-white"}`}
            />
            <div>
              <p className="text-sm text-white/60">{t('tickets.detail.priority')}</p>
              <p className="font-semibold">
                {prioridadTitulo[ti.prioridad] || "Sin definir"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Historial */}
      {ti.historial && ti.historial.length > 0 && (
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-accent-foreground">
            <MessageSquare className="text-accent-foreground h-5 w-5" /> {t('tickets.detail.history')}
          </h2>

          <div className="space-y-4">
            {ti.historial.map((h, index) => (
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
                        <p className="font-semibold text-white">{t('tickets.detail.evidence')}:</p>
                   
                      
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
      {ti.valoracion && ti.valoracion.length > 0 && (
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-accent-foreground">
            <Star className="text-yellow-400 h-7 w-7" /> {t('tickets.detail.valoracion')}
          </h2>

          {ti.valoracion.map((v, index) => (
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
        {t('common.back')}
      </Button>
    </div>
  );
}
