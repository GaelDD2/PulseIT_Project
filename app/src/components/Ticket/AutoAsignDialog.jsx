import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


// UI (usa los mismos componentes que tu proyecto)
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X } from "lucide-react";

import TicketService from "@/services/TicketService";
import { useTranslation } from 'react-i18next';
import ReglaAutotriageService from "@/services/ReglaAutotriageService";


export function AutoAssignDialog({ open, onClose, rules, onConfirm }    ) {
  const [loading, ] = useState(false);
  const [, setError] = useState("");  const { t } = useTranslation();
  const idUsuarioAsignador =localStorage.getItem("idUsuario");
  const [dataRegla, setDataRegla] = useState([]);
  const navigate = useNavigate();

  // Schema yup: id_regla requerido
  const TicketSchema = yup.object({
    id_regla: yup
      .mixed()
      .required("Debes seleccionar una regla")
  });

  const {
    control,
    handleSubmit,
    
    formState: { errors }
  } = useForm({
    defaultValues: {
      id_regla: "",
      "id_usuario_asignador": idUsuarioAsignador
    },
    resolver: yupResolver(TicketSchema)
  });


  useEffect(() => {
    const fechData = async () => {
      try {
        const reglasRes = await ReglaAutotriageService.getAll();
        setDataRegla(reglasRes.data.data || []);
      } catch (error) {
        console.log(error);
        if (error.name != "AbortError") setError(error.message);
      }
    };
    fechData();
  }, []);

  const onSubmit = async (dataForm) => {
    try {
      const isValid = await TicketSchema.isValid(dataForm);
      if (isValid) {
        const response = await TicketService.asignarTecnicoAutomatico(dataForm);
        if (response.data) {
        const result = response.data.data;
        if (!result || !result.asignaciones) {
            toast.error("Error inesperado en la asignación.");
            return;
          }

          if (result.asignaciones.length === 0) {
            toast(() => (
              <div>
                <strong>Sin tickets pendientes</strong>
                <p>{result.message}</p>
              </div>
            ));
            onClose?.();
            return;
          }     
          const asignados = result.asignaciones.filter(a => a.assigned === true);
          const noAsignados = result.asignaciones.filter(a => a.assigned === false);

          asignados.forEach(a => {
            toast.success(
              `Ticket #${a.ticket} asignado a ${a.tecnico_nombre} (Puntaje: ${a.puntaje_final})`
            );
          });

          noAsignados.forEach(a => {
            toast.error(
              `Ticket #${a.ticket} no se asignó: ${a.reason}`
            );
          });

          toast(
            `Asignación completada: ${asignados.length} asignados, ${noAsignados.length} sin asignar.`
          );

          onClose?.();
          navigate("/tickets");

         
        } else if (response.error) {
          setError(response.error);
        }
      }
    } catch (err) {
      console.error(err);
      setError(t('tickets.errors.create'));
      toast.error("Error en la asignación automática.");
    }
  };

  
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <Card className="w-full max-w-md p-6 relative">
        {/* botón cerrar */}
        <button
          onClick={() => onClose?.()}
          className="absolute right-3 top-3 rounded hover:bg-muted p-1"
          aria-label="Cerrar"
        >
          <X className="w-4 h-4" />
        </button>

        <h2 className="text-2xl font-bold mb-4">Asignación Automática de tickets</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Regla */}
          <div>
                  <Label>{t('tickets.rule')}</Label>
                  <Controller
                      name="id_regla"
                      control={control}
                      render={({ field }) => (
                          <Select onValueChange={field.onChange} value={field.value}>
                              <SelectTrigger className="w-full">
                                  <SelectValue placeholder={t('categories.placeholders.selectSLA')} />
                              </SelectTrigger>
                              <SelectContent>
                                  {dataRegla.map((regla) => (
                                      <SelectItem key={regla.id} value={String(regla.id)}>
                                          {regla.nombre} — {regla.descripcion}
                                         
                                      </SelectItem>
                                  ))}
                              </SelectContent>
                          </Select>
                      )}
                  />
                  {errors.id_regla && <p className="text-sm text-red-500">{errors.id_regla.message}</p>}
              </div>


          <div className="flex justify-end gap-2 mt-2">
            <Button type="button" variant="ghost" onClick={() => onClose?.()} disabled={loading}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Procesando..." : "Aceptar"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
