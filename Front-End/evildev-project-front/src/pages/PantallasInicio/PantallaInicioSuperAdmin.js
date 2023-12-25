import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import {grey} from "@mui/material/colors";

import iconParticipantes from "../../assets/Participante_white.png";
import iconAdmin from "../../assets/Administrador_white.png";
import iconTorneo from "../../assets/Torneo_white.png";

import {useNavigate} from "react-router-dom";

import NavbarIH from "../navbar/NavbarIH";

export default function PantallaInicioSuperAdmin() {
  const navigate = useNavigate();

  const handleSubmitBuscarParticipantes = (event) => {
  };
  const handleSubmitBuscarTorneos = (event) => {
    event.preventDefault();
    navigate('tourneys')
  };

  const handleSubmitVerAdministradores = (event) => {
      event.preventDefault();
      navigate("/crud_administradores");
  };

  const buttonStyles = {
    backgroundColor: grey[900],
    textTransform: "capitalize",
    fontWeight: "bold",
    width: "64%", // Establece el mismo ancho para ambos botones
  };

  return (
    <>
      <NavbarIH/>
      <Container component="main" maxWidth="xs">
        <Typography
          component="h1"
          variant="h5"
          sx={{fontWeight: "bold"}}
          mt={5}
        >
          Opciones de Super Administrador
        </Typography>
        <Box component="form" noValidate sx={{mt: 3}}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Button
              type="link"
              variant="contained"
              size="large"
              style={buttonStyles}
            >
              Buscar Participantes
              <img
                src={iconParticipantes}
                alt="Icono Participantes"
                style={{width: "20px", marginLeft: "30px"}}
              />
            </Button>
          </Box>
          <Box display="flex" flexDirection="column" alignItems="center" mt={3}>
            <Button
              type="link"
              onClick={handleSubmitBuscarTorneos}
              variant="contained"
              size="large"
              style={buttonStyles}
            >
              Buscar Torneos
              <img
                src={iconTorneo}
                alt="Icono Torneo"
                style={{width: "20px", marginLeft: "70px"}}
              />
            </Button>
          </Box>
          <Box display="flex" flexDirection="column" alignItems="center" mt={3}>
            <Button
              type="link"
              variant="contained"
              size="large"
              style={buttonStyles}
              onClick={handleSubmitVerAdministradores}
            >
              Ver administradores
              <img
                src={iconAdmin}
                alt="Icono Admin"
                style={{width: "20px", marginLeft: "30px"}}
              />
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}