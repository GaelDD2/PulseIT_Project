import { StrictMode } from 'react' 
import { createRoot } from 'react-dom/client' 
import './index.css' 
import { createBrowserRouter } from 'react-router-dom' 
import { RouterProvider } from 'react-router' 
import { Layout } from './components/Layout/Layout' 
import { Home } from './components/Home/Home' 
import { PageNotFound } from './components/Home/PageNotFound' 
import { ListTecnicos } from './components/Tecnico/ListTecnicos'
import { DetailTecnico } from './components/Tecnico/DetailTecnico'
import { ListCategorias } from './components/Categoria/ListCategoria'
import { DetailCategoria } from './components/Categoria/DetailCategoria'
import { Login } from './components/Login/Login'
import { ListTickets } from './components/Ticket/ListTickets'
import { TicketDetail } from './components/Ticket/TicketDetail'
import { AsignacionesTecnico } from './components/Tecnico/AsignacionesTecnico'
import { CreateTecnico } from './components/Tecnico/CreateTecnico'
import { CreateCategoria } from './components/Categoria/CreateCategoria'
import { UpdateTecnico } from './components/Tecnico/UpdateTecnico'
import { CreateTicket } from './components/Ticket/CreateTicket'
import { UpdateCategoria } from './components/Categoria/UpdateCategoria'
import { UpdateEstado } from './components/Ticket/UpdateEstado'
import { NotificationsPanel } from './components/Notificacion/PanelNotificaciones'
import { ListTecnicosAsignacion } from './components/Tecnico/ListTecnicoAsignacion'
import { AsignarTecnicoManual } from './components/Ticket/AsignarTecnicoManual'
import { I18nextProvider } from 'react-i18next';  // <- Ya la tienes
import i18n from './i18n';  // <- Ya la tienes

const rutas = createBrowserRouter([
  { path: "/", element: <Login /> }, 
  {
    element: <Layout />,
    children: [
      { path: "home", element: <Home /> },
      { path: "*", element: <PageNotFound /> },
      { path: "tecnicos", element: <ListTecnicos /> },
      { path: "tecnicos/detail/:id", element: <DetailTecnico /> },
      { path: "categorias", element: <ListCategorias /> },
      { path: "categorias/detail/:id", element: <DetailCategoria /> },
      { path: "tickets", element: <ListTickets /> },
      { path: "tickets/detail/:id", element: <TicketDetail /> },
      { path: "asignaciones/:id", element: <AsignacionesTecnico /> },
      { path: "createTecnico", element: <CreateTecnico /> },
      { path: "createCategoria", element: <CreateCategoria /> },
      { path: "tecnicos/detail/updateTecnico/:id", element: <UpdateTecnico /> },
      { path: "createTicket", element: <CreateTicket /> },
      { path: "categorias/detail/updateCategoria/:id", element: <UpdateCategoria /> },
      { path: "tickets/updateEstado/:idTicket/:estado", element: <UpdateEstado /> },
      { path: "notificaciones", element: <NotificationsPanel /> },
      { path: "tecnicosAsignaciones/:idTicket", element: <ListTecnicosAsignacion /> },
      { path: "AsignarTecnicoManual/:idTicket/:idTecnico", element: <AsignarTecnicoManual /> },
    ],
  },
]);

createRoot(document.getElementById('root')).render( 
  <StrictMode> 
    <I18nextProvider i18n={i18n}>  {/* <- ENVOLVER TODO CON ESTO */}
      <RouterProvider router={rutas} /> 
    </I18nextProvider>
  </StrictMode>, 
)