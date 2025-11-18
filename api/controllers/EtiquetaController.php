<?php
class etiqueta
{

    //GET Obtener Etiquetas
    // localhost:81/PulseIT/api/etiqueta
    public function index()
    {
        try {
            $response = new Response();
            //Instancia del modelo
            $etiquetaM = new EtiquetaModel;
            //Acción del modelo a ejecutar
            $result = $etiquetaM->getAll();
            //Dar respuesta
            $response->toJSON($result);
        } catch (Exception $e) {
            $response->toJSON($result);
            handleException($e);
        }
    }


}