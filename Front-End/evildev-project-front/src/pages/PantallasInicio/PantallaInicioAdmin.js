import React, {useEffect, useState} from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import {grey} from "@mui/material/colors";

import iconParticipantes from "../../assets/Participante_white.png";
import iconTorneo from "../../assets/Torneo_white.png";
import Link from "@mui/material/Link";
import {useAuth} from "../../components/auth/ProvideAuth";
import iconAdmin from "../../assets/Administrador_white.png";
import {useNavigate} from "react-router-dom";
import NavbarIH from "../navbar/NavbarIH";

const options = {
  0: //
    {
      name: "",
      showParticipantBtn: false,
      showTourneyBtn: false,
      showAdminBtn: false,
    },
  1: // Superadmin
    {
      name: "Super Administrador",
      showParticipantBtn: true,
      handleSubmitParticipant: (cb) => {
            cb("/buscar-participante")
        },
      showTourneyBtn: true,
        handleSubmitTourney: (cb) => {
            cb("/tourneys")
        },
      showAdminBtn: true,
      handleSubmitAdmin: (cb) => {
            cb("/crud_administradores")
      },
    },
  2: // Admin
    {
      name: "Administrador",
      showParticipantBtn: true,
      handleSubmitParticipant: (cb) => {
        cb("/buscar-participante")
      },
      showTourneyBtn: true,
      handleSubmitTourney: (cb) => {
        cb("/tourneys")
      },
      showAdminBtn: false,
      handleSubmitAdmin: (cb) => {
      },
    },
  3: // Participant
    {
      name: "Participante",
      showParticipantBtn: true,
      handleSubmitParticipant: (cb) => {
        cb("/buscar-participante")
      },
      showTourneyBtn: true,
      handleSubmitTourney: (cb) => {
        cb("/tourneys")
      },
      showAdminBtn: false,
      handleSubmitAdmin: () => {
      },
    },
}
export default function PantallaInicioAdmin() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [renderOptions, setRenderOptions] = useState(options[0])

  useEffect(() => {
    setRenderOptions(options[auth?.user?.userType])
  }, auth.user)

  const buttonStyles = {
    backgroundColor: grey[900],
    textTransform: "capitalize",
    fontWeight: "bold",
    width: "64%", // Establece el mismo ancho para ambos botones
  };

  return (
    <>
      <NavbarIH />
      <Container component="main" maxWidth="xs">
        <Typography
          component="h1"
          variant="h5"
          sx={{fontWeight: "bold"}}
          mt={5}
        >
          Opciones de {renderOptions?.name ?? ''}
        </Typography>
        <Box component="form" noValidate sx={{mt: 3}}>
          {renderOptions?.showParticipantBtn ? (
            <Box display="flex" flexDirection="column" alignItems="center">
              <Button
                type="link"
                variant="contained"
                size="large"
                style={buttonStyles}
                onClick={() => {renderOptions.handleSubmitParticipant(navigate)}}
              >
                Buscar Participantes
                <img
                  src={iconParticipantes}
                  alt="Icono Participantes"
                  style={{width: "20px", marginLeft: "30px"}}
                />
              </Button>
            </Box>
          ) : <></>}

          {renderOptions?.showTourneyBtn ? (
            <Box display="flex" flexDirection="column" alignItems="center">
              <Button
                type="link"
                variant="contained"
                size="large"
                style={buttonStyles}
                onClick={() => {renderOptions.handleSubmitTourney(navigate)}}
              >
                <Link to={'tourneys'}>Buscar Torneos</Link>
                <img
                  src={iconTorneo}
                  alt="Icono Torneo"
                  style={{width: "20px", marginLeft: "70px"}}
                />
              </Button>
            </Box>
          ) : <></>}

          {renderOptions?.showAdminBtn ? (
            <Box display="flex" flexDirection="column" alignItems="center" mt={3}>
              <Button
                type="link"
                variant="contained"
                size="large"
                style={buttonStyles}
                onClick={() => {renderOptions.handleSubmitAdmin(navigate)}}
              >
                Ver Administradores
                <img
                  src={iconAdmin}
                  alt="Icono Admin"
                  style={{width: "20px", marginLeft: "30px"}}
                />
              </Button>
            </Box>
          ) : <></>}
        </Box>
      </Container>
    </>
  );
}
