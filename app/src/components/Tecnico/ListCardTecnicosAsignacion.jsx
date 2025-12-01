import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PropTypes from "prop-types";
import TecnicoIcon from "../../assets/TecnicoIcon2.png";
import TicketService from "@/services/TicketService";
import {  useParams } from "react-router-dom";
import { Link } from "react-router-dom";


ListCardTecnicosAsignacion.propTypes = {
  data: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
};

import { useTranslation } from 'react-i18next';

export function ListCardTecnicosAsignacion({ data, onSelect }) {
  const { t } = useTranslation();
  const { idTicket } = useParams();

  const getAvailabilityColor = (disponibilidad) => {
    switch (disponibilidad) {
      case "disponible": return "text-green-600";
      case "ocupado": return "text-red-600";
      case "vacaciones": return "text-yellow-600";
      case "desconectado": return "text-gray-600";
      default: return "text-gray-600";
    }
  };

  const getAvailabilityText = (disponibilidad) => {
    switch (disponibilidad) {
      case "disponible": return t('technicians.availabilityOptions.available');
      case "ocupado": return t('technicians.availabilityOptions.busy');
      case "vacaciones": return t('technicians.availabilityOptions.vacation');
      case "desconectado": return t('technicians.availabilityOptions.offline');
      default: return disponibilidad;
    }
  };

  return (
    <div className="grid gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3">
      {data.map((item) => (
        <Card
          key={item.id}
          className="p-4 flex flex-col gap-3 border shadow-sm hover:shadow-md transition-all"
        >
          <img
            src={TecnicoIcon}
            alt={t('technicians.photoAlt')}
            className="w-16 h-16 mx-auto rounded-full object-cover"
          />

          <h3 className="text-center text-lg font-semibold">{item.nombre}</h3>

          <p className={`text-center text-sm font-medium ${getAvailabilityColor(item.disponibilidad)}`}>
            {getAvailabilityText(item.disponibilidad).toUpperCase()}
          </p>

          <p className="text-xs text-center text-muted-foreground">
            {t('technicians.currentLoad')}: {item.carga_actual}
          </p>

          <div className="text-xs text-muted-foreground mt-2">
            <p className="font-semibold text-center">{t('technicians.specialties')}:</p>
            <ul className="list-disc ml-4">
              {item.especialidades.map((esp) => (
                <li key={esp.id}>{esp.nombre}</li>
              ))}
            </ul>
          </div>

          <Button
            className="mt-3 w-full"
            onClick={() => onSelect && onSelect(item)}
          >
            <Link to={`/AsignarTecnicoManual/${idTicket}/${item.id}`}>
              {t('common.select')}
            </Link>
          </Button>
        </Card>
      ))}
    </div>
  );
}