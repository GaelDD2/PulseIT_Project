import axios from "axios";

// http://localhost:81/PulseIT/api/ticket
const BASE_URL = import.meta.env.VITE_BASE_URL + "ticket";

class TicketService {


    //Obtener Tickets segun Usuario
  // localhost:81/PulseIT/api/ticket/ListarTickets/1/1
  getTickets(IdRol,IdUsuario){
    return axios.get(BASE_URL+'/'+"ListarTickets"+'/'+IdRol+'/'+IdUsuario);
  }

 // Obtener Detalle del ticket
  //http://localhost:81/PulseIT/api/ticket/DetalleTicket/3
  getDetalleById(TicketID){
    return axios.get(BASE_URL+'/'+"DetalleTicket"+'/'+TicketID);
  }

  createTicket(ticket) {
    return axios.post(BASE_URL, JSON.stringify(ticket));
  }

  updateEstado(ticket) {
    return axios({
      method: 'put',
      url: `${BASE_URL}/updateEstado`,
      data: JSON.stringify(ticket)

    })
  }

  asignarTecnicoManual(ticket) {
    return axios({
      method: 'put',
      url: `${BASE_URL}/asignarTecnicoM`,
      data: JSON.stringify(ticket)

    })
  }

  asignarTecnicoAutomatico(ticket) {
    return axios({
      method: 'put',
      url: `${BASE_URL}/asignacionAutomatica`,
      data: JSON.stringify(ticket)

    })
  }

  valoracionTicket(Ticket) {
    return axios.post(`${BASE_URL}/valoracion`, Ticket, {
      headers: { "Content-Type": "application/json" }
    });
  }

  

}

export default new TicketService();