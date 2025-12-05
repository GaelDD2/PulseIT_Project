import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import ticketIMG from "../../assets/ticket.png";
import { Mail } from "lucide-react";
import { useTranslation } from 'react-i18next';

import {
    Layers,
    Circle,
    ChartNoAxesColumnIncreasing,
    Goal,
    CircleChevronRight,
} from "lucide-react";

const prioridadColores = {
    1: "green-500",
    2: "yellow-400",
    3: "destructive"
};

const prioridadTitulo = {
    1: "Normal",
    2: "Alta",
    3: "Urgente"
};

ListCardTickets.propTypes = {
    data: PropTypes.array.isRequired,
};

export function ListCardTickets({ data }) {
    const idRol = localStorage.getItem("idRol");
    const { t } = useTranslation();
    // Función para determinar el texto y comportamiento del botón
    const getActionButton = (item) => {
        // Primero verificamos la condición que aplica a múltiples roles (Cerrar Ticket)
        if ((idRol === "1" || idRol === "3") && item.estado === "Resuelto") {
            return (
                <Button 
                    variant="default" 
                    size="sm" 
                    className="bg-purple-600 text-white hover:bg-purple-700"
                >
                    <Link to={`/tickets/updateEstado/${item.id}/3`}>
                          
                          {t('process.nameClose')}
                        </Link>
                </Button>
            );
        }

        // Luego verificamos por rol específico
        if (idRol === "2") {
            switch (item.estado) {
                case "Asignado":
                    return (
                        <Button 
                            variant="default" 
                            size="sm" 
                            className="bg-primary text-white hover:bg-primary/90"
                        >
                           <Link to={`/tickets/updateEstado/${item.id}/2`}>
                           {t('process.nameResolve')}
                        </Link>
                        </Button>
                    );
                case "En Proceso":
                    return (
                        <Button 
                            variant="default" 
                            size="sm" 
                            className="bg-green-600 text-white hover:bg-green-700"
                        >
                        <Link to={`/tickets/updateEstado/${item.id}/5`}>
                        {t('process.nameFinalize')}
                        </Link>
                      </Button>
                    );
                default:
                    return null;
            }
        }

        // Finalmente rol 3 (Asignar Manualmente)
        if (idRol === "3" && item.estado === "Pendiente") {
            return (
                <Button 
                    variant="default" 
                    size="sm" 
                    className="bg-blue-600 text-white hover:bg-blue-700"
                >
                    <Link to={`/tecnicosAsignaciones/${item.id}`}>
                       {t('process.nameAssign')}
                        </Link>
                </Button>
            );
        }

        return null;
    };

    return (
        <div className="grid gap-6 p-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.map((item, index) => (
                <Card key={index} className="flex flex-col justify-between">
                    <CardHeader>
                        <img
                            src={ticketIMG}
                            alt="Foto del técnico"
                            className="w-24 h-24 mx-auto object-cover"
                        />
                        <CardTitle className="text-lg font-semibold text-primary">
                            {item.titulo}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                            <Goal className="h-4 w-4 text-primary" /> {item.estado}
                        </p>
                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                            <CircleChevronRight className="h-4 w-4 text-primary" /> ID:{item.id}
                        </p>
                        <div className="flex items-center gap-2">
                            <ChartNoAxesColumnIncreasing
                                className={`h-4 w-4 text-${prioridadColores[item.prioridad]}`}
                            />
                            <span>{t('tickets.detail.priority')}: {prioridadTitulo[item.prioridad]}</span>
                        </div>
                    </CardHeader>

                    <CardContent className="flex justify-between items-center pt-2 border-t">
                        <Button variant="outline" size="sm" asChild>
                            <Link to={`/tickets/detail/${item.id}`}>
                                <Info className="h-4 w-4 mr-1" /> {t('common.moreInfo')}
                            </Link>
                        </Button>
                        
                        {/* Botón de acción condicional */}
                        {getActionButton(item)}
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}