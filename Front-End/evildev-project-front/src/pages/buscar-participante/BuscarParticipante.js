import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import NavbarIH from "../navbar/NavbarIH";
import FilaDatosParticipante from "./FilaDatosParticipante";
import axios from "axios";

const buttonStyles = {
  backgroundColor: grey[900],
  textTransform: "capitalize",
  fontWeight: "bold",
  width: "80%",
};

export default function BuscarParticipante() {
  const [terminoBusqueda, setTerminoBusqueda] = useState("");
  const [buscarPresionado, setBuscarPresionado] = useState(false);
  const [people, setPeople] = useState([]);

  const navigate = useNavigate();

  const handleBuscarParticipante = (event) => {
    event.preventDefault();

    // var url = "http://localhost:5000/get-participante-con-correo/"+terminoBusqueda

    axios
      .post("http://localhost:5000/get-participante-con-correo/", {
        terminoBusqueda: terminoBusqueda,
      })
      .then((res) => {
        // Manejar la respuesta exitosa aquí
        const data = res.data;
        setPeople(data.data);
      })
      .catch((error) => {
        // Manejar errores aquí
        console.error(error);
      });

    setBuscarPresionado(true);

    return Promise.resolve(true);
  };

  const handleAgregarParticipante = (event) => {
    event.preventDefault();
    //navigate("/");
  };

  return (
    <>
      <NavbarIH />
      <Container component="main" maxWidth="xs">
        <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
          <Typography variant="h4" mb={3} sx={{ fontWeight: "bold", flex: 1 }}>
            Participantes
          </Typography>

          <Box display="flex" alignItems="center" width="230%" height="100%">
            <OutlinedInput
              placeholder="Buscar"
              variant="filled"
              value={terminoBusqueda}
              onChange={(e) => setTerminoBusqueda(e.target.value)}
              sx={{
                background: "#EBEBEB",
                alignSelf: "stretch",
                width: "40%",
                marginLeft: "24%",
              }}
            />
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
                marginLeft: 2,
                width: "14%",
                alignSelf: "stretch",
                marginRight: "24%",
              }}
              onClick={handleBuscarParticipante}
            >
              Buscar
            </Button>
          </Box>

          {buscarPresionado && (
            <Box mt={8}>
              {/* Linea */}
              <Divider
                style={{
                  width: "80vw",
                  borderWidth: "3px",
                  borderColor: "#A8A8A8",
                }}
              />

              {/* Renderización condicional basada en buscarPresionado y people */}
              {people.length > 0 ? (
                <Box>
                  {people.map((person) => (
                    <FilaDatosParticipante
                    name={person.nombre}
                    user={person.username}
                    imageSrc={person.foto}
                    email={person.correo}
                    />
                  ))}
                </Box>
              ) : (
                <Typography
                  variant="h4"
                  mb={3}
                  sx={{ fontWeight: "bold", flex: 1 }}
                >
                  No hay coincidencias
                </Typography>
              )}
            </Box>
          )}
        </Box>
      </Container>
    </>
  );
}
