<?php
class TicketModel
{

    public $enlace;

    public function __construct()
    {
        $this->enlace = new MySqlConnect();
    }

    /**
     * Listar tickes segun rol y cliente
     * @param $idRol
     * @return $vResultado - Lista de objetos
     */
    public function ListarTickets($idRol,$idUsuario)
    {
        switch ($idRol) {
            //case CLIENTE
            case 1:
                $vSql = "SELECT t.id, t.titulo, t.prioridad, e.nombre AS estado
                FROM ticket t
                JOIN estados_ticket e ON t.id_estado_actual = e.id
                WHERE t.id_usuario_solicitante = $idUsuario
                ORDER BY t.fecha_creacion DESC";
              $vresultado = $this->enlace->ExecuteSQL($vSql);

              return $vresultado;

              break;
            //Case TECNICO
            case 2:
                $vSql = "SELECT t.id, t.titulo, t.prioridad, e.nombre AS estado
                FROM ticket t
                JOIN estados_ticket e ON t.id_estado_actual = e.id
                JOIN asignacion a ON a.id_ticket = t.id
                WHERE a.id_usuario_tecnico = $idUsuario
                  AND a.activo = 1
                ORDER BY t.fecha_creacion DESC";
              $vresultado = $this->enlace->ExecuteSQL($vSql);

              return $vresultado;

              break; 

            //Case ADMINISTRADOR
            case 3:
                $vSql = "SELECT t.id, t.titulo, t.prioridad, e.nombre AS estado
                FROM ticket t
                JOIN estados_ticket e ON t.id_estado_actual = e.id
                ORDER BY t.fecha_creacion DESC;
              ";

              $vresultado= $this->enlace->ExecuteSQL($vSql);

              return $vresultado;

              break;    
 

                
        }

    }

  /**
 * Listar detalles de un ticket según su id
 * @param $idTicket
 * @return $vResultado - Lista de objetos
 */
public function DetalleTicket($idTicket) {

    // Consulta principal del ticket
    $vSqlTicket = "
        SELECT 
            t.id, 
            t.titulo, 
            t.descripcion, 
            t.fecha_creacion,
            e.nombre AS estado, 
            t.prioridad, 
            u.nombre AS solicitante, 
            c.nombre AS categoria,
  
            -- Calcular SLA directamente según el SLA asociado a la categoría
            DATE_ADD(t.fecha_creacion, INTERVAL s.tiempo_respuesta_minutos MINUTE) AS sla_respuesta_calculado,
            DATE_ADD(t.fecha_creacion, INTERVAL s.tiempo_resolucion_minutos MINUTE) AS sla_resolucion_calculado,
  
            --  Días de resolución
            DATEDIFF(t.fecha_cierre, t.fecha_creacion) AS dias_resolucion,
  
            --  Cumplimiento de respuesta 
            CASE 
              WHEN t.fecha_cierre IS NULL THEN 'Pendiente'
              WHEN t.fecha_creacion <= DATE_ADD(t.fecha_creacion, INTERVAL s.tiempo_respuesta_minutos MINUTE) 
              THEN 'Cumplido'
              ELSE 'No cumplido'
            END AS cumplimiento_respuesta,
  
            -- Cumplimiento de resolución 
            CASE 
              WHEN t.fecha_cierre IS NULL THEN 'Pendiente'
              WHEN t.fecha_cierre <= DATE_ADD(t.fecha_creacion, INTERVAL s.tiempo_resolucion_minutos MINUTE)
              THEN 'Cumplido'
              ELSE 'No cumplido'
            END AS cumplimiento_resolucion
  
        FROM ticket t
        JOIN estados_ticket e ON t.id_estado_actual = e.id
        JOIN usuario u ON t.id_usuario_solicitante = u.id
        JOIN categoria c ON t.id_categoria = c.id
        JOIN sla s ON c.id_sla = s.id 
        WHERE t.id = $idTicket
    ";
  
    // Ejecutar la consulta
    $vResultado = $this->enlace->ExecuteSQL($vSqlTicket);
  
    if (!empty($vResultado)) {
        $vResultado = $vResultado[0];
  
        // 🔹 Historial
        $vSqlHistorial = "
            SELECT 
                h.id AS id_historial,
                ea.nombre AS estado_anterior,
                en.nombre AS estado_nuevo,
                h.observaciones,
                h.fecha_cambio,
                u.nombre AS usuario_cambio,
                GROUP_CONCAT(i.nombre_archivo SEPARATOR ',') AS evidencias
            FROM historial_tickets h
            LEFT JOIN estados_ticket ea ON h.id_estado_anterior = ea.id
            LEFT JOIN estados_ticket en ON h.id_estado_nuevo = en.id
            LEFT JOIN usuario u ON h.id_usuario_cambio = u.id
            LEFT JOIN imagenes_historial_tickets i ON i.id_historial = h.id
            WHERE h.id_ticket = $idTicket
            GROUP BY h.id
            ORDER BY h.fecha_cambio ASC";
  
        $historial = $this->enlace->ExecuteSQL($vSqlHistorial);
  
        if (is_array($historial) || is_object($historial)) {
            foreach ($historial as &$h) {
                $h->evidencias = !empty($h->evidencias)
                    ? explode(',', $h->evidencias)
                    : [];
            }
        } else {
            $historial = [];
        }
  
        $vResultado->historial = $historial;
  
        // 🔹 Valoración
        $vSqlValoracion = "
            SELECT 
                v.puntuacion, v.comentario, v.fecha_creacion, u.nombre AS usuario_valorador
            FROM valoracion v
            JOIN usuario u ON v.id_usuario = u.id
            WHERE v.id_ticket = $idTicket";
  
        $vResultado->valoracion = $this->enlace->ExecuteSQL($vSqlValoracion);
    }
  
    return $vResultado;
  }

