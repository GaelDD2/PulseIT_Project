import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import NotificacionService from "@/services/NotificacionService";

export function NotificationsPanel() {
  const [notificaciones, setNotificaciones] = useState([]);
  const idUsuario = localStorage.getItem("idUsuario");

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await NotificacionService.getByUsuario(idUsuario);
        setNotificaciones(res.data.data || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetch();
  }, [idUsuario]);

  return (
    <Card className="p-4 w-full max-w-md shadow-lg border mx-auto">
      <h2 className="font-bold text-lg mb-4">Notificaciones</h2>

      {notificaciones.length === 0 && (
        <p className="text-muted-foreground text-sm">No tienes notificaciones.</p>
      )}

      <div className="flex flex-col gap-3">
        {notificaciones.map((n) => (
          <div
            key={n.id}
            className="p-3 rounded-lg border bg-white shadow-sm hover:bg-muted transition-colors"
          >
            <div className="flex justify-between">
              <p className="text-sm font-medium">{n.contenido}</p>
              {!n.leido && <Badge variant="default">Nuevo</Badge>}
            </div>

            <p className="text-xs text-muted-foreground mt-1">
              {new Date(n.fecha_creacion).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}
