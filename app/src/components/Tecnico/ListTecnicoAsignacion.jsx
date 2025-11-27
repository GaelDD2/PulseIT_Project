import React, { useEffect, useState } from "react";
import TecnicoService from "../../services/TecnicoService";
import { LoadingGrid } from "../ui/custom/LoadingGrid";
import { EmptyState } from "../ui/custom/EmptyState";
import { ErrorAlert } from "../ui/custom/ErrorAlert";
import { ListCardTecnicosAsignacion } from "./ListCardTecnicosAsignacion";
import {  useParams } from "react-router-dom";
import TicketService from "@/services/TicketService";


export function ListTecnicosAsignacion({ onSelect }) {
  const [data, setData] = useState(null);
  const [dataTicket, setDataTicket] = useState(null);
  const { idTicket} = useParams();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await TecnicoService.getTecnicosEsp();
        const responseTicket = await TicketService.getDetalleById(idTicket);
        console.log(response.data);
        console.log(responseTicket.data);


        if (!response.data.success) {
          setError(response.data.message);
          setError(responseTicket.data.message);
        } else {
          setData(response.data.data);
          setDataTicket(responseTicket.data.data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [idTicket]);

  if (loading) return <LoadingGrid type="grid" />;
  if (error) return <ErrorAlert message={error} />;
  if (!data || data.length === 0)
    return <EmptyState message="No hay técnicos disponibles" />;

  return (
    <div className="mx-auto max-w-5xl p-6">
      <h2 className="text-2xl font-bold mb-5">Seleccionar Técnico para:</h2>
      <h3 className="font-bold mb-5">Categoria: {dataTicket.categoria}</h3>
      <h3 className="font-bold mb-5">Prioridad: {dataTicket.prioridad}</h3>
      <h3 className="font-bold mb-5">SLA Respuesta: {dataTicket.sla_respuesta_calculado}  SLA Resolucion:  {dataTicket.sla_resolucion_calculado}</h3>




      <ListCardTecnicosAsignacion data={data} onSelect={onSelect} />
    </div>
  );
}
