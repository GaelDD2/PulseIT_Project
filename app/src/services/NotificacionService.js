import axios from "axios";

// http://localhost:81/PulseIT/api/ticket
const BASE_URL = import.meta.env.VITE_BASE_URL + "notificacion";

class NotificacionService {


 // Obtener Detalle del ticket
  //http://localhost:81/PulseIT/api/notificacion/getByUsuario/1
  getByUsuario(idUsuario){
    return axios.get(BASE_URL+'/'+"getByUsuario"+'/'+idUsuario);
  }

 

}

export default new NotificacionService();