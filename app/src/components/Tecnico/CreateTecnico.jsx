import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// shadcn/ui
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// icons
import { Plus, Save, ArrowLeft } from "lucide-react";

// servicios
import EspecialidadService from "@/services/EspecialidadService";
import TecnicoService from "@/services/TecnicoService";

// componentes reutilizables
import { CustomMultiSelect } from "../ui/custom/custom-multiple-select"; // select multi con chips
import { CustomSelect } from "../ui/custom/custom-select";
import { CustomInputField } from "../ui/custom/custom-input-field";

export function CreateTecnico() {
  const navigate = useNavigate();

  /*** Estados para selects ***/
  const [dataEspecialidades, setDataEspecialidades] = useState([]);
  const [error, setError] = useState("");

/*** Esquema de validación Yup ***/
const TecnicoSchema = yup.object({
    nombre: yup
      .string()
      .required('El nombre es requerido')
      .min(2, "El nombre debe tener al menos 2 caracteres"),
    
    correo: yup
      .string()
      .email('Ingresa un correo electrónico válido')
      .required('El correo electrónico es obligatorio')
      .matches(
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'El formato del correo no es válido'
      ),
    
    contrasena: yup
      .string()
      .required('La contraseña es obligatoria')
      .min(8, 'La contraseña debe tener al menos 8 caracteres')
      .matches(/[A-Z]/, 'Debe contener al menos una letra mayúscula')
      .matches(/[a-z]/, 'Debe contener al menos una letra minúscula')
      .matches(/[0-9]/, 'Debe contener al menos un número')
      .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Debe contener al menos un carácter especial')
      .max(50, 'La contraseña no puede exceder los 50 caracteres'),
    
      disponibilidad: yup
      .string()
      .required('La disponibilidad es requerida')
      .oneOf(
        ['disponible', 'ocupado', 'desconectado', 'vacaciones'], 
        'Seleccione una disponibilidad válida'
      ),
    
    especialidades: yup.array().min(1, 'La especialidad es requerida')
  });

    /*** React Hook Form ***/
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            nombre: "",
            correo: "",
            contrasena: "",
            disponibilidad: "",
            especialidades: [],
        },
        resolver: yupResolver(TecnicoSchema)
    });
  
  


 
  /***Listados de carga en el formulario ***/
  useEffect(()=>{
    const fechData=async()=>{
      try {
        //Lista de especialidades
        const EspecialidadesRes= await EspecialidadService.getAll()
       
        // Si la petición es exitosa, se guardan los datos 
        setDataEspecialidades(EspecialidadesRes.data.data || []); 
        console.log(EspecialidadesRes) 
        
      } catch (error) {
        console.log(error)
        if(error.name != "AbortError") setError(error.message)
      }
    }
    fechData()
  },[])

  /*** Submit ***/
   const onSubmit = async (dataForm) => {
    

    try {
      console.log(dataForm)
      if (TecnicoSchema.isValid()) { 
        //Verificar datos del formulario 
        console.log(dataForm) 
        //Crear tecnico en el API 
        const response = await TecnicoService.createTecnico(dataForm); 
        if (response.data) { 
          
          //Notificación de creación 
          toast.success(`Tecnico creado #${response.data.data.id} - ${response.data.data.nombre}`, { 
            duration: 4000, 
            position: "top-center", 
          }); 
          //Redireccionar al listado del mantenimiento 
          navigate("/tecnicos"); 
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
      <h2 className="text-2xl font-bold mb-6">Crear Tecnico</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Nombre */}
        <div>
          <Label className="block mb-1 text-sm font-medium" htmlFor="title">Nombre</Label>
          {/* Controller entrada título */}
          <Controller name="nombre" control={control} render={({field})=>
            <Input {...field} id="nombre" placeholder="Ingrese el nombre" />
          } />
          {/* Error entrada título */}
          {errors.nombre && <p className="text-sm text-red-500">{errors.nombre.message}</p>}
        </div>

        {/* Correo*/}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            {/* Controller entrada correo */}
            <Controller name="correo" control={control} render={({field})=>
              <CustomInputField 
                {...field} 
                label="Correo" 
                placeholder="ejemplo@gmail.com"
                error={errors.correo?.message}
              />
            } />
          </div>

          {/*Contraseña*/}
          <div>
            <Controller
              name="contrasena"
              control={control}
              render={({ field }) =>
                <CustomInputField
                  {...field}
                  label="Contraseña"
                  placeholder=""
                  error={errors.contrasena?.message} />
              }
            />
          </div>
                  {/* Disponibilidad - Combobox */}
                  <div>
                      <Label className="block mb-1 text-sm font-medium" htmlFor="disponibilidad">
                          Disponibilidad
                      </Label>
                      <Controller
                          name="disponibilidad"
                          control={control}
                          render={({ field }) => (
                              <Select onValueChange={field.onChange} value={field.value}>
                                  <SelectTrigger className="w-full">
                                      <SelectValue placeholder="Seleccione la disponibilidad" />
                                  </SelectTrigger>
                                  <SelectContent>
                                      <SelectItem value="disponible">Disponible</SelectItem>
                                      <SelectItem value="ocupado">Ocupado</SelectItem>
                                      <SelectItem value="desconectado">Desconectado</SelectItem>
                                      <SelectItem value="vacaciones">Vacaciones</SelectItem>
                                  </SelectContent>
                              </Select>
                          )}
                      />
                      {errors.disponibilidad && (
                          <p className="text-sm text-red-500">{errors.disponibilidad.message}</p>
                      )}
                  </div>
        </div>

        
        {/* Especialidades */}
        <div>
          {/* Controller entrada Especialidades */}
          <Controller name="especialidades" control={control} render={({field})=> 
            <CustomMultiSelect
              field={field}
              data={dataEspecialidades}
              label="Especialidades"
              getOptionLabel={(item)=>item.nombre}
              getOptionValue={(item)=> item.id} 
              error={errors.especialidades?.message}
              placeholder="Seleccione especialidades"
            />
          } />
        </div>
       

        <div className="flex justify-between gap-4 mt-6">
          <Button
            type="button"
            variant="default" // sólido
            className="flex items-center gap-2 bg-destructive text-white"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-4 h-4" />
            Regresar
          </Button>
          {/* Botón Guardar */}
          <Button type="submit" className="flex-1 ">
            <Save className="w-4 h-4" />
            Guardar
          </Button>
        </div>
      </form>
    </Card>
  );
}