    public function createTicket($objeto){

    $titulo= $objeto->titulo;
    $descripcion= $objeto->descripcion;
    $prioridad= $objeto->prioridad;
    $usuario= $objeto->id_usuario_solicitante;
    $estado= 4; //PENDIENTE
    $etiqueta=$objeto->id_etiqueta;

    //Obtener categoria por etiqueta
    $sqlCategoria="SELECT id_categoria FROM categoria_etiqueta WHERE id_etiqueta=$etiqueta";

    $ResultadoCategoria= $this->enlace->ExecuteSQL($sqlCategoria);
    if (!empty($ResultadoCategoria)){
      $idCategoria = (int)$ResultadoCategoria[0]->id_categoria;
      //Obtener sla para los tiempos
      $sqlSla = "SELECT id_sla FROM categoria WHERE id = $idCategoria";
      $resultadoSla = $this->enlace->ExecuteSQL($sqlSla);
      $idSla = (int)$resultadoSla[0]->id_sla;

      $sqlTiempoRespuesta="SELECT tiempo_respuesta_minutos FROM sla WHERE id=$idSla";
      $resultadoRespuesta= $this->enlace->ExecuteSQL($sqlTiempoRespuesta);
      $Tiempo_respuesta_minutos=(int)$resultadoRespuesta[0]->tiempo_respuesta_minutos;

      $sqlTiempoResolucion="SELECT tiempo_resolucion_minutos FROM sla WHERE id=$idSla";
      $resultadoResolucion= $this->enlace->ExecuteSQL($sqlTiempoResolucion);
      $tiempo_resolucion_minutos=(int)$resultadoResolucion[0]->tiempo_resolucion_minutos;
      
      $fecha_limite_respuesta=(new DateTime())->modify("+$Tiempo_respuesta_minutos minutes")->format('Y-m-d H:i:s');
      $fecha_limite_resolucion=(new DateTime())->modify("+$tiempo_resolucion_minutos minutes")->format('Y-m-d H:i:s');
      
      $sqlTicket="INSERT into ticket (titulo,descripcion,prioridad,id_categoria,id_usuario_solicitante,id_estado_actual,fecha_creacion,fecha_limite_respuesta,fecha_limite_resolucion)
      VALUES ('$titulo','$descripcion',$prioridad,$idCategoria,$usuario,$estado,now(),'$fecha_limite_respuesta','$fecha_limite_resolucion')";
      
      $idTicket = $this->enlace->executeSQL_DML_last($sqlTicket); 


      $sqlHistorialInicial="INSERT INTO historial_tickets (id_ticket, id_estado_anterior, id_estado_nuevo, id_usuario_cambio, observaciones)
      VALUES ($idTicket, NULL, $estado , $usuario, 'Cliente creó el ticket con estado Pendiente.');";
      
      $idHIstorial = $this->enlace->executeSQL_DML_last($sqlHistorialInicial);


      // Retornar datos creados
      $sqlGet = "SELECT * from ticket where id=$idTicket";

      $vResultado = $this->enlace->ExecuteSQL($sqlGet)[0];
      $vResultado->id_historial=$idHIstorial;
      return  $vResultado;



    } else{
      echo'No hay categoria';
    }




    }
    




}