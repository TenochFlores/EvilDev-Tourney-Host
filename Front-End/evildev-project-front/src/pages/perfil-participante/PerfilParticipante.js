import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit"; // Importa el icono de editar de MUI
import { useAuth } from "../../components/auth/ProvideAuth";
import { useNavigate } from "react-router-dom";
import NavbarIH from "../navbar/NavbarIH";
import AlertDialog from "../PantallasInicio/EliminarPerfil";

import axios from "axios";

export default function PerfilParticipante() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [username, setUsername] = useState("");
  const [correo, setCorreo] = useState("");
  let userid = null;
  useEffect(() => {
    if (auth.user.userType !== 3) {
      alert("Solo los participantes pueden consultar su perfil");
      navigate("/home");
    } else {
      userid = auth.user.userID;
      axios
        .get(`http://localhost:5000/get-perfil?id=${userid}`)
        .then((res) => {
          const data = res.data;
          setNombre(data.part.nombre);
          setUsername(data.part.username);
          setCorreo(data.part.correo);
        })
        .catch((error) => {
          if (error.response && error.response.status === 404) {
            alert(error.response.data.message);
          } else {
            console.error(
              "Error al recuperar los datos del participante:",
              error
            );
          }
        });
    }
  }, [userid]);

  const handleEditProfile = () => {
    navigate("/editar-participante");
  };

  return (
    <>
      <NavbarIH />
      <Container component="main" maxWidth="xs">
        <Typography
          component="h1"
          variant="h5"
          sx={{ fontWeight: "bold" }}
          mt={5}
        >
          Perfil de Participante
        </Typography>
        <Box
          mt={3}
          p={2}
          sx={{ border: "1px solid #ccc", borderRadius: "5px" }}
        >
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                {nombre}
              </Typography>
              <Typography variant="subtitle1">{username}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1">{correo}</Typography>
            </Grid>
          </Grid>
        </Box>
        <AlertDialog />

        {/* Botón para editar perfil */}
        <Button
          variant="outlined"
          onClick={handleEditProfile}
          endIcon={<EditIcon />}
        >
          Editar perfil
        </Button>
      </Container>
    </>
  );
}
