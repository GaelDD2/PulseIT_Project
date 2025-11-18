<?php
class tecnico
{

    //GET Obtener Tecnicos
    // localhost:81/PulseIT/api/tecnico
    public function index()
    {
        try {
            $response = new Response();
            //Instancia del modelo
            $tecnicoM = new TecnicoModel;
            //Acción del modelo a ejecutar
            $result = $tecnicoM->allTecnicos();
            //Dar respuesta
            $response->toJSON($result);
        } catch (Exception $e) {
            $response->toJSON($result);
            handleException($e);
        }
    }

    //GET Obtener Detalles de un Tecnico
    // localhost:81/PulseIT/api/tecnico/DetalleTecnico/3
    public function DetalleTecnico($idTecnico)
    {
        try {
            $response = new Response();
            //Instancia del modelo
            $tecnicoM = new TecnicoModel();
            //Acción del modelo a ejecutar
            $result = $tecnicoM->DetalleTecnico($idTecnico);
            //Dar respuesta
            $response->toJSON($result);
        } catch (Exception $e) {
            $response->toJSON($result);
            handleException($e);
        }
    }

    //GET Obtener Detalles de un Tecnico
    // localhost:81/PulseIT/api/tecnico/Asignaciones/2/3
    public function Asignaciones($idRol, $idTecnico)
    {
        try {
            $response = new Response();
            //Instancia del modelo
            $tecnicoM = new TecnicoModel();
            //Acción del modelo a ejecutar
            $result = $tecnicoM->Asignaciones($idRol, $idTecnico);
            //Dar respuesta
            $response->toJSON($result);
        } catch (Exception $e) {
            $response->toJSON($result);
            handleException($e);
        }
    }

    //POST crear Tecnicos
    // localhost:81/PulseIT/api/tecnico
    public function create()
    {
        try {
            $request = new Request();
            $response = new Response();

            $inputJSON = $request->getJSON();
            $model = new TecnicoModel();

            $result = $model->createTecnico($inputJSON);

            $response->toJSON($result);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    //PUT actualizar
   // localhost:81/PulseIT/api/tecnico

    public function update()
    {
        try {
            $request = new Request();
            $response = new Response();
            //Obtener json enviado
            $inputJSON = $request->getJSON();
            //Instancia del modelo
            $model = new TecnicoModel();
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
