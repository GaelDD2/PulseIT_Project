<?php
class CategoriaModel
{


    public $enlace;

    public function __construct()
    {
        $this->enlace = new MySqlConnect();
    }

    /**
     * Listar Categorias
     * @param 
     * @return $vResultado - Lista de objetos
     */
    public function allCategorias()
    {
        //Consulta SQL
        $vSQL = "SELECT id, nombre, descripcion FROM categoria;
        ";

        //Ejecutar la consulta
        $vResultado = $this->enlace->ExecuteSQL($vSQL);

        //Retornar la respuesta
        return $vResultado;
    }


    /**
     * Listar Detalles de la categoria seleccionada
     * @param $idCategoria
     * @return $vResultado - Lista de objetos
     */
    public function DetalleCategoria($idCategoria)
    {
        $etiquetaM = new EtiquetaModel();
        $especialidadM= new EspecialidadModel();
        $slaM= new SlaModel();

        $vSql = "SELECT nombre,id, id_sla FROM categoria WHERE id=$idCategoria;";

        //Ejecutar la consulta
        $vResultado = $this->enlace->ExecuteSQL($vSql);
        if (!empty($vResultado)) {
            $vResultado = $vResultado[0];
            //Etiquetas
            $vResultado->etiquetas = $etiquetaM->getEtiquetasByCategoria($idCategoria);
            //Especialidades
            $vResultado->especialidades = $especialidadM->getEspecialidadesByCategoria($idCategoria);
            //SLA
            $vResultado->sla = $slaM->getSLAbyCategoria($idCategoria);


        }
        return $vResultado;
    }

    /**
     * Crear Categoria
     * @param $objeto categoria a insertar
     */
    //
   
    public function createCategoria($objeto) {
        try {
            // Verificar si se debe crear un nuevo SLA
            if (empty($objeto->id_sla) && !empty($objeto->nuevoSla)) {
                $nombreSLA = $objeto->nuevoSla->nombre;
                $tiempoResp = $objeto->nuevoSla->tiempo_respuesta_minutos;
                $tiempoRes = $objeto->nuevoSla->tiempo_resolucion_minutos;
    
                $sqlSLA = "INSERT INTO sla (nombre, tiempo_respuesta_minutos, tiempo_resolucion_minutos)
                           VALUES ('$nombreSLA', $tiempoResp, $tiempoRes)";
                $idSLA = $this->enlace->executeSQL_DML_last($sqlSLA);
            } 
            //  Si selecciona un SLA existente
            else {
                $idSLA = $objeto->id_sla;
            }
    
            // Insertar la categoría
            $sqlCat = "INSERT INTO categoria (nombre, descripcion, id_sla)
                       VALUES ('$objeto->nombre', '$objeto->descripcion', $idSLA)";
            $idCategoria = $this->enlace->executeSQL_DML_last($sqlCat);
    
            //  Insertar etiquetas asociadas
            if (!empty($objeto->etiquetas) && is_array($objeto->etiquetas)) {
                foreach ($objeto->etiquetas as $idEtiqueta) {
                    $sqlTag = "INSERT INTO categoria_etiqueta (id_categoria, id_etiqueta)
                               VALUES ($idCategoria, $idEtiqueta)";
                    $this->enlace->executeSQL_DML($sqlTag);
                }
            }
    
            // Insertar especialidades asociadas
            if (!empty($objeto->especialidades) && is_array($objeto->especialidades)) {
                foreach ($objeto->especialidades as $idEsp) {
                    $sqlEsp = "INSERT INTO categoria_especialidad (id_categoria, id_especialidad)
                               VALUES ($idCategoria, $idEsp)";
                    $this->enlace->executeSQL_DML($sqlEsp);
                }
            }
    
            // Retornar la categoría creada con su SLA
            $sqlGet = "SELECT c.id, c.nombre, c.descripcion, s.nombre AS sla, 
                              s.tiempo_respuesta_minutos, s.tiempo_resolucion_minutos
                       FROM categoria c
                       JOIN sla s ON c.id_sla = s.id
                       WHERE c.id = $idCategoria";
    
            return $this->enlace->ExecuteSQL($sqlGet);
    
        } catch (Exception $e) {
            throw new Exception("Error al crear la categoría: " . $e->getMessage());
        }
    }


    public function update($objeto) {
        try {
            
            $nombre = $objeto->nombre;
            $descripcion = $objeto->descripcion;
            $id_sla = $objeto->id_sla;
            $id_categoria=$objeto->id_categoria;


            // update la categoría
            $sqlCat = "UPDATE categoria SET 
            nombre='$nombre',
            descripcion='$descripcion',
            id_sla=$id_sla
            WHERE id= $id_categoria";
            $cResults = $this->enlace->executeSQL_DML($sqlCat);


            //Eliminar etiquetas asociadas a la categoria
            $sql_D_etiquetas = "DELETE from categoria_etiqueta where id_categoria=$id_categoria";
            $vResultadoD = $this->enlace->executeSQL_DML($sql_D_etiquetas);
            //Insertar etiquetas
            if (!empty($objeto->etiquetas) && is_array($objeto->etiquetas)) {
                foreach ($objeto->etiquetas as $idEtiqueta) {
                    $sqlTag = "INSERT INTO categoria_etiqueta (id_categoria, id_etiqueta)
                               VALUES ($id_categoria, $idEtiqueta)";
                    $this->enlace->executeSQL_DML($sqlTag);
                }
            }
    

            //Eliminar especialidades asociadas a la categoria 
            $sql = "DELETE from categoria_especialidad where id_categoria=$id_categoria ";
            $vResultadoD = $this->enlace->executeSQL_DML($sql);
            // Insertar especialidades asociadas
            if (!empty($objeto->especialidades) && is_array($objeto->especialidades)) {
                foreach ($objeto->especialidades as $idEsp) {
                    $sqlEsp = "INSERT INTO categoria_especialidad (id_categoria, id_especialidad)
                               VALUES ($id_categoria, $idEsp)";
                    $this->enlace->executeSQL_DML($sqlEsp);
                }
            }
    
            // Retornar la categoría creada con su SLA
            $sqlGet = "SELECT c.id, c.nombre, c.descripcion, s.nombre AS sla, 
                              s.tiempo_respuesta_minutos, s.tiempo_resolucion_minutos
                       FROM categoria c
                       JOIN sla s ON c.id_sla = s.id
                       WHERE c.id = $id_categoria";
    
            return $this->enlace->ExecuteSQL($sqlGet);
    
        } catch (Exception $e) {
            throw new Exception("Error al crear la categoría: " . $e->getMessage());
        }
    }
    
}


    
    









