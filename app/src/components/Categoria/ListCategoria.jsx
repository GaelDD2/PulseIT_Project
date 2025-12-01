import React, { useEffect, useState } from "react";
import { LoadingGrid } from "../ui/custom/LoadingGrid";
import { EmptyState } from "../ui/custom/EmptyState";
import { ErrorAlert } from "../ui/custom/ErrorAlert";
import CategoriaService from "@/services/CategoriaService";
import { ListCardCategorias } from "./ListCardCategorias";
import { Link } from "react-router-dom";
import { Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';


export function ListCategorias() {
  const { t } = useTranslation();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await CategoriaService.getAll();
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
  if (error) return <ErrorAlert title="Error al cargar categorias" message={error} />;
  if (!data || data.data.length === 0)
    return <EmptyState message="No se encontraron categorias registradas." />;

  return (
    <div className="mx-auto max-w-5xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-primary">
        {t('categories.categoryTittle')}
        </h2>
        <Link 
          to={"/createCategoria"} 
          className="inline-flex items-center justify-center bg-primary text-white p-3 rounded-full hover:bg-primary/90 transition-colors shadow-md"
        >
          <Plus size={24} />
        </Link>
      </div>
      <ListCardCategorias data={data.data} />
    </div>
  );
}