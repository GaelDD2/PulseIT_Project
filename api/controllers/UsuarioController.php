<?php
class usuario
{
    //GET Obtener Usuarios
    // localhost:81/PulseIT/api/usuario/login/carlos@correo.com/hash123
    public function login($correoUsuario,$contrasena)
    {
        try {
            $response = new Response();
            //Instancia del modelo
            $usuarioM = new UsuarioModel;
            //Acción del modelo a ejecutar
            $result = $usuarioM->login($correoUsuario,$contrasena);
            //Dar respuesta
            $response->toJSON($result);
        } catch (Exception $e) {
            $response->toJSON($result);
            handleException($e);
        }
    }

}