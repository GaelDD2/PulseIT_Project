import axios from "axios";

// http://localhost:81/PulseIT/api/etiqueta
const BASE_URL = import.meta.env.VITE_BASE_URL + "etiqueta";

class EtiquetaService {
  // Obtener todas las etiquetas
  getAll() {
    return axios.get(BASE_URL);
  }



}

export default new EtiquetaService();