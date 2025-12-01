import React, { useEffect, useState } from "react";
import TecnicoService from "../../services/TecnicoService";
import { LoadingGrid } from "../ui/custom/LoadingGrid";
import { EmptyState } from "../ui/custom/EmptyState";
import { ErrorAlert } from "../ui/custom/ErrorAlert";
import { ListCardTecnicosAsignacion } from "./ListCardTecnicosAsignacion";
import {  useParams } from "react-router-dom";
import TicketService from "@/services/TicketService";


import { useTranslation } from 'react-i18next';

export function ListTecnicosAsignacion({ onSelect }) {
  const { t } = useTranslation();
  const [data, setData] = useState(null);
  const [dataTicket, setDataTicket] = useState(null);
  const { idTicket } = useParams();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await TecnicoService.getTecnicosEsp();
        const responseTicket = await TicketService.getDetalleById(idTicket);
        
        if (!response.data.success || !responseTicket.data.success) {
          setError(t('common.errorLoadingData'));
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
    return <EmptyState message={t('assignments.noTechniciansAvailable')} />;

  const getPriorityText = (priorityNumber) => {
    const priorities = {
      1: t('tickets.priority.normal'),
      2: t('tickets.priority.high'),
      3: t('tickets.priority.urgent')
    };
    return priorities[priorityNumber] || priorityNumber;
  };

  return (
    <div className="mx-auto max-w-5xl p-6">
      <h2 className="text-2xl font-bold mb-5">
        {t('assignments.selectTechnicianFor')}:
      </h2>
      <h3 className="font-bold mb-3">
        {t('common.category')}: {dataTicket.categoria}
      </h3>
      <h3 className="font-bold mb-3">
        {t('tickets.priority.label')}: {getPriorityText(dataTicket.prioridad)}
      </h3>
      <h3 className="font-bold mb-5">
        {t('assignments.slaResponse')}: {dataTicket.sla_respuesta_calculado} | {t('assignments.slaResolution')}: {dataTicket.sla_resolucion_calculado}
      </h3>

      <ListCardTecnicosAsignacion data={data} onSelect={onSelect} />
    </div>
  );
}