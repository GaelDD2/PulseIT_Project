import axios from "axios";

// http://localhost:81/PulseIT/api/notificacion
const BASE_URL = import.meta.env.VITE_BASE_URL + "notificacion";

class NotificacionService {


 // Obtener notificaciones por usuario
  //http://localhost:81/PulseIT/api/notificacion/getByUsuario/1
  getByUsuario(idUsuario){
    return axios.get(BASE_URL+'/'+"getByUsuario"+'/'+idUsuario);
  }

  createNotificacion(notificacion) {
    return axios.post(`${BASE_URL}/createNoti`, notificacion, {
      headers: { "Content-Type": "application/json" }
    });
  }

  // Obtener numero de notificaciones
  //http://localhost:81/PulseIT/api/notificacion/getCantNoti/1
  getNumeroNotis(idUsuario){
    return axios.get(BASE_URL+'/'+"getCantNoti"+'/'+idUsuario);
  }

  marcarAtendida(notificacion) {
    return axios({
      method: 'put',
      url: `${BASE_URL}/marcarAtendida`,
      data: JSON.stringify(notificacion)

    })
  }

 

}

export default new NotificacionService();