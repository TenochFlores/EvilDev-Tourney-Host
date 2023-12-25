import {Box, Button, Grid} from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { grey } from "@mui/material/colors";
import { React, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import iconRegistrarAdministrador from "../../assets/Administrador_white.png";
import NavbarIH from "../navbar/NavbarIH";
import FilaDatos from "./FilaDatos";
import Divider from "@mui/material/Divider";
import axios from 'axios';

const buttonStyles = {
  backgroundColor: grey[900],
  textTransform: "capitalize",
  fontWeight: "bold",
  width: "80%", // Establece el mismo ancho para ambos botones
};

export default function CRUDAdministradoresIH() {
  const [people, setPeople] = useState([]);

  const navigate = useNavigate();

  const handleRegistrarAdministrador = (event) => {
    event.preventDefault();
    navigate("/registrar_administrador");
  };
  
  useEffect(() => {
    getPeople()
  }, [])

  function getPeople() {
    axios
      .get("http://localhost:5000/get-administradores")
      .then((res) => {
        const data = res.data;
        setPeople(data.data);
      })
      .catch(() => {
        console.log("ERROR: no se pudo obtener a los administradores");
      });
  }
  
  const deleteAdmin = useCallback(() => {
    getPeople()
  }, [])

  return (
    <>
      <NavbarIH />
      <Container component="main" maxWidth="xs">
        <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
          <Box display="flex" alignItems="center" width="230%">
            <Typography variant="h4" sx={{ fontWeight: "bold", flex: 1 }}>
              Administradores registrados
            </Typography>
            <Button
              type="button"
              variant="contained"
              size="large"
              sx={{
                ...buttonStyles,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
              }}
              onClick={handleRegistrarAdministrador}
            >
              <span style={{ display: "flex", alignItems: "center" }}>
                Registrar nuevo administrador
                <img
                  src={iconRegistrarAdministrador}
                  alt="Icono Registrar Administrador"
                  style={{ width: "20px", marginLeft: "10px" }}
                />
              </span>
            </Button>
          </Box>

          <Box mt={8}>
            <TitulosTabla />

            <Box>
              {people.map((person) => (
                <FilaDatos
                  key={person.id_administrador}
                  id={person.id_administrador}
                  name={person.nombre}
                  user={person.username}
                  imageSrc={person.foto}
                  email={person.correo}
                  clickHandler={deleteAdmin}
                />
              ))}
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export const TitulosTabla = () => {
  return (
    <>
      {/* Linea */}
      <Divider
        style={{
          width: "80vw",
          borderWidth: "3px",
          borderColor: "#A8A8A8",
        }}
      />

      <Grid
        container
        spacing={0}
        width="80vw"
        height="10vw"
        sx={{marginBottom: "-40px", marginTop: "-40px"}}
      >
        <Grid
          item
          xs={3}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <Typography variant="h8" sx={{fontWeight: "bold"}}>
            Foto
          </Typography>
        </Grid>
        <Grid
          item
          xs={3}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <Typography variant="h8" sx={{fontWeight: "bold"}}>
            Nombre y usuario
          </Typography>
        </Grid>
        <Grid
          item
          xs={3}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <Typography variant="h8" sx={{fontWeight: "bold"}}>
            Correo
          </Typography>
        </Grid>
        <Grid
          item
          xs={3}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <Typography variant="h8" sx={{fontWeight: "bold"}}>
            Opciones
          </Typography>
        </Grid>
      </Grid>

      {/* Linea */}
      <Divider
        style={{
          width: "80vw",
          borderWidth: "3px",
          borderColor: "#A8A8A8",
        }}
      />
    </>
  );
};
