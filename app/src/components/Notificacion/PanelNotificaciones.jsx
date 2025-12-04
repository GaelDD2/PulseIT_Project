import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import NotificacionService from "@/services/NotificacionService";
import { useTranslation } from 'react-i18next'; 
import { Button } from "@/components/ui/button";
import { CheckCheck } from "lucide-react";
import { cn } from "@/lib/utils"; // Si usas shadcn

export function NotificationsPanel() {
  const { t } = useTranslation();
  const [notificaciones, setNotificaciones] = useState([]);
  const [isLoading, setIsLoading] = useState({});
  const idUsuario = localStorage.getItem("idUsuario");

  const handleMarcarLeida = async (notificacionId) => {
    try {
      // Mostrar loading en este botón específico
      setIsLoading(prev => ({ ...prev, [notificacionId]: true }));
      
      const datosNotificacion = {
        id: notificacionId,
        id_usuario: parseInt(idUsuario)
      };
      
      const response = await NotificacionService.marcarAtendida(datosNotificacion);
      
      if (response.data.success) {
        // Opción A: Actualizar inmediatamente el estado local
        setNotificaciones(prev => 
          prev.map(n => n.id === notificacionId 
            ? { ...n, atendida: 1, atendida_fecha: new Date().toISOString() }
            : n
          )
        );
        
        
      }
      
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
    } finally {
      setIsLoading(prev => ({ ...prev, [notificacionId]: false }));
    }
  };

  // Cargar todas las notificaciones (no solo las no atendidas)
  useEffect(() => {
    const fetchNotificaciones = async () => {
      try {
        const res = await NotificacionService.getByUsuario(idUsuario);
        // Asegurar que todas las notificaciones vengan, ordenadas por fecha
        const notificacionesOrdenadas = (res.data.data || [])
          .sort((a, b) => new Date(b.fecha_creacion) - new Date(a.fecha_creacion));
        setNotificaciones(notificacionesOrdenadas);
      } catch (err) {
        console.error(err);
      }
    };

    fetchNotificaciones();
    
    // Opcional: Refrescar cada 30 segundos
    const interval = setInterval(fetchNotificaciones, 30000);
    return () => clearInterval(interval);
  }, [idUsuario]);

  return (
    <Card className="p-4 w-full max-w-md shadow-lg border mx-auto">
      <h2 className="font-bold text-lg mb-4 flex justify-between items-center">
        <span>{t('notifications.title')}</span>
        
      </h2>

      {notificaciones.length === 0 && (
        <p className="text-muted-foreground text-sm text-center py-8">
          {t('notifications.empty')}
        </p>
      )}

      <div className="flex flex-col gap-3 max-h-[500px] overflow-y-auto">
        {notificaciones.map((n) => {
          const isAtendida = n.atendida === 1;
          const isCargando = isLoading[n.id];
          
          return (
            <div
              key={n.id}
              className={cn(
                "p-3 rounded-lg border shadow-sm transition-all duration-300",
                "hover:bg-muted/50",
                isAtendida 
                  ? "bg-gray-50 border-gray-200 opacity-70" 
                  : "bg-white border-blue-200"
              )}
              style={{
                animation: isAtendida ? 'fadeOutOpacity 0.3s ease-out' : 'none'
              }}
            >
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <p className={cn(
                    "text-sm font-medium",
                    isAtendida ? "text-gray-600" : "text-gray-900"
                  )}>
                    {n.contenido}
                  </p>
                  <p className={cn(
                    "text-xs mt-1",
                    isAtendida ? "text-gray-400" : "text-muted-foreground"
                  )}>
                    {new Date(n.fecha_creacion).toLocaleString()}
                    {isAtendida && " • Atendida"}
                  </p>
                </div>
                
                <div className="flex items-center gap-2 ml-4">
                  {!isAtendida && (
                    <Badge 
                      variant="default" 
                      className="bg-blue-500 hover:bg-blue-600 text-white text-xs"
                    >
                      {t('notifications.new')}
                    </Badge>
                  )}
                  
                  <Button
                    variant={isAtendida ? "ghost" : "default"}
                    size="sm"
                    className={cn(
                      "h-8 w-8 p-0 transition-all",
                      isAtendida 
                        ? "text-gray-400 cursor-default" 
                        : "bg-primary text-white hover:bg-blue-700"
                    )}
                    onClick={() => !isAtendida && handleMarcarLeida(n.id)}
                    disabled={isAtendida || isCargando}
                    title={isAtendida ? "Ya atendida" : "Marcar como leída"}
                  >
                    {isCargando ? (
                      <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <CheckCheck className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

