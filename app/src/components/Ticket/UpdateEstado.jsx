import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";


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
import TicketService from "@/services/TicketService";
import ImagesService from "@/services/ImagesService";

// Componentes personalizados
import { CustomMultiSelect } from "../ui/custom/custom-multiple-select";
import { CustomInputField } from "../ui/custom/custom-input-field";
import NotificacionService from "@/services/NotificacionService";


export function UpdateEstado() {
  const navigate = useNavigate();
  const correoUsuario = localStorage.getItem("correo");

  const idUsuario = localStorage.getItem("idUsuario");
  //Obtener parámetro del id del tecnico
  const { idTicket, estado } = useParams();


  const [files, setFiles] = useState([]);
  const [previewURLs, setPreviewURLs] = useState([]);
  const [error, setError] = useState("");

 /*** Validación Yup ***/
 const TicketSchema = yup.object({
    
    observacion: yup
      .string()
      .required("La observacion es obligatoria")
      .min(5, "Debe tener al menos 5 caracteres"),
    
    
  });

  /*** React Hook Form ***/
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
        id_ticket: idTicket,
        estado: estado,
        id_usuario: idUsuario,
        observacion: "",
        
     
    },
    resolver:yupResolver(TicketSchema)
  });
  


  /*** Manejo de imagen ***/
  const handleChangeImage = (e) => {
    const selectedFiles = Array.from(e.target.files);
  
    setFiles((prev) => [...prev, ...selectedFiles]);
  
    // Generar previews
    const newPreviews = selectedFiles.map((file) =>
      URL.createObjectURL(file)
    );
  
    setPreviewURLs((prev) => [...prev, ...newPreviews]);
  };
  
  

  /*** Submit ***/
  const onSubmit = async (dataForm) => {
    

    try {
      console.log(dataForm)
      if (TicketSchema.isValid()) { 
        //Verificar datos del formulario 
        console.log(dataForm) 
        //Crear ticket en el API 
        const response = await TicketService.updateEstado(dataForm); 
        if (response.data) { 
          
          //FormData para guardar imagen 
          const formData = new FormData();
          formData.append("id_historial", response.data.data.id_historial);
          formData.append("id_usuario", idUsuario);

          // Adjuntar todas las imágenes
          files.forEach((file) => {
            formData.append("files[]", file);
          });

          // Enviar
          await ImagesService.uploadEvidence(formData);

           //Generar Notificacion
           const formDataNoti = new FormData();
           formDataNoti.append("id_usuario", response.data.data.id_usuario_solicitante); 
           formDataNoti.append("tipo_id", 2);
           formDataNoti.append("id_usuario_origen", idUsuario);
           let contenido = "";
           switch (parseInt(estado)) {
            case 2:
             contenido = "Ticket puesto en proceso";
              break;
              case 5:
             contenido = "El Ticket se ha resuelto";
              break;
              case 3:
             contenido = "Ticket ha sido cerrado en proceso";
              break;
            
           
            default:
              break;
           }
           formDataNoti.append("contenido", contenido);
           formDataNoti.append("atendida", 0);
           await NotificacionService.createNotificacion(formDataNoti);
          //Notificación de creación 
          toast.success(`Estado actualizado #${response.data.data.id} - ${response.data.data.titulo}`, { 
            duration: 4000, 
            position: "top-center", 
          }); 
          //Redireccionar al listado del mantenimiento 
          navigate("/tickets"); 
        } else if (response.error) { 
          setError(response.error); 
        } 
      } 
    } catch (err) {
      console.error(err);
      setError("Error al modificar estado");
    }
  };

  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <Card className="p-6 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Cambiar estado</h2>
        {/* Usuario del cambio */}
        <div className="mt-2">
          <Label className="text-sm font-medium">Usuario Modificador:</Label>
          <p className="text-sm mt-1">
            {correoUsuario }
          </p>
        </div>
  
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
         
          {/* Observaciones */}
          <div>
            <Label htmlFor="observacion">Observaciones</Label>
            <Controller
              name="observacion"
              control={control}
              render={({ field }) => <Textarea {...field} placeholder="Observaciones a considerar" />}
            />
            {errors.observacion && <p className="text-sm text-red-500">{errors.observacion.message}</p>}
          </div>
  
          

        {/* Evidencias */}
        <div className="mb-6">
          <Label htmlFor="image" className="block mb-1 text-sm font-medium">
            Evidencias
          </Label>

          <div
            className="relative border-2 border-dashed border-muted/50 rounded-lg p-20 flex flex-col gap-3 cursor-pointer hover:border-primary transition-colors"
            onClick={() => document.getElementById("image").click()}
          >
            {previewURLs.length === 0 && (
              <p className="text-sm text-muted-foreground">
                Haz clic o selecciona una o varias imágenes (jpg, png, 5MB máx.)
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

  
          
  
          
  
          {/* Botones */}
          <div className="flex justify-between gap-4 mt-6">
            <Button
              type="button"
              variant="default"
              className="flex items-center gap-2 bg-destructive text-white"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="w-4 h-4" />
              Regresar
            </Button>
            <Button type="submit" className="flex-1">
              <Save className="w-4 h-4" />
              Guardar
            </Button>
          </div>
        </form>
      </Card>
    );
}
