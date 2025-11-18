<?php
class image
{
    
    // POST: localhost:81/PulseIT/api/image/create
    public function create()
    {
        try {
            $response = new Response();

            // Combinar datos del formulario y los archivos
            $data = [
                'files' => $_FILES['files'] ?? [],
                'id_historial' => $_POST['id_historial'] ?? null,
                'id_usuario' => $_POST['id_usuario'] ?? null
            ];

            // Instancia del modelo
            $model = new ImagenHistorialModel();

            // Ejecutar el método de carga
            $result = $model->uploadEvidencias($data);

            // Enviar respuesta al cliente
            $response->toJSON($result);
        } catch (Exception $e) {
            handleException($e);
        }
    }
}
