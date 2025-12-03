import React, { useEffect, useState } from "react";
import { LoadingGrid } from "../ui/custom/LoadingGrid";
import { EmptyState } from "../ui/custom/EmptyState";
import { ErrorAlert } from "../ui/custom/ErrorAlert";
import TicketService from "@/services/TicketService";
import { ListCardTickets } from "./ListCardTickets";
import { Link } from "react-router-dom";
import {
  Info,
  ContactRound
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AutoAssignDialog } from "./AutoAsignDialog";




export function ListTickets() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openAssignDialog, setOpenAssignDialog] = useState(false);
  const idUsuario = localStorage.getItem("idUsuario");
  const idRol = localStorage.getItem("idRol");
  const getButtom = () => {
    if (idRol === "3") {
        return (
          <Button
          size="sm"
          className="bg-primary text-white hover:bg-primary/90 mb-4"
          onClick={() => setOpenAssignDialog(true)}   // <<<<< ABRE EL MODAL
        >
          <ContactRound className="h-4 w-4 mr-1" />
          Asignar Tickets Automáticamente
        </Button>
        );
    }

    return null;
};
  useEffect(() => {
    const fetchData = async () => { try {
      
        const response = await TicketService.getTickets(idRol,idUsuario);
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
  }, [idRol,idUsuario]);

  if (loading) return <LoadingGrid type="grid" />;
  if (error) return <ErrorAlert title="Error al cargar tickets" message={error} />;
  if (!data || data.data.length === 0)
    return <EmptyState message="No se encontraron tickets registrados." />;

  return (
    <div className="mx-auto max-w-5xl p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-primary">
        Lista de Tickets
      </h2>
      {getButtom()}
      

      <ListCardTickets data={data.data} />
       {/* MODAL */}
      <AutoAssignDialog
        open={openAssignDialog}
        onClose={() => setOpenAssignDialog(false)}
      />
    
    </div>
  );
}
