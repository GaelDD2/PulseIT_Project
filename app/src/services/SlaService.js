import axios from "axios";

// http://localhost:81/PulseIT/api/sla
const BASE_URL = import.meta.env.VITE_BASE_URL + "sla";

class SlaService {
  // Obtener todas los sla
  getAll() {
    return axios.get(BASE_URL);
  }



}

export default new SlaService();