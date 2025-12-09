import {  useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

// shadcn/ui
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

// icons
import { Save, ArrowLeft, Star } from "lucide-react";

// servicios
import TicketService from "@/services/TicketService";

// componentes reutilizables
import { CustomInputField } from "../ui/custom/custom-input-field";

export function ValoracionTicket() {
  const navigate = useNavigate();
  const { idTicket } = useParams();
  const idUsuario = localStorage.getItem("idUsuario");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hoverRating, setHoverRating] = useState(0);

  // Esquema de validación
  const ValoracionSchema = yup.object({
    puntuacion: yup
      .number()
      .required("La puntuación es requerida")
      .min(1, "La puntuación mínima es 1")
      .max(5, "La puntuación máxima es 5")
      .integer("La puntuación debe ser un número entero"),
    
    comentario: yup
      .string()
      .notRequired()
      .max(500, "El comentario no puede exceder los 500 caracteres")
      .nullable()
      .transform((value) => value === '' ? null : value),
  });

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id_ticket: idTicket || "",
      id_usuario: idUsuario || "",
      puntuacion: 0,
      comentario: "",
    },
    resolver: yupResolver(ValoracionSchema)
  });

  // Observar el valor de puntuación
  const puntuacionActual = watch("puntuacion");

  // Componente de estrellas interactivo
  const StarRating = ({ value, onChange, onHover }) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className="focus:outline-none transition-transform hover:scale-110"
            onClick={() => onChange(star)}
            onMouseEnter={() => onHover(star)}
            onMouseLeave={() => onHover(0)}
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

  const onSubmit = async (dataForm) => {
    try {
      setLoading(true);
      setError("");
      
      console.log("Datos enviados:", dataForm);
      
      const isValid = await ValoracionSchema.isValid(dataForm);
      if (isValid) {
        // Asegurar que los IDs sean números
        const datosEnviar = {
          ...dataForm,
          id_ticket: parseInt(dataForm.id_ticket),
          id_usuario: parseInt(dataForm.id_usuario),
        };
        
        const response = await TicketService.valoracionTicket(datosEnviar);
        
        if (response.data) {
          toast.success("¡Valoración enviada exitosamente!", {
            duration: 4000,
            position: "top-center",
          });
          
          // Redirigir al detalle del ticket o a la lista
          navigate(`/tickets/${idTicket}`);
        } else if (response.error) {
          setError(response.error);
        }
      }
    } catch (err) {
      console.error("Error completo:", err);
      
      const errorMsg = err.response?.data?.message || 
                      err.response?.data?.error || 
                      err.message || 
                      "Error al enviar la valoración";
      
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // Textos descriptivos según puntuación
  const getRatingDescription = (rating) => {
    const descriptions = {
      1: "Servicio muy deficiente",
      2: "Servicio podría mejorar",
      3: "Servicio aceptable",
      4: "Buen servicio",
      5: "Servicio excepcional",
    };
    return descriptions[rating] || "";
  };

  if (error) return <p className="text-red-600 p-4">{error}</p>;

  return (
    <Card className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-2">Valorar Ticket</h2>
      <p className="text-gray-600 mb-6">
        Valoración del servicio para el ticket #{idTicket}
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Campo oculto para el ID del ticket */}
        <Controller
          name="id_ticket"
          control={control}
          render={({ field }) => (
            <input type="hidden" {...field} />
          )}
        />

        {/* Campo oculto para el ID del usuario */}
        <Controller
          name="id_usuario"
          control={control}
          render={({ field }) => (
            <input type="hidden" {...field} />
          )}
        />

        {/* Puntuación con estrellas */}
        <div className="space-y-4">
          <Label className="block text-lg font-semibold">
            Puntuación *
          </Label>
          
          <div className="flex flex-col items-center space-y-4 p-6 bg-gray-50 rounded-lg">
            {/* Estrellas interactivas */}
            <div
              onMouseLeave={() => setHoverRating(0)}
            >
              <StarRating
                value={puntuacionActual}
                onChange={(rating) => setValue("puntuacion", rating)}
                onHover={setHoverRating}
              />
            </div>

            {/* Indicador numérico y descripción */}
            {puntuacionActual > 0 && (
              <div className="text-center">
                <p className="text-3xl font-bold text-gray-800">
                  {puntuacionActual}/5
                </p>
                <p className="text-lg text-gray-600 mt-2">
                  {getRatingDescription(puntuacionActual)}
                </p>
              </div>
            )}

            {/* Etiquetas debajo de cada estrella */}
            <div className="flex justify-between w-full max-w-md mt-4 text-sm text-gray-500">
              <span>Muy Malo</span>
              <span>Malo</span>
              <span>Regular</span>
              <span>Bueno</span>
              <span>Excelente</span>
            </div>
          </div>

          {errors.puntuacion && (
            <p className="text-sm text-red-500">{errors.puntuacion.message}</p>
          )}
        </div>

        {/* Comentario */}
        <div className="space-y-3">
          <Label htmlFor="comentario" className="text-lg font-semibold">
            Comentario (Opcional)
          </Label>
          
          <Controller
            name="comentario"
            control={control}
            render={({ field }) => (
              <Textarea
                {...field}
                id="comentario"
                placeholder="Comparte tu experiencia con el servicio recibido (opcional)..."
                className="min-h-[120px] resize-none"
                maxLength={500}
              />
            )}
          />
          
          <div className="flex justify-between text-sm text-gray-500">
            <span>
              {watch("comentario")?.length || 0}/500 caracteres
            </span>
            <span>Opcional</span>
          </div>
          
          {errors.comentario && (
            <p className="text-sm text-red-500">{errors.comentario.message}</p>
          )}
        </div>

        {/* Botones */}
        <div className="flex justify-between gap-4 pt-6 border-t">
          <Button
            type="button"
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => navigate(-1)}
            disabled={loading}
          >
            <ArrowLeft className="w-4 h-4" />
            Cancelar
          </Button>
          
          <Button 
            type="submit" 
            className="flex-1 max-w-xs"
            disabled={loading || puntuacionActual === 0}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Guardando...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Save className="w-4 h-4" />
                Enviar Valoración
              </div>
            )}
          </Button>
        </div>
      </form>
    </Card>
  );
}