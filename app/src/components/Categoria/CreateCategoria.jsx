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
import EspecialidadService from "@/services/EspecialidadService";
import EtiquetasService from "@/services/EtiquetasService";
import SlaService from "@/services/SlaService";
import CategoriaService from "@/services/CategoriaService";
import { useTranslation } from 'react-i18next'; // <- NUEVO IMPORT
// Componentes personalizados
import { CustomMultiSelect } from "../ui/custom/custom-multiple-select";
import { CustomInputField } from "../ui/custom/custom-input-field";


export function CreateCategoria() {
  const { t } = useTranslation(); // <- NUEVO HOOK
  const navigate = useNavigate();

  /*** Estados ***/
  const [dataEspecialidades, setDataEspecialidades] = useState([]);
  const [dataEtiquetas, setDataEtiquetas] = useState([]);
  const [dataSLA, setDataSLA] = useState([]);
  const [, setError] = useState("");

  /*** Validación Yup ***/
  const CategoriaSchema = yup.object({
      nombre: yup
          .string()
          .required(t('validation.required', { field: t('categories.name') }))
          .min(2, t('validation.min', { field: t('categories.name'), min: 2 })),
      descripcion: yup
          .string()
          .required(t('validation.required', { field: t('categories.description') }))
          .min(5, t('validation.min', { field: t('categories.description'), min: 5 })),
      id_sla: yup.string().required(t('validation.required', { field: t('categories.sla') })),
      etiquetas: yup.array().min(1, t('categories.validation.minOneTag')),
      especialidades: yup.array().min(1, t('categories.validation.minOneSpecialty')),
  });

  const {
      control,
      handleSubmit,
      formState: { errors },
  } = useForm({
      defaultValues: {
          nombre: "",
          descripcion: "",
          id_sla: "",
          etiquetas: [],
          especialidades: [],
      },
      resolver: yupResolver(CategoriaSchema),
  });

  /*** Carga inicial de datos ***/
  useEffect(() => {
      const fetchData = async () => {
          try {
              const [espRes, etiqRes, slaRes] = await Promise.all([
                  EspecialidadService.getAll(),
                  EtiquetasService.getAll(),
                  SlaService.getAll(),
              ]);
              setDataEspecialidades(espRes.data.data || []);
              setDataEtiquetas(etiqRes.data.data || []);
              setDataSLA(slaRes.data.data || []);
          } catch (err) {
              console.error(err);
              setError(t('categories.errors.loadData'));
          }
      };
      fetchData();
  }, []);

  /*** Submit ***/
  const onSubmit = async (dataForm) => {
      try {
          console.log("Enviando datos:", dataForm);
          const response = await CategoriaService.createCategoria({
              nombre: dataForm.nombre,
              descripcion: dataForm.descripcion,
              id_sla: dataForm.id_sla,
              etiquetas: dataForm.etiquetas,
              especialidades: dataForm.especialidades,
          });

          if (response.data) {
              toast.success(t('categories.success.created', { 
                  id: response.data.id, 
                  name: response.data.nombre 
              }), {
                  duration: 4000,
                  position: "top-center",
              });
              navigate("/categorias");
          }
      } catch (err) {
          console.error(err);
          setError(t('categories.errors.create'));
      }
  };

  return (
      <Card className="p-6 max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">{t('categories.create')}</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Nombre */}
              <div>
                  <Label htmlFor="nombre">{t('categories.name')}</Label>
                  <Controller
                      name="nombre"
                      control={control}
                      render={({ field }) => <Input {...field} placeholder={t('categories.placeholders.name')} />}
                  />
                  {errors.nombre && <p className="text-sm text-red-500">{errors.nombre.message}</p>}
              </div>

              {/* Descripción */}
              <div>
                  <Label htmlFor="descripcion">{t('categories.description')}</Label>
                  <Controller
                      name="descripcion"
                      control={control}
                      render={({ field }) => <Textarea {...field} placeholder={t('categories.placeholders.description')} />}
                  />
                  {errors.descripcion && <p className="text-sm text-red-500">{errors.descripcion.message}</p>}
              </div>

              {/* SLA */}
              <div>
                  <Label>{t('categories.sla')}</Label>
                  <Controller
                      name="id_sla"
                      control={control}
                      render={({ field }) => (
                          <Select onValueChange={field.onChange} value={field.value}>
                              <SelectTrigger className="w-full">
                                  <SelectValue placeholder={t('categories.placeholders.selectSLA')} />
                              </SelectTrigger>
                              <SelectContent>
                                  {dataSLA.map((sla) => (
                                      <SelectItem key={sla.id} value={String(sla.id)}>
                                          {sla.nombre} — ({sla.tiempo_respuesta_minutos}m {t('common.response')} /{" "}
                                          {sla.tiempo_resolucion_minutos}m {t('common.resolution')})
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
                              label={t('categories.tags')}
                              getOptionLabel={(item) => item.nombre}
                              getOptionValue={(item) => item.id}
                              error={errors.etiquetas?.message}
                              placeholder={t('categories.placeholders.selectTags')}
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
                              label={t('categories.specialties')}
                              getOptionLabel={(item) => item.nombre}
                              getOptionValue={(item) => item.id}
                              error={errors.especialidades?.message}
                              placeholder={t('categories.placeholders.selectSpecialties')}
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