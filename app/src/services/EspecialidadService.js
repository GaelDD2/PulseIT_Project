import axios from "axios";

// http://localhost:81/PulseIT/api/especialidad
const BASE_URL = import.meta.env.VITE_BASE_URL + "especialidad";

class EspecialidadService {
  // Obtener todas las especialidades
  getAll() {
    return axios.get(BASE_URL);
  }



}

export default new EspecialidadService();