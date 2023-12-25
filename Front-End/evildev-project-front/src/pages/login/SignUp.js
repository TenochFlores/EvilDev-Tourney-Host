import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useAuth } from "../../components/auth/ProvideAuth";
import { useNavigate } from "react-router-dom";
import { createTheme } from "@mui/material";
import logo from "../../assets/logo-bnw.png";
import { ThemeProvider } from "@emotion/react";
import axios from "axios";

const renderPasswordField = (label, name, value, onChange) => {
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
        type="password" // Establece el tipo de campo como "password"
        value={value}
        onChange={onChange}
      />
    </>
  );
};

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
  const [correo, setCorreo] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // Actualizar el estado correspondiente según el nombre del campo
    switch (name) {
      case "nombre":
        setNombre(value);
        break;
      case "correo":
        setCorreo(value);
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
    const formData = new FormData();

    if (perfil) {
      const perfilBlob = new Blob([perfil], { type: perfil.type });
      formData.append("perfil", perfilBlob);
    }

    formData.append("nombre", nombre);
    formData.append("correo", correo);
    formData.append("username", username);
    formData.append("password", password);

    try {
      const response = await axios.post(
        "http://localhost:5000/registro_participante",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Respuesta del servidor:", response.data);

      navigate("/");
    } catch (error) {
      console.error("Error al registrar administrador:", error);
    }
  };

  // Font
  const theme = createTheme({
    typography: {
      fontFamily: ["Inter", "bold"].join(","),
    },
  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img style={{ width: "40%" }} src={logo} alt="Logo" />
        <ThemeProvider theme={theme}>
          <Typography component="h1" variant="h5" fontSize="40px">
            Sign up EHT
          </Typography>
          <Box sx={{ mb: 2, mt: 1, textAlign: "center" }}>
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
            {renderTextField("Correo", "correo", correo, handleInputChange)}
            {renderTextField(
              "Username",
              "username",
              username,
              handleInputChange
            )}
            {renderPasswordField(
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
  );
}
