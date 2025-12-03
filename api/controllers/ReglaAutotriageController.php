<?php
class regla
{

    //GET Obtener Reglas
    // localhost:81/PulseIT/api/regla
    public function index()
    {
        try {
            $response = new Response();
            //Instancia del modelo
            $model = new ReglaAutotriageModel;
            //Acción del modelo a ejecutar
            $result = $model->getAll();
            //Dar respuesta
            $response->toJSON($result);
        } catch (Exception $e) {
            $response->toJSON($result);
            handleException($e);
        }
    }


}