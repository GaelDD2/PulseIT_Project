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

export function UpdateTecnico() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();

  const [dataEspecialidades, setDataEspecialidades] = useState([]);
  const [dataTecnico, setDatatecnico] = useState([]);
  const [error, setError] = useState("");

  const TecnicoSchema = yup.object({
    nombre: yup
      .string()
      .required(t('validation.required', { field: t('technicians.name') }))
      .min(2, t('validation.min', { field: t('technicians.name'), min: 2 })),
    
    correo: yup
      .string()
      .email(t('validation.email'))
      .required(t('validation.required', { field: t('technicians.email') }))
      .matches(
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        t('validation.email')
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
    
    disponibilidad: yup
      .string()
      .required(t('validation.required', { field: t('technicians.availability') }))
      .oneOf(
        ['disponible', 'ocupado', 'desconectado', 'vacaciones'], 
        t('validation.invalidAvailability')
      ),
    
    especialidades: yup.array().min(1, t('categories.validation.minOneSpecialty'))
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: "",
      nombre: "",
      correo: "",
      contrasena: "",
      disponibilidad: "",
      especialidades: [],
    },
    values: dataTecnico,
    resolver: yupResolver(TecnicoSchema)
  });

  useEffect(() => {
    const fechData = async () => {
      try {
        const EspecialidadesRes = await EspecialidadService.getAll();
        const tecnicoRes = await TecnicoService.getDetalleById(id);

        setDataEspecialidades(EspecialidadesRes.data.data || []);

        if (tecnicoRes.data) {
          const tecnico = tecnicoRes.data.data;
          reset({
            id: tecnico.id,
            nombre: tecnico.nombre,
            correo: tecnico.correo,
            contrasena: "",
            disponibilidad: tecnico.disponibilidad,
            especialidades: tecnico.especialidades.map(e => e.id),
          });
          setDatatecnico(tecnico);
        }
      } catch (error) {
        console.log(error);
        if (error.name != "AbortError") setError(error.message);
      }
    };
    fechData();
  }, [id]);

  const onSubmit = async (dataForm) => {
    try {
      const isValid = await TecnicoSchema.isValid(dataForm);
      if (isValid) {
        const response = await TecnicoService.updateTecnico(dataForm);
        if (response.data) {
          toast.success(t('technicians.success.updated', {
            id: response.data.data.id,
            name: response.data.data.nombre
          }), {
            duration: 4000,
            position: "top-center",
          });
          navigate("/tecnicos");
        } else if (response.error) {
          setError(response.error);
        }
      }
    } catch (err) {
      console.error(err);
      setError(t('technicians.errors.update'));
    }
  };

  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <Card className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">{t('technicians.update')}</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <Label className="block mb-1 text-sm font-medium" htmlFor="title">
            {t('technicians.name')}
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

          <div>
            <Label className="block mb-1 text-sm font-medium" htmlFor="disponibilidad">
              {t('technicians.availability')}
            </Label>
            <Controller
              name="disponibilidad"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={t('technicians.placeholders.selectAvailability')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="disponible">{t('technicians.availabilityOptions.available')}</SelectItem>
                    <SelectItem value="ocupado">{t('technicians.availabilityOptions.busy')}</SelectItem>
                    <SelectItem value="desconectado">{t('technicians.availabilityOptions.offline')}</SelectItem>
                    <SelectItem value="vacaciones">{t('technicians.availabilityOptions.vacation')}</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.disponibilidad && (
              <p className="text-sm text-red-500">{errors.disponibilidad.message}</p>
            )}
          </div>
        </div>

        <div>
          <Controller 
            name="especialidades" 
            control={control} 
            render={({ field }) => 
              <CustomMultiSelect
                field={field}
                data={dataEspecialidades}
                label={t('technicians.specialties')}
                getOptionLabel={(item) => item.nombre}
                getOptionValue={(item) => item.id}
                error={errors.especialidades?.message}
                placeholder={t('technicians.placeholders.selectSpecialties')}
              />
            } 
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
