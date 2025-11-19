<?php
class EspecialidadModel
{


    public $enlace;

    public function __construct()
    {
        $this->enlace = new MySqlConnect();
    }

    /**
     * Listar Todas las Especialidades 
     * @param 
     * @return $vResultado - Lista de objetos
     */
    public function all()
    {
        $vSql = "SELECT * FROM especialidad;";

        $vresultado = $this->enlace->ExecuteSQL($vSql);

        return $vresultado;
    }

    
     /**
     * Listar Especialidades por tecnico
     * @param $idTecnico
     * @return $vResultado - Lista de objetos
     */
    public function getEspecialidadesByTecnico($idTecnico)
    {
        $vSql = "SELECT e.nombre,e.descripcion,e.id
        FROM especialidad e,tecnico_especialidad te 
        where te.id_especialidad=e.id and te.id_usuario_tecnico=$idTecnico";

        $vresultado = $this->enlace->ExecuteSQL($vSql);

        return $vresultado;
    }


     /**
     * Listar Especialidades por categoria
     * @param $idCategoria
     * @return $vResultado - Lista de objetos
     */
    public function getEspecialidadesByCategoria($idCategoria)
    {
        $vSql = "SELECT e.nombre,e.id
        FROM especialidad e,categoria_especialidad ce 
        where ce.id_especialidad=e.id and ce.id_categoria=$idCategoria";

        $vresultado = $this->enlace->ExecuteSQL($vSql);

        return $vresultado;
    }

   



}