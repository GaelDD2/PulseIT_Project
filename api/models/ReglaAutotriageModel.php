<?php
class ReglaAutotriageModel
{
    public $enlace;

    public function __construct()
    {
        $this->enlace = new MySqlConnect();
    }

     

    public function getAll(){

        $vSql = "SELECT *
        FROM reglas_autotriage 
        ";

        $vresultado = $this->enlace->ExecuteSQL($vSql);

        return $vresultado;

    }





}