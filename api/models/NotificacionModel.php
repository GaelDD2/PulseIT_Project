<?php
class NotificacionModel
{
    public $enlace;

    public function __construct()
    {
        $this->enlace = new MySqlConnect();
    }


    public function getByUsuario($idUsuario){

        $vSql = "SELECT * FROM notificacion WHERE id=$idUsuario;
        ";

        $vresultado = $this->enlace->ExecuteSQL($vSql);

        return $vresultado;

    }





}