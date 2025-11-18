import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ErrorAlert } from "../ui/custom/ErrorAlert";
// Shadcn UI Components
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

import {
    Clock,
    Globe,
    User,
    Film,
    Star,
    ChevronRight,
    ArrowLeft,
    CheckCheck,
    BriefcaseBusiness,
    MonitorCheck,
    UserX,
    MonitorCog,
    Edit
} from "lucide-react";
import { LoadingGrid } from '../ui/custom/LoadingGrid';
import { EmptyState } from '../ui/custom/EmptyState';
import TecnicoService from '@/services/TecnicoService';
import TecnicoIcon from "../../assets/TecnicoIcon2.png";


export function DetailTecnico() {
    const navigate = useNavigate();
    const { id } = useParams();
    const BASE_URL = import.meta.env.VITE_BASE_URL + 'uploads';
    const [tecnico, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await TecnicoService.getDetalleById(id);
                // Si la petición es exitosa, se guardan los datos 
                console.log(response.data)
                setData(response.data);
                if (!response.data.success) {
                    setError(response.data.message)
                }
            } catch (err) {
                // Si el error no es por cancelación, se registra 
                if (err.name !== "AbortError") setError(err.message);
            } finally {
                // Independientemente del resultado, se actualiza el loading 
                setLoading(false);
            }
        };
        fetchData()
    }, [id]);

    if (loading) return <LoadingGrid count={1} type="grid" />;
    if (error) return <ErrorAlert title="Error al cargar detalle" message={error} />;
    
    return (
        <div className="max-w-4xl mx-auto py-12 px-4">
            <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Sección de la Imagen con ID en Badge */}
                <div className="relative flex-shrink-0 w-full md:w-1/4 lg:w-1/5 rounded-lg overflow-hidden shadow-xl">
                    <div className="aspect-[2/3] w-full bg-muted flex items-center justify-center">
                        <img
                            src={TecnicoIcon}
                            alt="Foto del técnico"
                            className="w-24 h-24 mx-auto rounded-full object-cover"
                        />
                    </div>
                    {/* Badge del id en la esquina inferior derecha */}
                    <Badge variant="secondary" className="absolute bottom-4 right-4 text-1xl">
                        ID: {tecnico.data.id}
                    </Badge>
                </div>
    
                {/* Sección de los Detalles */}
                <div className="flex-1 space-y-6">
                    {/* Nombre del tecnico con botón de editar */}
                    <div className="flex items-center gap-4">
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                            {tecnico.data.nombre}
                        </h1>
                        <Link 
                            to={`/tecnicos/detail/updateTecnico/${tecnico.data.id}`} 
                            className="inline-flex items-center justify-center p-2 text-primary hover:bg-accent/20 rounded-full transition-colors"
                        >
                            <Edit className="h-5 w-5" />
                        </Link>
                    </div>
    
                    <Card>
                        <CardContent className="p-6 space-y-6">
                            {/* Información de tecnico, disponibilidad y carga en una sola fila */}
                            <div className="flex flex-wrap items-center gap-x-10 gap-y-4">
                                {/* disponibilidad */}
                                <div className="flex items-center gap-4">
                                    <MonitorCheck className="h-5 w-5 text-primary" />
                                    <span className="font-semibold">Disponibilidad:</span>
                                    <p className="text-muted-foreground">
                                        {tecnico.data.disponibilidad} 
                                        
                                    </p>
                                    {/* Icono dinámico según disponibilidad */}
                                    {tecnico.data.disponibilidad === "disponible" ? (
                                            <CheckCheck className="h-5 w-5 text-green-500" />
                                    ) : (
                                             <UserX className="h-5 w-5 text-red-500" />
                                    )}
                                </div>
                                {/* Carga Actual */}
                                <div className="flex items-center gap-4">
                                    <MonitorCog className="h-5 w-5 text-primary" />
                                    <span className="font-semibold">Carga Actual:</span>
                                    <p className="text-muted-foreground">
                                        {tecnico.data.carga_actual}
                                    </p>
                                </div>
                                
                            </div>
    
                        
                            {/* Contenedor para especialidades */}
                            <div className="grid gap-4 md:grid-cols-2">
                                {tecnico.data.especialidades && tecnico.data.especialidades.length > 0 && (
                                    <div>
                                        <div className="flex items-center gap-4 mb-2">
                                            <BriefcaseBusiness className="h-5 w-5 text-primary" />
                                            <span className="font-semibold">Especialidades:</span>
                                        </div>
    
                                        <div className="flex flex-col space-y-2">
                                            {tecnico.data.especialidades.map((esp, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-start gap-2 py-1 px-2 text-sm border-l-4 border-primary/60 pl-3"
                                                >
                                                    <ChevronRight className="h-4 w-4 text-secondary mt-[2px]" />
                                                    <div>
                                                        <p className="font-semibold text-primary">{esp.nombre}</p>
                                                        <p className="text-muted-foreground text-xs">{esp.descripcion}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
    
                        </CardContent>
                    </Card>
                </div>
            </div>
            <Button
                type="button"
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 bg-primary text-white hover:bg-accent/90 mt-6 "
            >
                <ArrowLeft className="w-4 h-4" />
                Regresar
            </Button>
        </div>
    );
}