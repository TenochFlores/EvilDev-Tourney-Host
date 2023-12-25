import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {ProvideAuth} from "./components/auth/ProvideAuth";
import ForgotPassword from "./pages/forgot-password/ForgotPassword";
import CRUDAdministradoresIH from './pages/crud-administrador/CRUDAdministradoresIH';
import FormRegistroAdministrador from './pages/crud-administrador/FormularioRegistroAdministrador';
import FormEdicionAdministrador from './pages/crud-administrador/FormularioEdicionAdministrador';
import EditarParticipante from './pages/editar-participante/EditarParticipante';
import BuscarParticipante from './pages/buscar-participante/BuscarParticipante';
import BuscarTorneo from './pages/search-tournament/BuscarTorneo';
import Tourneys from "./pages/tourneys/Tourneys";
import CreateOrEditTourney from "./pages/tourneys/CreateOrEditTourney";
import SignUp from "./pages/login/SignUp";
import {loader as getTourneyLoader} from './loaders/tourneys/update'
import {LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterMoment} from '@mui/x-date-pickers/AdapterMoment'
import PantallaInicioAdmin from "./pages/PantallasInicio/PantallaInicioAdmin";
import PantallaInicioParticipante from './pages/PantallasInicio/PantallaInicioParticipante';
import PerfilParticipante from './pages/perfil-participante/PerfilParticipante';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/home",
    element: <PantallaInicioAdmin />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/tourneys",
    element: <BuscarTorneo />,
  },
  {
    path: "/tourneys/view/:tourneyId",
    element: <CreateOrEditTourney />,
  },
  {
    path: "/tourneys/update/:tourneyId",
    element: <CreateOrEditTourney />,
  },
  {
    path: "/tourneys/add",
    element: <CreateOrEditTourney />,
  },
  {
    path: "/crud_administradores",
    element: <CRUDAdministradoresIH />,
  },
  {
    path: "/registrar_administrador",
    element: <FormRegistroAdministrador />,
  },
  {
    path: "/editar_administrador/:adminId",
    element: <FormEdicionAdministrador />,
  },
  {
    path: "/sign-up-participante",
    element: <SignUp />,
  },
  {
    path: "/editar-participante",
    element: <EditarParticipante />,
  },
  {
    path: "/buscar-participante",
    element: <BuscarParticipante />,
  },
  {
    path: "/perfil-participante",
    element: <PerfilParticipante />,
  },
  {
    path: "/buscar-torneo",
    element: <BuscarTorneo />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/pantalla-inicio-participante",
    element: <PantallaInicioParticipante />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <ProvideAuth>
                <RouterProvider router={router}/>
            </ProvideAuth>
        </LocalizationProvider>
    </React.StrictMode>
);

