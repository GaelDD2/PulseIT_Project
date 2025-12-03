import axios from "axios";

// http://localhost:81/PulseIT/api/regla
const BASE_URL = import.meta.env.VITE_BASE_URL + "regla";

class ReglaAutotriageService {
  // Obtener todas las reglas
  getAll() {
    return axios.get(BASE_URL);
  }



}

export default new ReglaAutotriageService();