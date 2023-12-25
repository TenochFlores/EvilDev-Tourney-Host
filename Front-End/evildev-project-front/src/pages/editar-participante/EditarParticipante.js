import { React, useState, useEffect } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useAuth } from "../../components/auth/ProvideAuth";
import { useNavigate } from "react-router-dom";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import NavbarIH from "../navbar/NavbarIH";
import axios from "axios";

const renderTextField = (label, name, value, onChange) => {
  return (
    <>
      <Typography component="h4" variant="h5" fontSize="13px">
        {label}
      </Typography>
      <TextField
        margin="normal"
        required
        fullWidth
        id={name}
        label={label}
        name={name}
        autoComplete={name}
        autoFocus
        value={value}
        onChange={onChange}
      />
    </>
  );
};

export default function SignUp() {
  const auth = useAuth();
  const navigate = useNavigate();

  // Estado local para los valores de los campos de texto
  const [perfil, setPerfil] = useState(null);
  const [nombre, setNombre] = useState("");
  const [correo_actual, setCorreoActual] = useState("");
  const [correo_nuevo, setCorreoNuevo] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // Actualizar el estado correspondiente según el nombre del campo
    switch (name) {
      case "nombre":
        setNombre(value);
        break;
      case "correo_actual":
        setCorreoActual(value);
        break;
      case "correo_nuevo":
          setCorreoNuevo(value);
          break;
      case "username":
        setUsername(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (correo_actual != "") {
      const formData = new FormData();

      if (perfil) {
        const perfilBlob = new Blob([perfil], { type: perfil.type });
        formData.append("perfil", perfilBlob);
      }

      formData.append("nombre", nombre);
      formData.append("correo_actual", correo_actual);
      formData.append("correo_nuevo", correo_nuevo);
      formData.append("username", username);
      formData.append("password", password);

      try {
        const response = await axios.post(
          "http://localhost:5000/editar_participante",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        const respuesta = response.data;
        if(respuesta.message == 'Error al editar: Correo inexistente'){
          alert('Ingrese el correo asociado a su cuenta correctamente');
        }

        //navigate("/pantalla-inicio-participante");
        navigate("/home");
      } catch (error) {
        console.error("Error al editar al participante:", error);
        alert('Ingrese el correo asociado a su cuenta correctamente');
      }
    } else {
      alert(
        "El correo asociado a la cuenta es necesario para esta operación"
      );
    }
  };

  // Font
  const theme = createTheme({
    typography: {
      fontFamily: ["Inter", "400"].join(","),
    },
  });

  return (
    <>
      <NavbarIH />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 4,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
          textAlign="left"
        >
          <ThemeProvider theme={theme}>
            <Typography component="h1" variant="h5" fontSize="40px">
              Editar perfil
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ margin: 1 }}
            >
              {renderTextField("Ingrese el correo asociado a esta cuenta:", "correo_actual", correo_actual, handleInputChange)}
            </Box>
            <Box sx={{ mb: 2, mt: 1 }}>
              <label htmlFor="perfil">Foto de perfil</label>
              <label htmlFor="espacio"> </label>
              <input
                id="perfil"
                type="file"
                onChange={(e) => setPerfil(e.target.files[0])}
                accept="image/*"
                required
              />
            </Box>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ margin: 1 }}
            >
              {renderTextField("Nombre", "nombre", nombre, handleInputChange)}
              {renderTextField("Correo", "correo_nuevo", correo_nuevo, handleInputChange)}
              {renderTextField(
                "Username",
                "username",
                username,
                handleInputChange
              )}
              {renderTextField(
                "Contraseña",
                "password",
                password,
                handleInputChange
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                style={{ backgroundColor: "#252525" }}
              >
                Registrarse
              </Button>
            </Box>
          </ThemeProvider>
        </Box>
      </Container>
    </>
  );
}
