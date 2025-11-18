// src/services/UsuarioService.js
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL + "usuario";

class UsuarioService {
  // Ejemplo: GETlocalhost:81/PulseIT/api/usuario/login/carlos@correo.com/hash123
  validarUsuario(correo, contrasena) {
    return axios.get(BASE_URL+'/'+"login"+'/'+correo+'/'+contrasena);

  }
}

export default new UsuarioService();
