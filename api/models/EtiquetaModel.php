<?php
class EtiquetaModel
{
    public $enlace;

    public function __construct()
    {
        $this->enlace = new MySqlConnect();
    }

     /**
     * Listar Etiquetas por Categoria
     * @param $idCategoria
     * @return $vResultado - Lista de objetos
     */
    public function getEtiquetasByCategoria($idCategoria)
    {
        $vSql = "SELECT e.nombre,e.id
        FROM etiqueta e,categoria_etiqueta ce 
        where ce.id_etiqueta=e.id and ce.id_categoria=$idCategoria";

        $vresultado = $this->enlace->ExecuteSQL($vSql);

        return $vresultado;
    }

    public function getAll(){

        $vSql = "SELECT *
        FROM etiqueta 
        ";

        $vresultado = $this->enlace->ExecuteSQL($vSql);

        return $vresultado;

    }





}