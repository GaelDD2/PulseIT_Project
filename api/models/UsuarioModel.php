<?php
class UsuarioModel
{

    public $enlace;

    public function __construct()
    {
        $this->enlace = new MySqlConnect();
    }


     /**
     * Devolver Usuario logeado
     * @param $correoUsuario, $correo
     * @return $vResultado - Lista de objetos
     */
    public function login($correoUsuario, $contrasena)
{
    // Consulta para obtener al usuario
    $vSQL = "SELECT id, nombre, correo, id_rol, contrasena_hash
             FROM usuario
             WHERE correo = '$correoUsuario' LIMIT 1";

    $vResultado = $this->enlace->ExecuteSQL($vSQL);

    if (empty($vResultado)) {
        return null; // Usuario no encontrado
    }

    $usuario = $vResultado[0];
    $hash = $usuario->contrasena_hash;

    // 🔹 Caso 1: contraseña encriptada con bcrypt ($2y$ o $2a$)
    if (strpos($hash, '$2y$') === 0 || strpos($hash, '$2a$') === 0) {
        if (password_verify($contrasena, $hash)) {
            unset($usuario->contrasena_hash);
            return $usuario;
        }
    }

    // 🔹 Caso 2: contraseña guardada en texto plano (antigua)
    elseif ($contrasena === $hash) {
        // ✅ Autenticación correcta
        // 🔁 Actualizamos automáticamente el hash en la BD
        $nuevoHash = password_hash($contrasena, PASSWORD_DEFAULT);
        $sqlUpdate = "UPDATE usuario SET contrasena_hash = '$nuevoHash' WHERE id = {$usuario->id}";
        $this->enlace->executeSQL_DML($sqlUpdate);

        unset($usuario->contrasena_hash);
        return $usuario;
    }

    // ❌ Si no cumple ninguno de los casos
    return null;
}


        public function updateUltimoIngreso($objeto)
        {
           
            $sql = "UPDATE usuario SET 
            ultimo_ingreso=now()
            WHERE id = $objeto->id_usuario";
            
            $cResults = $this->enlace->executeSQL_DML($sql);

            $sqlGet = "SELECT * from usuario
            WHERE id = $objeto->id_usuario";
            return $this->enlace->ExecuteSQL($sqlGet)[0];
        
        }


}