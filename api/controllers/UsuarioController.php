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

        //PUT Actualizar ultimo ingreso
        // localhost:81/PulseIT/api/usuario/updateIngreso
        public function update()
    {
        try {
            $request = new Request();
            $response = new Response();
            //Obtener json enviado
            $inputJSON = $request->getJSON();
            //Instancia del modelo
            $model = new UsuarioModel();
            //Acción del modelo a ejecutar
            $result = $model->updateUltimoIngreso($inputJSON);
            //Dar respuesta
            $response->toJSON($result);
        } catch (Exception $e) {
            $response->toJSON($result);
            handleException($e);
        }
    }

    //POST crear Tecnicos
    // localhost:81/PulseIT/api/usuario/createUsuario
    public function createUsuario()
    {
        try {
            $request = new Request();
            $response = new Response();

            $inputJSON = $request->getJSON();
            $model = new UsuarioModel();

            $result = $model->createUsuario($inputJSON);

            $response->toJSON($result);
        } catch (Exception $e) {
            handleException($e);
        }
    }

}