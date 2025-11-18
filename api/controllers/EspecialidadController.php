<?php
class especialidad
{

    //GET Obtener Especialidades
    // localhost:81/PulseIT/api/especialidad
    public function index()
    {
        try {
            $response = new Response();
            //Instancia del modelo
            $EspecialidadM = new EspecialidadModel;
            //Acción del modelo a ejecutar
            $result = $EspecialidadM->all();
            //Dar respuesta
            $response->toJSON($result);
        } catch (Exception $e) {
            $response->toJSON($result);
            handleException($e);
        }
    }


}