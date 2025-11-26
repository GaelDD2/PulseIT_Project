<?php
class NotificacionModel
{
    public $enlace;

    public function __construct()
    {
        $this->enlace = new MySqlConnect();
    }


    public function getByUsuario($idUsuario){

        $vSql = "SELECT * FROM notificacion WHERE id_usuario=$idUsuario AND atendida=0;
        ";

        $vresultado = $this->enlace->ExecuteSQL($vSql);

        return $vresultado;

    }


    public function getNumeroDeNotificacionesByUsuario($idUsuario){

        $vSql = "SELECT * FROM notificacion WHERE id_usuario=$idUsuario AND atendida=0;
        ";

        $vresultado = $this->enlace->executeSQL_DML($vSql);

        return $vresultado;

    }

    public function createNotificacion($objeto)
    {
        $idUsuarioDestinatario= $objeto->id_usuario;
        $tipoId=$objeto->tipo_id;
        $idUsuarioOrigen=$objeto->id_usuario_origen;
        $contenido=$objeto->contenido;
        $atendida=$objeto->atendida;
        

        $sql = "INSERT INTO notificacion 
        (id_usuario, tipo_id, id_usuario_origen, contenido, atendida, fecha_creacion)
        VALUES 
        ($idUsuarioDestinatario, $tipoId, $idUsuarioOrigen, '$contenido',$atendida, NOW())";
        $idNotificacion = $this->enlace->executeSQL_DML_last($sql);


        $sqlGet = "SELECT * FROM notificacion WHERE id=$idNotificacion";
        return $this->enlace->ExecuteSQL($sqlGet)[0];

    }





}