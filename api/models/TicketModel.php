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

    public function updateEstado($objeto){
      $idTicket=$objeto->id_ticket;
      $estadoNuevo=$objeto->estado;
      $idUsuario=$objeto->id_usuario;
      $observacion=$objeto->observacion;

      switch ($estadoNuevo) {
        case 1:
          $estadoAnterior=4;

          break;

          case 2:
            $estadoAnterior=1;
  
            break;
            case 5:
              $estadoAnterior=2;
    
              break;

              case 3:
                $estadoAnterior=5;
      
                break;
        
        default:
          
          break;
      }
      

      if ($estadoNuevo==3) {
        $sqlTicket="UPDATE ticket
        SET id_estado_actual = 3,
            fecha_cierre = NOW()
        WHERE id = $idTicket;";

      } else {
        $sqlTicket="UPDATE ticket SET id_estado_actual = $estadoNuevo WHERE id =  $idTicket;";
      }

      $cResults = $this->enlace->executeSQL_DML($sqlTicket);

      
      $sqlNuevoHistorial="INSERT INTO historial_tickets (id_ticket, id_estado_anterior, id_estado_nuevo, id_usuario_cambio, observaciones)
      VALUES ($idTicket, $estadoAnterior, $estadoNuevo, $idUsuario,'$observacion' );";
      
      $idHIstorial = $this->enlace->executeSQL_DML_last($sqlNuevoHistorial);

       // Retornar datos creados
       $sqlGet = "SELECT * from ticket where id=$idTicket";

       $vResultado = $this->enlace->ExecuteSQL($sqlGet)[0];
       $vResultado->id_historial=$idHIstorial;
       return  $vResultado;



  }

  public function asignarTecnicoManual($objeto){
    $idTicket=$objeto->id_ticket;
    $idTecnico=$objeto->id_tecnico;
    $EstadoAnterior=4;
    $idUsuario=$objeto->id_usuario;
    $observacionHistorial=$objeto->observacion_historial;
    $observacionAsignacion=$objeto->observacion_asignacion;

    $sqlTicket="UPDATE ticket SET id_estado_actual = 1 WHERE id = $idTicket;";
    

    $cResults = $this->enlace->executeSQL_DML($sqlTicket);

    
    $sqlNuevoHistorial="INSERT INTO historial_tickets (id_ticket, id_estado_anterior, id_estado_nuevo, id_usuario_cambio,fecha_cambio, observaciones)
    VALUES ($idTicket, $EstadoAnterior, 1, $idUsuario,NOW(),'$observacionHistorial' );";
    
    $idHIstorial = $this->enlace->executeSQL_DML_last($sqlNuevoHistorial);

    $sqlAsignacion="INSERT INTO asignacion (id_ticket, id_usuario_tecnico, id_usuario_asignador, fecha_asignacion, metodo, observaciones, activo)
    VALUES ($idTicket, $idTecnico, $idUsuario, NOW(), 'manual', '$observacionAsignacion', 1);";
    
    $idAsignacion = $this->enlace->executeSQL_DML_last($sqlAsignacion);

     // Retornar datos creados
     $sqlGet = "SELECT * from ticket where id=$idTicket";

     $vResultado = $this->enlace->ExecuteSQL($sqlGet)[0];
     $vResultado->id_historial=$idHIstorial;
     $vResultado->id_asignacion=$idAsignacion;

     return  $vResultado;



}

