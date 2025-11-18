<?php
class TecnicoModel
{

    public $enlace;

    public function __construct()
    {
        $this->enlace = new MySqlConnect();
    }


    /**
     * Listar Tecnicos
     * @param 
     * @return $vResultado - Lista de objetos
     */
    public function allTecnicos()
    {
        //Consulta SQL
        $vSQL = "SELECT 
	    id,
        nombre,
        correo
        FROM usuario where id_rol=2";

        //Ejecutar la consulta
        $vResultado = $this->enlace->ExecuteSQL($vSQL);

        //Retornar la respuesta
        return $vResultado;
    }


    /**
     * Listar Detalles del tecnico seleccionado
     * @param $idTecnico
     * @return $vResultado - Lista del detalle
     */
    public function Detalletecnico($idTecnico)
    {
        $especialidadM = new EspecialidadModel();

        $vSql = "SELECT  nombre ,id, disponibilidad, carga_actual,correo
        FROM usuario
        WHERE id = $idTecnico;";

        //Ejecutar la consulta
        $vResultado = $this->enlace->ExecuteSQL($vSql);
        if (!empty($vResultado)) {
            $vResultado = $vResultado[0];
            //Especialidades
            $vResultado->especialidades = $especialidadM->getEspecialidadesByTecnico($idTecnico);
        }
        return $vResultado;
    }

    /**
     * Obtener asignaciones del tecnico 
     * @param $idTecnico
     * @return $vResultado - Lista de asignaciones
     */
    public function Asignaciones($idRol, $idTecnico)
    {
        switch ($idRol) {
            case 2:
                $vSql = "SELECT 
                a.id AS id_asignacion,
                t.id AS id_ticket,
                t.titulo,
                c.nombre AS categoria,
                e.nombre AS estado_actual,
                t.fecha_creacion,
                t.fecha_limite_resolucion,
                TIMESTAMPDIFF(HOUR, NOW(), t.fecha_limite_resolucion) AS horas_restantes,
                a.fecha_asignacion
              FROM asignacion a
              JOIN ticket t ON a.id_ticket = t.id
              JOIN categoria c ON t.id_categoria = c.id
              JOIN estados_ticket e ON t.id_estado_actual = e.id
              WHERE a.id_usuario_tecnico = $idTecnico
              ORDER BY a.fecha_asignacion DESC;";

                //Ejecutar la consulta
                $vResultado = $this->enlace->ExecuteSQL($vSql);
                break;

            case 3:
                $vSql = "SELECT 
                a.id AS id_asignacion,
                t.id AS id_ticket,
                t.titulo,
                c.nombre AS categoria,
                e.nombre AS estado_actual,
                t.fecha_creacion,
                t.fecha_limite_resolucion,
                TIMESTAMPDIFF(HOUR, NOW(), t.fecha_limite_resolucion) AS horas_restantes,
                a.fecha_asignacion
              FROM ticket t
              LEFT JOIN asignacion a ON a.id_ticket = t.id
              JOIN categoria c ON t.id_categoria = c.id
              JOIN estados_ticket e ON t.id_estado_actual = e.id;";

                //Ejecutar la consulta
                $vResultado = $this->enlace->ExecuteSQL($vSql);
                break;

            default:
                # code...
                break;
        }

        return $vResultado;
    }

    public function createTecnico($objeto)
    {
        $idRolTecnico = 2; // ID del rol de técnico

        // Encriptar contraseña 
        $nombre = $objeto->nombre;
        $correo = $objeto->correo;
        $contrasena = password_hash($objeto->contrasena, PASSWORD_DEFAULT);
        $disponibilidad = $objeto->disponibilidad;

        // Insertar en usuario
        $sql = "INSERT INTO usuario 
            (correo, contrasena_hash, nombre, id_rol, ultimo_ingreso, activo, disponibilidad, carga_actual)
            VALUES 
            ('$correo', '$contrasena', '$nombre', $idRolTecnico, NOW(), 1, '$disponibilidad', 0)";
        $idUsuario = $this->enlace->executeSQL_DML_last($sql);

        // Relacionar especialidades
        foreach ($objeto->especialidades as $idEspecialidad) {
            $sqlEsp = "INSERT INTO tecnico_especialidad (id_usuario_tecnico, id_especialidad)
                   VALUES ($idUsuario, $idEspecialidad)";
            $this->enlace->executeSQL_DML($sqlEsp);
        }

        // Retornar datos creados
        $sqlGet = "SELECT id, nombre, correo, disponibilidad, carga_actual 
               FROM usuario 
               WHERE id = $idUsuario";
        return $this->enlace->ExecuteSQL($sqlGet)[0];
    }
    /**
     * Actualizar tecnico
     * @param $objeto tecnico a actualizar
     * @return $this->get($idTecnico) - Objeto Tecnico
     */
    //
    public function update($objeto)
    {
        $idRolTecnico = 2; // ID del rol de técnico

        // Encriptar contraseña 
        $nombre = $objeto->nombre;
        $correo = $objeto->correo;
        $contrasena = password_hash($objeto->contrasena, PASSWORD_DEFAULT);
        $disponibilidad = $objeto->disponibilidad;
        $idUsuario=$objeto->id;
        
        //Consulta sql
        $sql = "UPDATE usuario SET 
        correo = '$correo',
        contrasena_hash = '$contrasena', 
        nombre = '$nombre', 
        id_rol = $idRolTecnico, 
        disponibilidad = '$disponibilidad'
        WHERE id = $idUsuario";

        //Ejecutar la consulta
        $cResults = $this->enlace->executeSQL_DML($sql);
        //--- Especialidades ---


        //Eliminar especialidades asociadas al tecnico
        $sql = "Delete from tecnico_especialidad where id_usuario_tecnico=$objeto->id";
        $vResultadoD = $this->enlace->executeSQL_DML($sql);
        //Insertar esepecialidades
        foreach ($objeto->especialidades as $idEspecialidad) {
            $sqlEsp = "INSERT INTO tecnico_especialidad (id_usuario_tecnico, id_especialidad)
                   VALUES ($idUsuario, $idEspecialidad)";
            $this->enlace->executeSQL_DML($sqlEsp);
        }


        // Retornar datos creados
        $sqlGet = "SELECT id, nombre, correo, disponibilidad
       FROM usuario 
       WHERE id = $idUsuario";
       return $this->enlace->ExecuteSQL($sqlGet)[0];
    }

    public function getTecnicoById($idUsuario){
        //Consulta SQL
        $vSQL = "SELECT * FROM usuario where id=$idUsuario";

        //Ejecutar la consulta
        $vResultado = $this->enlace->ExecuteSQL($vSQL);

        //Retornar la respuesta
        return $vResultado;
    }
}
