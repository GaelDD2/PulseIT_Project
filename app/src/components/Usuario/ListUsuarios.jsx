import React, { useEffect, useState } from "react";
import TecnicoService from "../../services/TecnicoService";

import { LoadingGrid } from "../ui/custom/LoadingGrid";
import { EmptyState } from "../ui/custom/EmptyState";
import { ErrorAlert } from "../ui/custom/ErrorAlert";
import { Plus } from 'lucide-react';
import { Link } from "react-router-dom";
import UsuarioService from "@/services/UsuarioService";
import { ListCardUsuarios } from "./ListCardUsuarios";


export function ListUsuarios() {
  
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await UsuarioService.getAll();
        console.log(response.data);
        setData(response.data);
        if (!response.data.success) {
          setError(response.data.message);
        }
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <LoadingGrid type="grid" />;
  if (error) return <ErrorAlert title="Error al cargar usuarios" message={error} />;
  if (!data || data.data.length === 0)
    return <EmptyState message="No se encontraron técnicos registrados." />;

  return (
    <div className="mx-auto max-w-5xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-primary">
        Usuarios
        </h2>
        
      </div>
      <ListCardUsuarios data={data.data} />
    </div>
  );
}
