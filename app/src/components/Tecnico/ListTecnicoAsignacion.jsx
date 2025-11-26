import React, { useEffect, useState } from "react";
import TecnicoService from "../../services/TecnicoService";
import { LoadingGrid } from "../ui/custom/LoadingGrid";
import { EmptyState } from "../ui/custom/EmptyState";
import { ErrorAlert } from "../ui/custom/ErrorAlert";
import { ListCardTecnicosAsignacion } from "./ListCardTecnicosAsignacion";

export function ListTecnicosAsignacion({ onSelect }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await TecnicoService.getTecnicosEsp();
        console.log(response.data);

        if (!response.data.success) {
          setError(response.data.message);
        } else {
          setData(response.data.data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <LoadingGrid type="grid" />;
  if (error) return <ErrorAlert message={error} />;
  if (!data || data.length === 0)
    return <EmptyState message="No hay técnicos disponibles" />;

  return (
    <div className="mx-auto max-w-5xl p-6">
      <h2 className="text-2xl font-bold mb-5">Seleccionar Técnico</h2>

      <ListCardTecnicosAsignacion data={data} onSelect={onSelect} />
    </div>
  );
}
