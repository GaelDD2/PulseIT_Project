<?php
class SlaModel
{

    public $enlace;

    public function __construct()
    {
        $this->enlace = new MySqlConnect();
    }


    /**
     * Listar sla por categoria
     * @param $idCategoria
     * @return $vResultado - Lista de objetos
     */
    public function getSLAbyCategoria($idCategoria)
    {
        $vSql = "SELECT s.nombre,s.tiempo_respuesta_minutos,s.tiempo_resolucion_minutos

        FROM sla s, categoria c
        WHERE s.id=c.id_sla AND c.id=$idCategoria";

        $vresultado = $this->enlace->ExecuteSQL($vSql);

        return $vresultado;
    }

    public function getAll(){

        $vSql = "SELECT *
        FROM sla 
        ";

        $vresultado = $this->enlace->ExecuteSQL($vSql);

        return $vresultado;

    }

    



}