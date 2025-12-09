import {  useState } from "react";
import { useForm, Controller,  } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate,  } from "react-router-dom";
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
import { CustomInputField } from "../ui/custom/custom-input-field";

import { useTranslation } from 'react-i18next';
import UsuarioService from "@/services/UsuarioService";

export function CreateUsuario() {
  const { t } = useTranslation();
  const navigate = useNavigate();
 

  const [error, setError] = useState("");

  const UserSchema = yup.object({
    nombre: yup
      .string()
      .required(t('validation.required', { field: t('technicians.name') }))
      .min(2, t('validation.min', { field: t('technicians.name'), min: 2 })),
    
    correo: yup
      .string()
      .email("Ingresa una dirección de correo valida")
      .required("El correo es requerido")
      .matches(
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Ingresa una dirección de correo válida"
      ),
    
    contrasena: yup
      .string()
      .notRequired()
      .min(8, t('validation.password.min'))
      .matches(/[A-Z]/, t('validation.password.uppercase'))
      .matches(/[a-z]/, t('validation.password.lowercase'))
      .matches(/[0-9]/, t('validation.password.number'))
      .matches(/[!@#$%^&*(),.?":{}|<>]/, t('validation.password.special'))
      .max(50, t('validation.password.max'))
      .nullable()
      .transform((value) => value === '' ? null : value),
    
    
  });

  const {
    control,
    handleSubmit,
   
    formState: { errors },
  } = useForm({
    defaultValues: {
      
      nombre: "",
      correo: "",
      contrasena: "",
      
    },
   
    resolver: yupResolver(UserSchema)
  });

  const onSubmit = async (dataForm) => {
    try {
      const isValid = await UserSchema.isValid(dataForm);
      console.log("dataform->" ,dataForm)
      if (isValid) {
        const response = await UsuarioService.createUser(dataForm);
        
        console.log("Response->" ,response)
        if (response.data) {
          toast.success(t('user.created', {
            id: response.data.data.id,
            name: response.data.data.nombre
          }), {
            duration: 4000,
            position: "top-center",
          });
          navigate("/users");
        } else if (response.error) {
          setError(response.error);
        }
      }
    } catch (err) {
      console.error(err);
      setError("Error al crear Usuario");
    }
  };

  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <Card className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Usuario Nuevo</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <Label className="block mb-1 text-sm font-medium" htmlFor="title">
            Nombre
          </Label>
          <Controller 
            name="nombre" 
            control={control} 
            render={({ field }) =>
              <Input {...field} id="nombre" placeholder={t('technicians.placeholders.name')} />
            } 
          />
          {errors.nombre && <p className="text-sm text-red-500">{errors.nombre.message}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <Controller 
              name="correo" 
              control={control} 
              render={({ field }) =>
                <CustomInputField 
                  {...field} 
                  label={t('technicians.email')}
                  placeholder={t('technicians.placeholders.email')}
                  error={errors.correo?.message}
                />
              } 
            />
          </div>

          <div>
            <Controller
              name="contrasena"
              control={control}
              render={({ field }) =>
                <CustomInputField
                  {...field}
                  label={t('technicians.password')}
                  placeholder={t('technicians.placeholders.password')}
                  error={errors.contrasena?.message} />
              }
            />
          </div>

      
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
