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
import TecnicoIcon from "../../assets/TecnicoIcon2.png";
import CategoriaService from '@/services/CategoriaService';
import Img1 from "../../assets/CategoriaImg1.png";
import Img2 from "../../assets/CategoriaImg2.png";
import Img3 from "../../assets/CategoriaImg3.png";
import Img4 from "../../assets/CategoriaImg4.png";

const categoriaImages = {
    1: Img2,
    2: Img1,
    3: Img3,
    4: Img4,
  };


export function DetailCategoria() {
    const navigate = useNavigate();
    const { id } = useParams();
    const BASE_URL = import.meta.env.VITE_BASE_URL + 'uploads';
    const [categoria, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await CategoriaService.getDetalleById(id);
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
                     src={categoriaImages[categoria.data.id] || Img1} // Imagen por ID o fallback
                    alt={`Imagen de ${categoria.data.nombre}`}
                    className="w-24 h-24 object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                        


                        
                    </div>
                    {/* Badge del id en la esquina inferior derecha */}
                    <Badge variant="secondary" className="absolute bottom-4 right-4 text-1xl">
                        ID: {categoria.data.id}
                    </Badge>
                </div>

                {/* Sección de los Detalles */}
                <div className="flex-1 space-y-6">
                   {/* Nombre de la categoria con botón de editar */}
                   <div className="flex items-center gap-4">
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                            {categoria.data.nombre}
                        </h1>
                        <Link 
                            to={`/categorias/detail/updateCategoria/${categoria.data.id}`} 
                            className="inline-flex items-center justify-center p-2 text-primary hover:bg-accent/20 rounded-full transition-colors"
                        >
                            <Edit className="h-5 w-5" />
                        </Link>
                    </div>

                    <Card>
                        <CardContent className="p-6 space-y-6">
                            

                           
                            {/* Contenedor para etiquetas */}
                            <div className="grid gap-4 md:grid-cols-3">
                                {categoria.data.etiquetas && categoria.data.etiquetas.length > 0 && (
                                    <div>
                                        <div className="flex items-center gap-4 mb-2">
                                            <BriefcaseBusiness className="h-5 w-5 text-primary" />
                                            <span className="font-semibold">Etiquetas:</span>
                                        </div>

                                        <div className="flex flex-col space-y-2">
                                            {categoria.data.etiquetas.map((eti, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-start gap-2 py-1 px-2 text-sm border-l-4 border-primary/60 pl-3"
                                                >
                                                    <ChevronRight className="h-4 w-4 text-secondary mt-[2px]" />
                                                    <div>
                                                        <p className="font-semibold text-primary">{eti.nombre}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                    {categoria.data.especialidades && categoria.data.especialidades.length > 0 && (
                                    <div>
                                        <div className="flex items-center gap-4 mb-2">
                                            <BriefcaseBusiness className="h-5 w-5 text-primary" />
                                            <span className="font-semibold">Especialidades:</span>
                                        </div>

                                        <div className="flex flex-col space-y-2">
                                            {categoria.data.especialidades.map((esp, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-start gap-2 py-1 px-2 text-sm border-l-4 border-primary/60 pl-3"
                                                >
                                                    <ChevronRight className="h-4 w-4 text-secondary mt-[2px]" />
                                                    <div>
                                                        <p className="font-semibold text-primary">{esp.nombre}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {categoria.data.sla && categoria.data.sla.length > 0 && (
                                    <div>
                                        <div className="flex items-center gap-4 mb-2">
                                            <BriefcaseBusiness className="h-5 w-5 text-primary" />
                                            <span className="font-semibold">SLA:</span>
                                        </div>

                                        <div className="flex flex-col space-y-2">
                                            {categoria.data.sla.map((sla, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-start gap-2 py-1 px-2 text-sm border-l-4 border-primary/60 pl-3"
                                                >
                                                    <ChevronRight className="h-4 w-4 text-secondary mt-[2px]" />
                                                    <div>
                                                        <p className="font-semibold text-primary">{sla.nombre}</p>
                                                        <p className="text-muted-foreground text-xs">{sla.tiempo_respuesta_minutos} min.</p>
                                                        <p className="text-muted-foreground text-xs">{sla.tiempo_resolucion_minutos} min.</p>

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