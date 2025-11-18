<?php
class ticket
{

//GET Obtener tickets
    // localhost:81/PulseIT/api/ticket/ListarTickets/1/1
    public function ListarTickets($idRol,$idUsuario)
    {
        try {
            $response = new Response();
            //Instancia del modelo
            $ticketM = new TicketModel;
            //Acción del modelo a ejecutar
            $result = $ticketM->ListarTickets($idRol,$idUsuario);
            //Dar respuesta
            $response->toJSON($result);
        } catch (Exception $e) {
            $response->toJSON($result);
            handleException($e);
        }
    }

    //GET Obtener Detalle de ticket
    // localhost:81/PulseIT/api/ticket/DetalleTicket/2
    public function DetalleTicket($idTicket)
    {
        try {
            $response = new Response();
            //Instancia del modelo
            $ticketM = new TicketModel;
            //Acción del modelo a ejecutar
            $result = $ticketM->DetalleTicket($idTicket);
            //Dar respuesta
            $response->toJSON($result);
        } catch (Exception $e) {
            $response->toJSON($result);
            handleException($e);
        }
    }

    //POST crear Tickets
    // localhost:81/PulseIT/api/ticket
    public function create()
    {
        try {
            $request = new Request();
            $response = new Response();

            $inputJSON = $request->getJSON();
            $model = new TicketModel();

            $result = $model->createTicket($inputJSON);

            $response->toJSON($result);
        } catch (Exception $e) {
            handleException($e);
        }
    }

}