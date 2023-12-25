import React, {useState} from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {grey} from "@mui/material/colors";
import {useNavigate} from "react-router-dom";
import NavbarIH from "../navbar/NavbarIH";

import axios from "axios";

export default function FormRegistroAdministrador() {
  const navigate = useNavigate();
  const [perfil, setPerfil] = useState(null);
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const defaultImagePath = "../assets/Participante_white.png"; // Ruta de la imagen por defecto

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


  const handleSubmitRegistrarAdministrador = async (event) => {
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
      formData.append("nombre", nombre);
      formData.append("correo", correo);
      formData.append("username", username);
      formData.append("password", password);

      try {
        const response = await axios.post(
          "http://localhost:5000/registro_administrador",
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
          if (error.response && error.response.status === 401) {
            alert(error.response.data.message); // Muestra el mensaje de error
        } else {
          console.error("Error al registrar administrador:", error);
        }
      }

    };

    if (!perfil) {
      const confirmNoImage = window.confirm(
        "¿Está seguro de continuar sin subir una imagen?"
      );

      if (confirmNoImage) {
        // Crear una imagen predeterminada
        fetch(defaultImagePath)
          .then((res) => res.blob())
          .then((blob) => {
            formData.append("perfil", blob);
            enviarDatos(formData);
          })
          .catch((error) => {
            console.error("Error al cargar la imagen predeterminada:", error);
          });
      } else {
        return; // Detener el envío del formulario si el usuario cancela
      }
    } else {
      const perfilBlob = new Blob([perfil], {type: perfil.type});
      formData.append("perfil", perfilBlob);
      enviarDatos(formData);
    }
  }

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
          Registro de administrador
        </Typography>
        <form onSubmit={handleSubmitRegistrarAdministrador} sx={{mt: 5}}>
          <Box sx={{mb: 2}}>
            <label htmlFor="perfil">Foto de perfil</label>
            <input
              id="perfil"
              type="file"
              onChange={(e) => setPerfil(e.target.files[0])}
              accept=".png, .jpg, .jpeg"
            />
          </Box>
          <Box sx={{mb: 2}}>
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
          <Box sx={{mb: 2}}>
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
          <Box sx={{mb: 2}}>
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
          <Box sx={{mb: 2}}>
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Box>
          <Button type="submit" variant="contained" sx={buttonStyles}>
            Registrar
          </Button>
        </form>
      </Container>
    </>
  );
}
