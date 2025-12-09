// src/services/UsuarioService.js
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL + "usuario";

class UsuarioService {
  // GETlocalhost:81/PulseIT/api/usuario/login/carlos@correo.com/hash123
  validarUsuario(correo, contrasena) {
    return axios.get(BASE_URL+'/'+"login"+'/'+correo+'/'+contrasena);

  }

  updateIngreso(Usuario) {
    return axios({
      method: 'put',
      url: BASE_URL,
      data: JSON.stringify(Usuario)

    })
  }

  createUser(User) {
    return axios.post(`${BASE_URL}/createUsuario`, User, {
      headers: { "Content-Type": "application/json" }
    });
  }
}

export default new UsuarioService();
