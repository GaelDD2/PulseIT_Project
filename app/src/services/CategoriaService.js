import axios from "axios";

// http://localhost:81/PulseIT/api/categoria
const BASE_URL = import.meta.env.VITE_BASE_URL + "categoria";

class CategoriaService {
  // Obtener todos los técnicos
  getAll() {
    return axios.get(BASE_URL);
  }


  //Obtener Detalle Categoria
  //http://localhost:81/PulseIT/api/categoria/DetalleCategoria/1
  getDetalleById(CategoriaId){
    return axios.get(BASE_URL+'/'+"DetalleCategoria"+'/'+CategoriaId);
  }

  createCategoria(Categoria) {
    return axios.post(BASE_URL, JSON.stringify(Categoria));
  }

  getByEtiqueta(idEtiqueta){
    return axios.get(BASE_URL+'/'+"getByEtiqueta"+'/'+idEtiqueta);
  }

  updateCategoria(Categoria) {
    return axios({
      method: 'put',
      url: BASE_URL,
      data: JSON.stringify(Categoria)

    })
  }

}

export default new CategoriaService();