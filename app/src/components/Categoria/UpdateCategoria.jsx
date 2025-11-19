import { useEffect, useState } from "react";
import { useForm, Controller,  } from "react-hook-form";
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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// icons
import { Plus, Save, ArrowLeft } from "lucide-react";

// servicios
import EspecialidadService from "@/services/EspecialidadService";
import EtiquetasService from "@/services/EtiquetasService";
import SlaService from "@/services/SlaService";
import CategoriaService from "@/services/CategoriaService";

// componentes reutilizables
import { CustomMultiSelect } from "../ui/custom/custom-multiple-select"; // select multi con chips
import { CustomInputField } from "../ui/custom/custom-input-field";

export function UpdateCategoria() {
  const navigate = useNavigate();
  //Obtener parámetro del id del tecnico
  const { id }=useParams();

    /*** Estados ***/
    const [dataEspecialidades, setDataEspecialidades] = useState([]);
    const [dataEtiquetas, setDataEtiquetas] = useState([]);
    const [dataSLA, setDataSLA] = useState([]);
    const [dataCategoria, setDataCategoria] = useState([]);

    const [error, setError] = useState("");

  /*** Validación Yup ***/
  const CategoriaSchema = yup.object({
    nombre: yup
      .string()
      .required("El nombre de la categoría es obligatorio")
      .min(2, "Debe tener al menos 2 caracteres"),
    descripcion: yup
      .string()
      .required("La descripción es obligatoria")
      .min(5, "Debe tener al menos 5 caracteres"),
    id_sla: yup.string().required("Debe seleccionar un SLA"),
    etiquetas: yup.array().min(1, "Debe seleccionar al menos una etiqueta"),
    especialidades: yup.array().min(1, "Debe seleccionar al menos una especialidad"),
    
  });

  /*** React Hook Form ***/
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
        id_categoria:"",
        nombre: "",
        descripcion: "",
        id_sla: "",
        etiquetas: [],
        especialidades: [],
    },
    values: dataCategoria,
    resolver:yupResolver(CategoriaSchema)
  });
  


  /***Listados de carga en el formulario ***/
  useEffect(()=>{
    const fechData=async()=>{
      try {
        //Lista de especialidades
        const espRes= await EspecialidadService.getAll()
        const etiqRes= await EtiquetasService.getAll()
        const slaRes= await SlaService.getAll()
        //Obtener Categoria a actualizar
        const categoriaRes=await CategoriaService.getDetalleById(id)

        // Si la petición es exitosa, se guardan los datos 
        setDataEspecialidades(espRes.data.data || []);
        setDataEtiquetas(etiqRes.data.data || []);
        setDataSLA(slaRes.data.data || []);
        
        console.log(espRes)

        //Obtener tecnico y asignarla formulario
        if(categoriaRes.data){
          const categoria=categoriaRes.data.data
          console.log("Datos de la categoria:", categoria) // Debug
          
          reset({
            id_categoria:categoria.id,
            nombre: categoria.nombre,
            descripcion: categoria.descripcion,
            id_sla: categoria.id_sla,
            etiquetas:categoria.etiquetas.map(et => et.id),
            especialidades:categoria.especialidades.map(ep => ep.id),

          }) 
          setDataCategoria(categoria)
        }
      } catch (error) {
        console.log(error)
        if(error.name != "AbortError") setError(error.message)
      }
    }
    fechData()
  },[id])

  /*** Submit ***/
  const onSubmit = async (dataForm) => {
    
    try {
      console.log(dataForm)
      if (CategoriaSchema.isValid()) { 
        //Verificar datos del formulario 
        console.log("Dataform",dataForm) 
        //Crear tecnico en el API 
        const response = await CategoriaService.updateCategoria(dataForm); 
        if (response.data) { 
          console.log("response",response) 

          //Notificación de creación 
          toast.success(`Categoria actualizada #${response.data.data.id} - ${response.data.data.nombre}`, { 
            duration: 4000, 
            position: "top-center",     
          }); 
          //Redireccionar al listado del mantenimiento 
          navigate("/categorias"); 
        } else if (response.error) { 
          setError(response.error); 
        } 
      } 
    } catch (err) {
      console.error(err);
      setError("Error al crear tecnico");
    }
  };

  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <Card className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Crear Categoría</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Nombre */}
        <div>
          <Label htmlFor="nombre">Nombre</Label>
          <Controller
            name="nombre"
            control={control}
            render={({ field }) => <Input {...field} placeholder="Nombre de la categoría" />}
          />
          {errors.nombre && <p className="text-sm text-red-500">{errors.nombre.message}</p>}
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

        {/* SLA */}
        <div>
          <Label>SLA</Label>
          <Controller
            name="id_sla"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccione un SLA" />
                </SelectTrigger>
                <SelectContent>
                  {dataSLA.map((sla) => (
                    <SelectItem key={sla.id} value={String(sla.id)}>
                      {sla.nombre} — ({sla.tiempo_respuesta_minutos}m resp /{" "}
                      {sla.tiempo_resolucion_minutos}m res)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.id_sla && <p className="text-sm text-red-500">{errors.id_sla.message}</p>}
        </div>

        

        {/* Etiquetas */}
        <div>
          <Controller
            name="etiquetas"
            control={control}
            render={({ field }) => (
              <CustomMultiSelect
                field={field}
                data={dataEtiquetas}
                label="Etiquetas"
                getOptionLabel={(item) => item.nombre}
                getOptionValue={(item) => item.id}
                error={errors.etiquetas?.message}
                placeholder="Seleccione etiquetas"
              />
            )}
          />
        </div>

        {/* Especialidades */}
        <div>
          <Controller
            name="especialidades"
            control={control}
            render={({ field }) => (
              <CustomMultiSelect
                field={field}
                data={dataEspecialidades}
                label="Especialidades"
                getOptionLabel={(item) => item.nombre}
                getOptionValue={(item) => item.id}
                error={errors.especialidades?.message}
                placeholder="Seleccione especialidades"
              />
            )}
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
