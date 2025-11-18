import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UsuarioService from "../../services/UsuarioService";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import PulseITLogo from "../../assets/PulseITLogo.png";

export function Login() {
  const navigate = useNavigate();
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await UsuarioService.validarUsuario(correo, contrasena);

      if (response.data.success && response.data.data) {
        console.log(response.data);

        const { id, id_rol, nombre, correo } = response.data.data;
        localStorage.setItem("idUsuario", id);
        localStorage.setItem("idRol", id_rol);
        localStorage.setItem("nombre", nombre);
        localStorage.setItem("correo", correo);



        navigate("/home"); // Redirige al Home
      } else {
        setError("Correo o contraseña incorrectos.");
      }
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError("Error al conectar con el servidor.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-900">
      {/* Panel Izquierdo: Logo */}
      <div className="hidden md:flex md:w-1/2  bg-white items-center justify-center">
        <img
          src={PulseITLogo}
          alt="Logo PulseIT"
          className="w-3/5 max-w-md drop-shadow-lg"
        />
      </div>

      {/* Panel Derecho: Formulario */}
      <div className="flex w-full items-center justify-center p-6 bg-white">
        <Card className="w-full max-w-md bg-gray-100 border-none shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-primary">
              Iniciar Sesión
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-primary mb-1">
                  Correo electrónico
                </label>
                <Input
                  type="email"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  required
                  className="bg-gray-700 text-black"
                  placeholder="ejemplo@correo.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-primary mb-1">
                  Contraseña
                </label>
                <Input
                  type="password"
                  value={contrasena}
                  onChange={(e) => setContrasena(e.target.value)}
                  required
                  className="bg-gray-700 text-black"
                  placeholder="********"
                />
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full mt-2">
                Ingresar
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
