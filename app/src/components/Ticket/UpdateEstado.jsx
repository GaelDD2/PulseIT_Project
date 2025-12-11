import {  useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

// shadcn/ui
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// icons
import { Save, ArrowLeft, Star } from "lucide-react";

import TicketService from "@/services/TicketService";
import ImagesService from "@/services/ImagesService";
import NotificacionService from "@/services/NotificacionService";

import { useTranslation } from "react-i18next";

export function UpdateEstado() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const correoUsuario = localStorage.getItem("correo");
  const idUsuario = localStorage.getItem("idUsuario");

  // Params
  const { idTicket, estado } = useParams(); // estado llega como string

  // UI state
  const [files, setFiles] = useState([]);
  const [previewURLs, setPreviewURLs] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);

  // Yup schema: observacion siempre requerida; puntuacion solo requerida si estado === "3"
  const TicketSchema = yup.object().shape({
    id_ticket: yup.number().required(),
    estado: yup.mixed().required(),
    id_usuario: yup.number().required(),
    observacion: yup.string().required(t('tickets.update.observationRequired') || "La observacion es obligatoria").min(5, t('tickets.update.observationMin') || "Debe tener al menos 5 caracteres"),
    // Valoracion: condicional
    puntuacion: yup.number().when('estado', (estadoVal, schema) => {
      // estadoVal viene de los valores del formulario (puede ser string o number)
      if (String(estadoVal) === "3") {
        return schema
          .required("La puntuación es requerida")
          .min(1, "La puntuación mínima es 1")
          .max(5, "La puntuación máxima es 5")
          .integer("La puntuación debe ser un número entero");
      }
      return schema.notRequired().nullable();
    }),
    comentario: yup.string().nullable().notRequired().max(500, "El comentario no puede exceder los 500 caracteres")
  });

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: {
      id_ticket: idTicket || "",
      estado: estado || "",
      id_usuario: idUsuario || "",
      observacion: "",
      // campos de valoración
      puntuacion: 0,
      comentario: ""
    },
    resolver: yupResolver(TicketSchema)
  });

  // observar puntuacion y comentario
  const puntuacionActual = watch("puntuacion");
  const comentarioActual = watch("comentario");

  // Imagenes
  const handleChangeImage = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...selectedFiles]);
    const newPreviews = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreviewURLs((prev) => [...prev, ...newPreviews]);
  };

  // Estrellas (componente interno)
  const StarRating = ({ value, onChange, onHover }) => {
    return (
      <div className="flex items-center gap-2">
        {[1,2,3,4,5].map((star) => (
          <button
            key={star}
            type="button"
            className="focus:outline-none transition-transform hover:scale-110"
            onClick={() => { onChange(star); }}
            onMouseEnter={() => onHover(star)}
            onMouseLeave={() => onHover(0)}
            aria-label={`Puntuar ${star}`}
          >
            <Star
              className={`w-10 h-10 ${
                star <= (hoverRating || value)
                  ? "fill-yellow-400 text-yellow-400"
                  : "fill-gray-300 text-gray-300"
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  // Envío: primero updateEstado -> subir evidencias -> notificación -> si estado===3 enviar valoración
  const onSubmit = async (dataForm) => {
    setError("");
    setLoading(true);
    try {
      // Validación adicional por si acaso
      const isValid = await TicketSchema.isValid(dataForm);
      if (!isValid) {
        setLoading(false);
        return;
      }

      // 1) Llamar updateEstado (tu endpoint existente)
      const response = await TicketService.updateEstado({
        id_ticket: parseInt(dataForm.id_ticket, 10),
        estado: dataForm.estado,
        id_usuario: parseInt(dataForm.id_usuario, 10),
        observacion: dataForm.observacion
      });

      if (!response || !response.data) {
        throw new Error("Respuesta inválida del servidor al actualizar estado");
      }

      // obtener id_historial e id_usuario_solicitante del response
      const idHistorial = response.data?.data?.id_historial ?? null;
      const idUsuarioSolicitante = response.data?.data?.id_usuario_solicitante ?? null;
      const tituloTicket = response.data?.data?.titulo ?? `#${idTicket}`;

      // 2) Subir evidencias (si hay)
      if (idHistorial && files.length > 0) {
        const formData = new FormData();
        formData.append("id_historial", idHistorial);
        formData.append("id_usuario", idUsuario);
        files.forEach((file) => formData.append("files[]", file));
        await ImagesService.uploadEvidence(formData);
      }

      // 3) Crear notificación (estado -> mensaje)
      const formDataNoti = new FormData();
      if (idUsuarioSolicitante) formDataNoti.append("id_usuario", idUsuarioSolicitante);
      formDataNoti.append("tipo_id", 2);
      formDataNoti.append("id_usuario_origen", idUsuario);
      let contenido = "";
      switch (String(estado)) {
        case "2":
          contenido = `Ticket #${idTicket} puesto en proceso`;
          break;
        case "5":
          contenido = `Ticket #${idTicket} se ha resuelto`;
          break;
        case "3":
          contenido = `Ticket #${idTicket} ha sido cerrado`;
          break;
        default:
          contenido = `Cambio de estado en ticket #${idTicket}`;
          break;
      }
      formDataNoti.append("contenido", contenido);
      formDataNoti.append("atendida", 0);
      await NotificacionService.createNotificacion(formDataNoti);

      // 4) Si cerró (estado === "3"), enviar valoración
      if (String(estado) === "3") {
        // construir payload de valoración
        const valoracionPayload = {
          id_ticket: parseInt(dataForm.id_ticket, 10),
          id_usuario: parseInt(dataForm.id_usuario, 10),
          puntuacion: parseInt(dataForm.puntuacion, 10),
          comentario: dataForm.comentario ?? null
        };

        // Llamada al servicio de valoración
        const respValor = await TicketService.valoracionTicket(valoracionPayload);

        if (!respValor || !respValor.data) {
          // avisar pero no detener el flujo (podrías decidir hacer rollback si lo prefieres)
          toast.error("Error al enviar la valoración, pero el ticket se cerró correctamente.");
        } else {
          toast.success("Valoración enviada correctamente");
        }
      }

      // 5) Mensaje final y redirección
      toast.success(`${tituloTicket} - estado actualizado.`, { duration: 4000, position: "top-center" });
      navigate("/tickets");
    } catch (err) {
      console.error("Error UpdateEstado combinado:", err);
      const message = err?.response?.data?.message || err.message || "Error al modificar estado";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  if (error) return <p className="text-red-600 p-4">{error}</p>;

  return (
    <Card className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">{t('tickets.update.changeState') || "Cambiar estado"}</h2>
      <div className="mt-2">
        <Label className="text-sm font-medium">{t('tickets.update.UserText') || "Usuario que modifica:"}</Label>
        <p className="text-sm mt-1">{correoUsuario}</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Observaciones */}
        <div>
          <Label htmlFor="observacion">{t('tickets.update.Observations') || "Observaciones"}</Label>
          <Controller
            name="observacion"
            control={control}
            render={({ field }) => <Textarea {...field} placeholder={t('tickets.update.ObservationText') || "Observaciones..."} />}
          />
          {errors.observacion && <p className="text-sm text-red-500">{errors.observacion.message}</p>}
        </div>

        {/* Si estado === "3" mostramos la sección de valoración */}
        {String(estado) === "3" && (
          <div className="space-y-6 border-t pt-6">
            <h3 className="text-xl font-semibold">Valorar Ticket</h3>
            <p className="text-sm text-muted-foreground">Valora la atención recibida para el ticket #{idTicket}</p>

            {/* Estrellas */}
            <div className="space-y-4">
              <Label className="block text-lg font-semibold">Puntuación *</Label>
              <div className="flex justify-center">
                <div onMouseLeave={() => setHoverRating(0)}>
                  <StarRating
                    value={puntuacionActual}
                    onChange={(rating) => setValue("puntuacion", rating)}
                    onHover={setHoverRating}
                  />
                </div>
              </div>

              {puntuacionActual > 0 && (
                <div className="text-center">
                  <p className="text-3xl font-bold text-gray-800">{puntuacionActual}/5</p>
                  <p className="text-lg text-gray-600 mt-2">
                    {puntuacionActual === 1 && "Servicio muy deficiente"}
                    {puntuacionActual === 2 && "Servicio podría mejorar"}
                    {puntuacionActual === 3 && "Servicio aceptable"}
                    {puntuacionActual === 4 && "Buen servicio"}
                    {puntuacionActual === 5 && "Servicio excepcional"}
                  </p>
                </div>
              )}

              {errors.puntuacion && <p className="text-sm text-red-500">{errors.puntuacion.message}</p>}
            </div>

            {/* Comentario */}
            <div className="space-y-3">
              <Label htmlFor="comentario" className="text-lg font-semibold">Comentario (Opcional)</Label>
              <Controller
                name="comentario"
                control={control}
                render={({ field }) => (
                  <Textarea {...field} id="comentario" placeholder="Comparte tu experiencia (opcional)..." className="min-h-[120px] resize-none" maxLength={500} />
                )}
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>{(comentarioActual?.length) || 0}/500 caracteres</span>
                <span>Opcional</span>
              </div>
              {errors.comentario && <p className="text-sm text-red-500">{errors.comentario.message}</p>}
            </div>
          </div>
        )}

        {/* Evidencias */}
        <div className="mb-6">
          <Label htmlFor="image" className="block mb-1 text-sm font-medium">{t('tickets.update.Evidence') || "Evidencias"}</Label>
          <div
            className="relative border-2 border-dashed border-muted/50 rounded-lg p-20 flex flex-col gap-3 cursor-pointer hover:border-primary transition-colors"
            onClick={() => document.getElementById("image").click()}
          >
            {previewURLs.length === 0 ? (
              <p className="text-sm text-muted-foreground">{t('tickets.update.EvidenceText') || "Haz clic o selecciona una o varias imágenes (jpg, png, 5MB máx.)"}</p>
            ) : (
              <div className="flex gap-3 flex-wrap">
                {previewURLs.map((src, i) => (
                  <img key={i} src={src} className="w-28 h-28 object-cover rounded-md shadow" />
                ))}
              </div>
            )}
          </div>

          <input type="file" id="image" className="hidden" accept="image/*" multiple onChange={handleChangeImage} />
        </div>

        {/* Botones */}
        <div className="flex justify-between gap-4 mt-6">
          <Button type="button" variant="default" className="flex items-center gap-2 bg-destructive text-white" onClick={() => navigate(-1)} disabled={loading}>
            <ArrowLeft className="w-4 h-4" />
            {t('common.back') || "Regresar"}
          </Button>

          <Button type="submit" className="flex-1" disabled={loading || (String(estado) === "3" && puntuacionActual === 0)}>
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                {"Procesando..."}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Save className="w-4 h-4" />
                {t('common.save') || "Guardar"}
              </div>
            )}
          </Button>
        </div>
      </form>
    </Card>
  );
}

export default UpdateEstado;
