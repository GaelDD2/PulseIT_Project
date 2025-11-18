import axios from "axios";

// http://localhost:81/PulseIT/api/tecnico
const BASE_URL = import.meta.env.VITE_BASE_URL + "tecnico";

class TecnicoService {
  // Obtener todos los técnicos
  getAll() {
    return axios.get(BASE_URL);
  }


    //Obtener Detalle Tecnico
  //http://localhost:81/PulseIT/api/tecnico/DetalleTecnico/4
  getDetalleById(TecnicoId){
    return axios.get(BASE_URL+'/'+"DetalleTecnico"+'/'+TecnicoId);
  }

      //Obtener Asignaciones de un  Tecnico
  //http://localhost:81/PulseIT/api/tecnico/Asignaciones/2/3
  getAsignacionesByTecnico(IdRol,UsuarioID){
    return axios.get(BASE_URL+'/'+"Asignaciones"+'/'+IdRol+'/'+UsuarioID);
  }

  createTecnico(Tecnico) {
    return axios.post(BASE_URL, Tecnico, {
      headers: { "Content-Type": "application/json" }
    });
  }

  updateTecnico(Tecnico) {
    return axios({
      method: 'put',
      url: BASE_URL,
      data: JSON.stringify(Tecnico)

    })
  }
  

}

export default new TecnicoService();
