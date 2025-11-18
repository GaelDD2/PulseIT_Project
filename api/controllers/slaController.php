<?php
class sla
{

    //GET Obtener sla
    // localhost:81/PulseIT/api/sla
    public function index()
    {
        try {
            $response = new Response();
            //Instancia del modelo
            $model = new SlaModel;
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