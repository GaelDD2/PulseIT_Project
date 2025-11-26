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

     //GET Obtener notificaciones por usuario 
    // localhost:81/PulseIT/api/notificacion/getCantNoti/1
    public function getCantNoti($idUsuario)
    {
        try {
            $response = new Response();
            //Instancia del modelo
            $model = new NotificacionModel;
            //Acción del modelo a ejecutar
            $result = $model->getNumeroDeNotificacionesByUsuario($idUsuario);
            //Dar respuesta
            $response->toJSON($result);
        } catch (Exception $e) {
            $response->toJSON($result);
            handleException($e);
        }
    }

    //POST crear notificaciones
    // localhost:81/PulseIT/api/notificacion/createNoti
    public function createNoti()
    {
        try {
            $request = new Request();
            $response = new Response();

            $inputJSON = $request->getJSON();
            $model = new NotificacionModel();

            $result = $model->createNotificacion($inputJSON);

            $response->toJSON($result);
        } catch (Exception $e) {
            handleException($e);
        }
    }

  
}