public function asignacionAutomaticaBatch($objeto)
{
    $idRegla = isset($objeto->id_regla) ? (int)$objeto->id_regla : null;
    $idUsuarioAsignador = isset($objeto->id_usuario_asignador) ? (int)$objeto->id_usuario_asignador : null;
    $limite = isset($objeto->limite) ? (int)$objeto->limite : null;

   
    // obtener la regla
    $sqlRegla = "SELECT * FROM reglas_autotriage WHERE id = $idRegla AND activo = 1";
    $reglaRes = $this->enlace->ExecuteSQL($sqlRegla);
    
    $regla = $reglaRes[0];

    // multiplicadores por nivel de prioridad (1=Normal,2=Alta,3=Urgente)
    $nivelFactor = [
        1 => 1.0,
        2 => 1.5,
        3 => 2.0
    ];
        
    // obtener tickets pendientes (posible limite)
    $sqlTickets = "SELECT * FROM ticket WHERE id_estado_actual = 4 ORDER BY fecha_creacion ASC";
    if ($limite && $limite > 0) {
        $sqlTickets .= " LIMIT $limite";
    }
    $tickets = $this->enlace->ExecuteSQL($sqlTickets);
    if (!is_array($tickets) || count($tickets) == 0) {
        return ['success' => true, 'message' => 'No hay tickets pendientes para asignar', 'asignaciones' => []];
    }

    // obtener técnicos disponibles y sus especialidades
    $sqlTecnicos = "
        SELECT u.id, u.nombre, IFNULL(u.carga_actual,0) AS carga_actual,
               GROUP_CONCAT(te.id_especialidad) AS especialidades
        FROM usuario u
        LEFT JOIN tecnico_especialidad te ON te.id_usuario_tecnico = u.id
        WHERE u.id_rol = 2 AND u.disponibilidad = 'disponible' AND u.activo = 1
        GROUP BY u.id
    ";
    $tecnicos = $this->enlace->ExecuteSQL($sqlTecnicos);
    if (!is_array($tecnicos) || count($tecnicos) == 0) {
        return ['success' => false, 'message' => 'No existen técnicos disponibles', 'asignaciones' => []];
    }

    $resultados = [];

    foreach ($tickets as $t) {
        $ticketId = (int)$t->id;

        // obtener id_categoria y tiempos SLA (si los necesitas)
        $sqlCat = "SELECT id_categoria, fecha_limite_resolucion, prioridad, id_usuario_solicitante FROM ticket WHERE id = $ticketId";
        $catRes = $this->enlace->ExecuteSQL($sqlCat);
        if (!is_array($catRes) || count($catRes) == 0) {
            $resultados[] = ['ticket' => $ticketId, 'assigned' => false, 'reason' => 'Ticket no encontrado'];
            continue;
        }
        $ticketRow = $catRes[0];
        $idCategoria = isset($ticketRow->id_categoria) ? (int)$ticketRow->id_categoria : null;
        $prioridadTicket = isset($ticketRow->prioridad) ? (int)$ticketRow->prioridad : 1;
        $idSolicitante = isset($ticketRow->id_usuario_solicitante) ? (int)$ticketRow->id_usuario_solicitante : 0;

        // tiempo restante SLA (en minutos) - puede ser negativo si vencido
        $sqlRestante = "SELECT TIMESTAMPDIFF(MINUTE, NOW(), fecha_limite_resolucion) AS minutos_restantes FROM ticket WHERE id = $ticketId";
        $restRes = $this->enlace->ExecuteSQL($sqlRestante);
        $tiempoRestante = 0;
        if (is_array($restRes) && count($restRes) > 0) {
            $tiempoRestante = (int)$restRes[0]->minutos_restantes;
        }

        // obtener especialidades de la categoria (si existen)
        $sqlEspCat = "SELECT id_especialidad FROM categoria_especialidad WHERE id_categoria = " . ($idCategoria ? $idCategoria : 0);
        $espCatRes = $this->enlace->ExecuteSQL($sqlEspCat);
        $espCategoria = [];
        if (is_array($espCatRes) && count($espCatRes) > 0) {
            foreach ($espCatRes as $er) {
                $espCategoria[] = (int)$er->id_especialidad;
            }
        }

        // si no hay especialidades asociadas a la categoria, opcionalmente permitir todos los técnicos
        $requiereEspecialidad = true;
        if (count($espCategoria) == 0) {
            // decidir comportamiento: si prefieres asignar sin filtrar por especialidad, cambia a false
            $requiereEspecialidad = false;
        }

        // buscar mejor técnico
        $mejorTecnico = null;
        $mejorDetalle = null;

        foreach ($tecnicos as $tec) {
            $tecId = (int)$tec->id;
            $carga = (int)$tec->carga_actual;
            $tecEspecialidades = $tec->especialidades ? explode(',', $tec->especialidades) : [];

            // si se requiere especialidad, validar que el técnico tenga alguna coincidencia
            if ($requiereEspecialidad) {
                $match = false;
                foreach ($tecEspecialidades as $se) {
                    if (in_array((int)$se, $espCategoria, true)) {
                        $match = true;
                        break;
                    }
                }
                if (!$match) continue; // este técnico no tiene la especialidad requerida
            }

            // calcular componentes
            $factorNivel = isset($nivelFactor[$prioridadTicket]) ? (float)$nivelFactor[$prioridadTicket] : 1.0;
            $basePrioridadScore = $prioridadTicket * 1000.0;
            $componentPrioridad = $basePrioridadScore * $factorNivel * (float)($regla->peso_prioridad ?? 1.0);
            $componentTiempo = (float)$tiempoRestante * (float)($regla->peso_tiempo_restante ?? 1.0);
            $componentCarga = ($carga * 100.0) * (float)($regla->peso_carga ?? 1.0);

            $puntajeFinal = $componentPrioridad - $componentTiempo - $componentCarga;

            // almacenar detalle para justificación
            $detalleTec = (object)[
                'id' => $tecId,
                'nombre' => $tec->nombre,
                'carga' => $carga,
                'componentPrioridad' => $componentPrioridad,
                'componentTiempo' => $componentTiempo,
                'componentCarga' => $componentCarga,
                'puntaje_final' => $puntajeFinal
            ];

            if (!$mejorTecnico || $puntajeFinal > $mejorTecnico->puntaje_final) {
                $mejorTecnico = $detalleTec;
            }
        } // end foreach tecnicos

        if (!$mejorTecnico) {
            $resultados[] = [
                'ticket' => $ticketId,
                'assigned' => false,
                'reason' => 'No hay técnicos compatibles o disponibles'
            ];
            continue;
        }

        // preparar observaciones con justificación
        $observData = [
            'regla_id' => $idRegla,
            'prioridad' => $prioridadTicket,
            'tiempo_restante_min' => $tiempoRestante,
            'componentPrioridad' => $mejorTecnico->componentPrioridad,
            'componentTiempo' => $mejorTecnico->componentTiempo,
            'componentCarga' => $mejorTecnico->componentCarga,
            'puntaje_final' => $mejorTecnico->puntaje_final
        ];
        $observ= "Se asigna automaticamente el ticket al técnico"." ".$mejorTecnico->nombre." "."ya que obtuvo el mejor puntaje";

        // -------------- Aplicar cambios en BD --------------
        // Insert asignacion
        $idUsuarioAsignadorSQL = $idUsuarioAsignador ? $idUsuarioAsignador : "NULL";
        $puntajeEsc = (float)$mejorTecnico->puntaje_final;
        $sqlAsig = "
            INSERT INTO asignacion (
                id_ticket, id_usuario_tecnico, id_usuario_asignador,
                id_regla_autotriage, metodo, puntuacion, observaciones, activo
            ) VALUES (
                $ticketId,
                {$mejorTecnico->id},
                " . ($idUsuarioAsignador ? $idUsuarioAsignador : "NULL") . ",
                $idRegla,
                'automatico',
                $puntajeEsc,
                '$observ',
                1
            )
        ";
        $idAsignacion = $this->enlace->executeSQL_DML_last($sqlAsig);

        // Insert historial
        $sqlHist = "
            INSERT INTO historial_tickets (
                id_ticket, id_estado_anterior, id_estado_nuevo,
                id_usuario_cambio, fecha_cambio, observaciones, id_asignacion, es_sistema
            ) VALUES (
                $ticketId, 4, 1,
                " . ($idUsuarioAsignador ? $idUsuarioAsignador : 0) . ",
                NOW(),
                '$observ',
                $idAsignacion,
                1
            )
        ";
        $idHist = $this->enlace->executeSQL_DML_last($sqlHist);

        // Update estado del ticket a Asignado (1)
        $this->enlace->executeSQL_DML("UPDATE ticket SET id_estado_actual = 1 WHERE id = $ticketId");

        // Update carga del técnico +1
        $this->enlace->executeSQL_DML("UPDATE usuario SET carga_actual = IFNULL(carga_actual,0) + 1 WHERE id = {$mejorTecnico->id}");

        // Notificación técnico
        $msgTec =
            "Se te ha asignado el ticket #$ticketId".'puntaje'.$puntajeEsc;
           
        
        $this->enlace->executeSQL_DML("
            INSERT INTO notificacion (id_usuario, tipo_id, id_usuario_origen, contenido)
            VALUES ({$mejorTecnico->id}, 3, " . ($idUsuarioAsignador ? $idUsuarioAsignador : "NULL") . ", '$msgTec')
        ");

        // Notificación cliente
        $msgCli = 
            "Tu ticket #$ticketId ha sido asignado al técnico".$mejorTecnico->nombre
        ;
        $this->enlace->executeSQL_DML("
            INSERT INTO notificacion (id_usuario, tipo_id, id_usuario_origen, contenido)
            VALUES ({$idSolicitante}, 2, " . ($idUsuarioAsignador ? $idUsuarioAsignador : "NULL") . ", '$msgCli')
        ");

        // resultado del ticket
        $resultados[] = [
            'ticket' => $ticketId,
            'tecnico_id' => $mejorTecnico->id,
            'tecnico_nombre' => $mejorTecnico->nombre,
            'puntaje_final' => $mejorTecnico->puntaje_final,
            'components' => [
                'prioridad' => $mejorTecnico->componentPrioridad,
                'tiempo' => $mejorTecnico->componentTiempo,
                'carga' => $mejorTecnico->componentCarga
            ],
            'assigned' => true,
            'id_asignacion' => $idAsignacion,
            'id_historial' => $idHist
        ];
    } // end foreach tickets

    return ['success' => true, 'assigned' => count($resultados), 'asignaciones' => $resultados];
}





    




}