import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// UI components (shadcn/ui)
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Icons
import { Save, ArrowLeft, Plus } from "lucide-react";

// Servicios
import EtiquetasService from "@/services/EtiquetasService";
import TicketService from "@/services/TicketService";


// Componentes personalizados
import { CustomMultiSelect } from "../ui/custom/custom-multiple-select";
import { CustomInputField } from "../ui/custom/custom-input-field";
import ImagesService from "@/services/ImagesService";
import CategoriaService from "@/services/CategoriaService";
import NotificacionService from "@/services/NotificacionService";

import { useTranslation } from 'react-i18next';

export function CreateTicket() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const correoUsuario = localStorage.getItem("correo");
  const idUsuario = localStorage.getItem("idUsuario");

  const [dataEtiqueta, setDataEtiqueta] = useState([]);
  const [categoriaNombre, setCategoriaNombre] = useState("");
  const [files, setFiles] = useState([]);
  const [previewURLs, setPreviewURLs] = useState([]);
  const [error, setError] = useState("");

  const TicketSchema = yup.object({
    titulo: yup
      .string()
      .required(t('validation.required', { field: t('tickets.title') }))
      .min(2, t('validation.min', { field: t('tickets.title'), min: 2 })),
    descripcion: yup
      .string()
      .required(t('validation.required', { field: t('tickets.description') }))
      .min(5, t('validation.min', { field: t('tickets.description'), min: 5 })),
    prioridad: yup.string().required(t('validation.required', { field: t('tickets.priority.label') })),
    id_etiqueta: yup.string().required(t('validation.required', { field: t('tickets.tag') })),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      titulo: "",
      descripcion: "",
      prioridad: "",
      id_usuario_solicitante: idUsuario,
      id_etiqueta: "",
    },
    resolver: yupResolver(TicketSchema)
  });

  const handleChangeImage = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...selectedFiles]);

    const newPreviews = selectedFiles.map((file) =>
      URL.createObjectURL(file)
    );
    setPreviewURLs((prev) => [...prev, ...newPreviews]);
  };

  useEffect(() => {
    const fechData = async () => {
      try {
        const etiquetasRes = await EtiquetasService.getAll();
        setDataEtiqueta(etiquetasRes.data.data || []);
      } catch (error) {
        console.log(error);
        if (error.name != "AbortError") setError(error.message);
      }
    };
    fechData();
  }, []);

  const getPriorityText = (priorityValue) => {
    const priorities = {
      1: t('tickets.priority.normal'),
      2: t('tickets.priority.high'),
      3: t('tickets.priority.urgent')
    };
    return priorities[priorityValue] || priorityValue;
  };

  const onSubmit = async (dataForm) => {
    try {
      const isValid = await TicketSchema.isValid(dataForm);
      if (isValid) {
        const response = await TicketService.createTicket(dataForm);
        if (response.data) {
          const formData = new FormData();
          formData.append("id_historial", response.data.data.id_historial);
          formData.append("id_usuario", idUsuario);

          files.forEach((file) => {
            formData.append("files[]", file);
          });

          await ImagesService.uploadEvidence(formData);

          const formDataNoti = new FormData();
          formDataNoti.append("id_usuario", idUsuario);
          formDataNoti.append("tipo_id", 1);
          formDataNoti.append("id_usuario_origen", 5);
          formDataNoti.append("contenido", t('notifications.ticketCreated', {
            id: response.data.data.id,
            title: response.data.data.titulo
          }));
          formDataNoti.append("atendida", 0);

          await NotificacionService.createNotificacion(formDataNoti);

          toast.success(t('tickets.success.created', {
            id: response.data.data.id,
            title: response.data.data.titulo
          }), {
            duration: 4000,
            position: "top-center",
          });
          navigate("/tickets");
        } else if (response.error) {
          setError(response.error);
        }
      }
    } catch (err) {
      console.error(err);
      setError(t('tickets.errors.create'));
    }
  };

  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <Card className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">{t('tickets.createTicket')}</h2>
      
      <div className="mt-2">
        <Label className="text-sm font-medium">
          {t('tickets.requestingUser')}:
        </Label>
        <p className="text-sm mt-1">{correoUsuario}</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <Label htmlFor="nombre">{t('tickets.title')}</Label>
          <Controller
            name="titulo"
            control={control}
            render={({ field }) => 
              <Input {...field} placeholder={t('tickets.placeholders.title')} />
            }
          />
          {errors.titulo && <p className="text-sm text-red-500">{errors.titulo.message}</p>}
        </div>

        <div>
          <Label htmlFor="descripcion">{t('tickets.description')}</Label>
          <Controller
            name="descripcion"
            control={control}
            render={({ field }) => 
              <Textarea {...field} placeholder={t('tickets.placeholders.description')} />
            }
          />
          {errors.descripcion && <p className="text-sm text-red-500">{errors.descripcion.message}</p>}
        </div>

        <Label>{t('tickets.tag')}</Label>
        <Controller
          name="id_etiqueta"
          control={control}
          render={({ field }) => (
            <Select
              value={field.value}
              onValueChange={async (value) => {
                field.onChange(value);
                try {
                  const response = await CategoriaService.getByEtiqueta(value);
                  setCategoriaNombre(
                    response.data?.data?.[0]?.nombre ?? t('tickets.noCategory')
                  );
                } catch {
                  setCategoriaNombre(t('tickets.errorLoadingCategory'));
                }
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={t('tickets.placeholders.selectTag')} />
              </SelectTrigger>
              <SelectContent>
                {dataEtiqueta.map((etq) => (
                  <SelectItem key={etq.id} value={String(etq.id)}>
                    {etq.nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />

        <div className="mt-2">
          <Label className="text-sm font-medium">{t('tickets.category')}:</Label>
          <p className="text-sm mt-1">
            {categoriaNombre || t('tickets.selectTagFirst')}
          </p>
        </div>

        <div>
          <Label>{t('tickets.priority.label')}</Label>
          <Controller
            name="prioridad"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={t('tickets.placeholders.selectPriority')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">{t('tickets.priority.normal')}</SelectItem>
                  <SelectItem value="2">{t('tickets.priority.high')}</SelectItem>
                  <SelectItem value="3">{t('tickets.priority.urgent')}</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.prioridad && <p className="text-sm text-red-500">{errors.prioridad.message}</p>}
        </div>

        <div className="mb-6">
          <Label htmlFor="image" className="block mb-1 text-sm font-medium">
            {t('tickets.evidence')}
          </Label>
          <div
            className="relative border-2 border-dashed border-muted/50 rounded-lg p-20 flex flex-col gap-3 cursor-pointer hover:border-primary transition-colors"
            onClick={() => document.getElementById("image").click()}
          >
            {previewURLs.length === 0 && (
              <p className="text-sm text-muted-foreground">
                {t('tickets.evidenceInstructions')}
              </p>
            )}

            {previewURLs.length > 0 && (
              <div className="flex gap-3 flex-wrap">
                {previewURLs.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    className="w-28 h-28 object-cover rounded-md shadow"
                  />
                ))}
              </div>
            )}
          </div>
          <input
            type="file"
            id="image"
            className="hidden"
            accept="image/*"
            multiple
            onChange={handleChangeImage}
          />
        </div>

        <div className="flex justify-between gap-4 mt-6">
          <Button
            type="button"
            variant="default"
            className="flex items-center gap-2 bg-destructive text-white"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-4 h-4" />
            {t('common.back')}
          </Button>
          <Button type="submit" className="flex-1">
            <Save className="w-4 h-4" />
            {t('common.save')}
          </Button>
        </div>
      </form>
    </Card>
  );
}