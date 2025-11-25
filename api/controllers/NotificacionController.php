<?php
class notificacion
{


    //GET Obtener notificaciones por usuario 
    // localhost:81/PulseIT/api/notificacion/getByUsuario/1
    public function getByUsuario($idUsuario)
    {
        try {
            $response = new Response();
            //Instancia del modelo
            $model = new NotificacionModel;
            //Acción del modelo a ejecutar
            $result = $model->getByUsuario($idUsuario);
            //Dar respuesta
            $response->toJSON($result);
        } catch (Exception $e) {
            $response->toJSON($result);
            handleException($e);
        }
    }

  
}