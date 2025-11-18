<?php
class categoria
{

    //GET Obtener Categorias
    // localhost:81/PulseIT/api/categoria
    public function index()
    {
        try {
            $response = new Response();
            //Instancia del modelo
            $categoriaM = new CategoriaModel;
            //Acción del modelo a ejecutar
            $result = $categoriaM->allCategorias();
            //Dar respuesta
            $response->toJSON($result);
        } catch (Exception $e) {
            $response->toJSON($result);
            handleException($e);
        }
    }

    //GET Obtener Detalles de una Categoria
    // localhost:81/PulseIT/api/categoria/DetalleCategoria/1
    public function DetalleCategoria($idCategoria)
    {
        try {
            $response = new Response();
            //Instancia del modelo
            $categoriaM = new CategoriaModel();
            //Acción del modelo a ejecutar
            $result = $categoriaM->DetalleCategoria($idCategoria);
            //Dar respuesta
            $response->toJSON($result);
        } catch (Exception $e) {
            $response->toJSON($result);
            handleException($e);
        }
    }

    //POST Crear Categorias
    // localhost:81/PulseIT/api/categoria
    public function create()
    {
        try {
            $request = new Request();
            $response = new Response();
    
            $inputJSON = $request->getJSON();
            $model = new CategoriaModel();
    
            $result = $model->createCategoria($inputJSON);
    
            $response->toJSON($result);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    //PUT actualizar
   // localhost:81/PulseIT/api/categoria

   public function update()
   {
       try {
           $request = new Request();
           $response = new Response();
           //Obtener json enviado
           $inputJSON = $request->getJSON();
           //Instancia del modelo
           $model = new CategoriaModel();
           //Acción del modelo a ejecutar
           $result = $model->update($inputJSON);
           //Dar respuesta
           $response->toJSON($result);
       } catch (Exception $e) {
           $response->toJSON($result);
           handleException($e);
       }
   }




}