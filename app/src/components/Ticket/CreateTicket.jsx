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

export function CreateTicket() {
  const navigate = useNavigate();
  const idUsuario = localStorage.getItem("idUsuario");
  

  /*** Estados para selects y preview de imagen ***/
  const [dataEtiqueta, setDataEtiqueta] = useState([]);
  const [categoriaNombre, setCategoriaNombre] = useState("");

  const [files, setFiles] = useState([]);
  const [previewURLs, setPreviewURLs] = useState([]);
  const [error, setError] = useState("");

 /*** Validación Yup ***/
 const TicketSchema = yup.object({
    titulo: yup
      .string()
      .required("El titulo del ticket es obligatorio")
      .min(2, "Debe tener al menos 2 caracteres"),
    descripcion: yup
      .string()
      .required("La descripción es obligatoria")
      .min(5, "Debe tener al menos 5 caracteres"),
    prioridad: yup.string().required("Debe seleccionar la prioridad"),
    
    id_etiqueta: yup.string().required("Debe seleccionar la etiqueta"),
    
  });

  /*** React Hook Form ***/
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
  
  /***Listados de carga en el formulario ***/
  useEffect(()=>{
    const fechData=async()=>{
      try {
        //lista de etiquetas
        const etiquetasRes= await EtiquetasService.getAll()
       
        // Si la petición es exitosa, se guardan los datos 
        setDataEtiqueta(etiquetasRes.data.data || []); 
       
        console.log(etiquetasRes) 
        
      } catch (error) {
        console.log(error)
        if(error.name != "AbortError") setError(error.message)
      }
    }
    fechData()
  },[])

  /*** Submit ***/
  const onSubmit = async (dataForm) => {
    /* if (!file) {
      toast.error("Debes seleccionar una imagen para la película");
      return;
    } */

    try {
      console.log(dataForm)
      if (TicketSchema.isValid()) { 
        //Verificar datos del formulario 
        console.log(dataForm) 
        //Crear ticket en el API 
        const response = await TicketService.createTicket(dataForm); 
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
          //Notificación de creación 
          toast.success(`Ticket creado #${response.data.data.id} - ${response.data.data.titulo}`, { 
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
      setError("Error al crear ticket");
    }
  };

  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <Card className="p-6 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Crear Ticket</h2>
  
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Titulo */}
          <div>
            <Label htmlFor="nombre">Titulo</Label>
            <Controller
              name="titulo"
              control={control}
              render={({ field }) => <Input {...field} placeholder="Ingrese el titulo" />}
            />
            {errors.titulo && <p className="text-sm text-red-500">{errors.titulo.message}</p>}
          </div>
  
          {/* Descripción */}
          <div>
            <Label htmlFor="descripcion">Descripción</Label>
            <Controller
              name="descripcion"
              control={control}
              render={({ field }) => <Textarea {...field} placeholder="Descripción breve" />}
            />
            {errors.descripcion && <p className="text-sm text-red-500">{errors.descripcion.message}</p>}
          </div>
  
          <Label>Etiqueta</Label>
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
                    response.data?.data?.[0]?.nombre ?? "Sin categoría"
                  );
                } catch {
                  setCategoriaNombre("Error al cargar");
                }
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Seleccione una etiqueta" />
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

        {/* Categoría debajo */}
        <div className="mt-2">
          <Label className="text-sm font-medium">Categoría:</Label>
          <p className="text-sm mt-1">
            {categoriaNombre || "Seleccione una etiqueta"}
          </p>
        </div>

              {/* Prioridad */}
              <div>
                  <Label>Prioridad</Label>
                  <Controller
                      name="prioridad"
                      control={control}
                      render={({ field }) => (
                          <Select onValueChange={field.onChange} value={field.value}>
                              <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Seleccione la prioridad" />
                              </SelectTrigger>

                              <SelectContent>
                                  <SelectItem value="1">Normal</SelectItem>
                                  <SelectItem value="2">Alta</SelectItem>
                                  <SelectItem value="3">Urgente</SelectItem>
                              </SelectContent>
                          </Select>
                      )}
                  />

                  {errors.prioridad && (
                      <p className="text-sm text-red-500">{errors.prioridad.message}</p>
                  )}
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
