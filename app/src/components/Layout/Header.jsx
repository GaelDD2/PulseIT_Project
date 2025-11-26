"use client";

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Layers,
  Ticket,
  Settings,
  LogIn,
  UserPlus,
  LogOut,
  Menu,
  X,
  ChevronDown,
  User,
  Bell,
  BriefcaseBusiness,
  Activity
} from "lucide-react";

import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
} from "@/components/ui/menubar";
import NotificacionService from "@/services/NotificacionService";

export default function Header() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [numeroNotificaciones, setNumeroNotificaciones] = useState(0);

  // 🔹 Cargar datos del usuario logueado desde localStorage
  const idUsuario = localStorage.getItem("idUsuario");
  const idRol = localStorage.getItem("idRol");
  const correo = localStorage.getItem("correo");

  const userData = {
    correo: correo || "Invitado",
    rol: idRol,
  };

  // 🔹 Obtener número de notificaciones
  useEffect(() => {
    const fetchNotificaciones = async () => {
      if (idUsuario) {
        try {
          const response = await NotificacionService.getNumeroNotis(idUsuario);
          if (response.data.success) {
            setNumeroNotificaciones(response.data.data);
          }
        } catch (error) {
          console.error("Error al obtener notificaciones:", error);
        }
      }
    };

    fetchNotificaciones();
    
    // Opcional: Actualizar cada 30 segundos
    const interval = setInterval(fetchNotificaciones, 30000);
    
    return () => clearInterval(interval);
  }, [idUsuario]);

  // 🔹 Función para cerrar sesión
  const handleLogout = () => {
    localStorage.clear(); // Limpia todo el storage
    navigate("/"); // Redirige al login
  };

  // 🔹 Menús comunes
  const ticketItems = [
    { title: "Mis Tickets", href: "/tickets" },
    { title: "Crear Ticket", href: "/createTicket" },
  ];

  const adminItems = [
    { title: "Gestión de Técnicos", href: "/tecnicos" },
    { title: "Categorías y SLA", href: "/categorias" },
    { title: "Reglas de Asignación", href: "/reglas" },
    { title: "Dashboard", href: "/dashboard" },
  ];

  const tecnicoItems = [
    { title: "Ver mis asignaciones", href: `/asignaciones/${idUsuario}` },
  ];

  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-primary text-white shadow-md border-b border-primary/50">
      <div className="flex items-center justify-between px-6 py-3 max-w-[1280px] mx-auto">
        {/* Logo */}
        <Link
          to="/home"
          className="flex items-center gap-2 text-xl font-semibold tracking-wide hover:opacity-90 transition"
        >
          <span className="hidden sm:inline">PulseIT</span>
          <Activity className="h-5 w-5" />
        </Link>

        {/* Menú escritorio */}
        <div className="hidden md:flex flex-1 justify-center">
          <Menubar className="w-auto bg-transparent border-none shadow-none space-x-6">
            
            {/* Tickets */}
            <MenubarMenu>
              <MenubarTrigger className="text-white font-medium flex items-center gap-1 hover:text-secondary transition">
                <Ticket className="h-4 w-4" /> Tickets
                <ChevronDown className="h-3 w-3" />
              </MenubarTrigger>
              <MenubarContent className="bg-white backdrop-blur-md border-white/10">
                {ticketItems.map((item) => (
                  <MenubarItem key={item.href} asChild>
                    <Link
                      to={item.href}
                      className="flex items-center gap-2 py-2 px-3 rounded-md text-sm hover:bg-blue-600/40 transition"
                    >
                      {item.title}
                    </Link>
                  </MenubarItem>
                ))}
              </MenubarContent>
            </MenubarMenu>

            {/* Administración (solo para admin) */}
            {idRol === "3" && (
              <MenubarMenu>
                <MenubarTrigger className="text-white font-medium flex items-center gap-1 hover:text-secondary transition">
                  <Settings className="h-4 w-4" /> Administración
                  <ChevronDown className="h-3 w-3" />
                </MenubarTrigger>
                <MenubarContent className="bg-white backdrop-blur-md border-white/10">
                  {adminItems.map((item) => (
                    <MenubarItem key={item.href} asChild>
                      <Link
                        to={item.href}
                        className="flex items-center gap-2 py-2 px-3 rounded-md text-sm hover:bg-blue-600/40 transition"
                      >
                        {item.title}
                      </Link>
                    </MenubarItem>
                  ))}
                </MenubarContent>
              </MenubarMenu>
              
            )}

            {/* Asignaciones (solo para tecnicos y admin) */}
            {(idRol === "2" || idRol === "3") && (
              <MenubarMenu>
                <MenubarTrigger className="text-white font-medium flex items-center gap-1 hover:text-secondary transition">
                  <BriefcaseBusiness className="h-4 w-4" /> Asignaciones
                  <ChevronDown className="h-3 w-3" />
                </MenubarTrigger>
                <MenubarContent className="bg-white backdrop-blur-md border-white/10">
                  {tecnicoItems.map((item) => (
                    <MenubarItem key={item.href} asChild>
                      <Link
                        to={item.href}
                        className="flex items-center gap-2 py-2 px-3 rounded-md text-sm hover:bg-blue-600/40 transition"
                      >
                        {item.title}
                      </Link>
                    </MenubarItem>
                  ))}
                </MenubarContent>
              </MenubarMenu>
            )}

            {/* Usuario */}
            <MenubarMenu>
              <MenubarTrigger className="text-white font-medium flex items-center gap-1 hover:text-secondary transition">
                <User className="h-4 w-4" /> {userData.correo}
                <ChevronDown className="h-3 w-3" />
              </MenubarTrigger>
              <MenubarContent className="bg-white backdrop-blur-md border-white/10">
                {!idUsuario ? (
                  <>
                    <MenubarItem asChild>
                      <Link
                        to="/user/login"
                        className="flex items-center gap-2 py-2 px-3 rounded-md text-sm hover:bg-blue-600/40 transition"
                      >
                        <LogIn className="h-4 w-4" /> Iniciar Sesión
                      </Link>
                    </MenubarItem>
                    <MenubarItem asChild>
                      <Link
                        to="/user/create"
                        className="flex items-center gap-2 py-2 px-3 rounded-md text-sm hover:bg-blue-600/40 transition"
                      >
                        <UserPlus className="h-4 w-4" /> Registrarse
                      </Link>
                    </MenubarItem>
                  </>
                ) : (
                  <MenubarItem
                    onClick={handleLogout}
                    className="flex items-center gap-2 py-2 px-3 rounded-md text-sm hover:bg-red-600/40 transition cursor-pointer"
                  >
                    <LogOut className="h-4 w-4" /> Cerrar Sesión
                  </MenubarItem>
                )}
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>

        {/* Notificaciones y menú móvil */}
        <div className="flex items-center gap-4">
          <Link to="/notificaciones" className="relative hover:opacity-80">
            <Bell className="h-6 w-6" />
            {/* Burbuja de notificaciones */}
            {numeroNotificaciones > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                {numeroNotificaciones > 99 ? '99+' : numeroNotificaciones}
              </span>
            )}
          </Link>

          {/* Menú móvil */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button className="md:hidden inline-flex items-center justify-center p-2 rounded-lg bg-white/10 hover:bg-white/20 transition">
                {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </SheetTrigger>

            <SheetContent side="left" className="bg-blue-900/90 text-white backdrop-blur-lg w-72">
              <nav className="mt-8 px-4 space-y-6">
                <div>
                  <Link to="/" className="flex items-center gap-2 text-lg font-semibold">
                    <Ticket /> PulseIT
                  </Link>
                </div>

                {/* Tickets */}
                <div>
                  <h4 className="mb-2 text-lg font-semibold flex items-center gap-2">
                    <Ticket /> Tickets
                  </h4>
                  {ticketItems.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-2 py-2 px-3 rounded-md text-white/90 hover:bg-white/10 transition"
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>

                {/* Administración */}
                {idRol === "3" && (
                  <div>
                    <h4 className="mb-2 text-lg font-semibold flex items-center gap-2">
                      <Settings /> Administración
                    </h4>
                    {adminItems.map((item) => (
                      <Link
                        key={item.href}
                        to={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-2 py-2 px-3 rounded-md text-white/90 hover:bg-white/10 transition"
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                )}

                {/* Tecnicos y admin */}
                {(idRol === "2" || idRol === "3") && (
                  <div>
                    <h4 className="mb-2 text-lg font-semibold flex items-center gap-2">
                      <BriefcaseBusiness /> Asignaciones
                    </h4>
                    {tecnicoItems.map((item) => (
                      <Link
                        key={item.href}
                        to={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-2 py-2 px-3 rounded-md text-white/90 hover:bg-white/10 transition"
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                )}

                {/* Usuario */}
                <div>
                  <h4 className="mb-2 text-lg font-semibold flex items-center gap-2">
                    <User /> {userData.correo}
                  </h4>
                  {!idUsuario ? (
                    <>
                      <Link
                        to="/user/login"
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-2 py-2 px-3 rounded-md text-white/90 hover:bg-white/10 transition"
                      >
                        <LogIn className="h-4 w-4" /> Iniciar Sesión
                      </Link>
                      <Link
                        to="/user/create"
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-2 py-2 px-3 rounded-md text-white/90 hover:bg-white/10 transition"
                      >
                        <UserPlus className="h-4 w-4" /> Registrarse
                      </Link>
                    </>
                  ) : (
                    <button
                      onClick={() => {
                        handleLogout();
                        setMobileOpen(false);
                      }}
                      className="flex items-center gap-2 py-2 px-3 rounded-md text-white/90 hover:bg-red-600/30 transition w-full text-left"
                    >
                      <LogOut className="h-4 w-4" /> Cerrar Sesión
                    </button>
                  )}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}