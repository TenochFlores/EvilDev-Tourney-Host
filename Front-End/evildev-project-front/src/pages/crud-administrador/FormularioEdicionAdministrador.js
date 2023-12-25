import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { grey } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import NavbarIH from "../navbar/NavbarIH";

import axios from "axios";

export default function FormEdicionAdministrador() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [username, setUsername] = useState("");
  const { adminId } = useParams();

  // Lista de dominios validos
  const listaDominios = [
    "gmail.com",
    "outlook.com",
    "hotmail.com",
    "ciencias.unam.mx",
    "zohomail.com",
    "hubspot.com",
    "protonmail.com",
  ];

  useEffect(() => {
    axios
      .get(`http://localhost:5000/get-administrador-by-id?id=${adminId}`)
      .then((res) => {
        const data = res.data;
        setNombre(data.admin.nombre);
        setCorreo(data.admin.correo);
        setUsername(data.admin.username);
        Promise.resolve(true);
      })
      .catch(() => {
        console.log("ERROR: no se pudo obtener al administrador a editar");
      });
  }, [adminId]);

  // Función para generar la expresión regular a partir de la lista de dominios
  const generarExpresionRegular = (dominios) => {
    const expresionDominios = dominios
      .map((dominio) => dominio.replace(/\./g, "\\."))
      .join("|");
    return new RegExp(`@(${expresionDominios})`);
  };

  // Generar la expresión regular a partir de la lista de dominios
  const dominiosValidos = generarExpresionRegular(listaDominios);

  // La función validarCorreo ahora utiliza la expresión regular generada dinámicamente
  const validarCorreo = (correo) => {
    const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return formatoCorreo.test(correo) && dominiosValidos.test(correo);
  };

  const handleSubmitEditarAdministrador = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    // Validación de dominio del correo ingresado
    const correoValido = validarCorreo(correo);
    if (!correoValido) {
      alert("Ingrese un dominio de correo válido.");
      return; // Detenemos el envío del formulario
    }

    const enviarDatos = async (formData) => {
      // Resto del código para añadir los campos al formData
      formData.append("id", adminId);
      formData.append("nombre", nombre);
      formData.append("correo", correo);
      formData.append("username", username);

      try {
        const response = await axios.post(
          "http://localhost:5000/update-administrador",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("Respuesta del servidor:", response.data);
        navigate("/crud_administradores");
      } catch (error) {
        if (error.response && error.response.status === 409) {
          alert(error.response.data.message); // Muestra el mensaje de error
        } else {
          console.error("Error al editar administrador:", error);
        }
      }
    };



    enviarDatos(formData);
  };

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
          sx={{ fontWeight: "bold" }}
          mt={5}
        >
          Actualizar datos de administrador
        </Typography>
        <form onSubmit={handleSubmitEditarAdministrador} sx={{ mt: 5 }}>
          <Box sx={{ mb: 2 }}>
            <label htmlFor="nombre">Nombre</label>
            <input
              id="nombre"
              type="text"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <label htmlFor="correo">Correo</label>
            <input
              id="correo"
              type="email"
              placeholder="Correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Box>
          <Button type="submit" variant="contained" sx={buttonStyles}>
            Aplicar cambios
          </Button>
        </form>
      </Container>
    </>
  );
}
