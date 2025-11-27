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

export function ListCardTecnicosAsignacion({ data, onSelect }) {
  const {idTicket} = useParams();

  
  return (
    
    <div className="grid gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3">
      {data.map((item) => (
        <Card
          key={item.id}
          className="p-4 flex flex-col gap-3 border shadow-sm hover:shadow-md transition-all"
        >
          {/* Foto */}
          <img
            src={TecnicoIcon}
            alt="Foto técnico"
            className="w-16 h-16 mx-auto rounded-full object-cover"
          />

          {/* Nombre */}
          <h3 className="text-center text-lg font-semibold">{item.nombre}</h3>

          

          {/* Disponibilidad */}
          <p
            className={`text-center text-sm font-medium ${
              item.disponibilidad === "disponible"
                ? "text-green-600"
                : item.disponibilidad === "ocupado"
                ? "text-red-600"
                : "text-yellow-600"
            }`}
          >
            {item.disponibilidad.toUpperCase()}
          </p>

          {/* Carga actual */}
          <p className="text-xs text-center text-muted-foreground">
            Carga actual: {item.carga_actual}
          </p>

          {/* Especialidades */}
          <div className="text-xs text-muted-foreground mt-2">
            <p className="font-semibold text-center">Especialidades:</p>
            <ul className="list-disc ml-4">
              {item.especialidades.map((esp) => (
                <li key={esp.id}>{esp.nombre}</li>
              ))}
            </ul>
          </div>

          {/* Botón seleccionar */}
          <Button
            className="mt-3 w-full"
            onClick={() => onSelect(item)}
          >
            <Link to={`/AsignarTecnicoManual/${idTicket}/${item.id}`}>
              Seleccionar
            </Link>
          </Button>
        </Card>
      ))}
    </div>
  );
}
