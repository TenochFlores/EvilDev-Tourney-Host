import React, {useState} from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {useAuth} from "../../components/auth/ProvideAuth";
import {useNavigate} from "react-router-dom";
import {createTheme} from '@mui/material';
import logo from "../../assets/logo-bnw.png"
import {ThemeProvider} from '@emotion/react';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {Alert, Snackbar} from "@mui/material";

export default function Login() {
  const auth = useAuth();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState('warning');
  const [snackMessage, setSnackMessage] = useState('');

  const [tipoCuentaState, setTipoCuentaState] = React.useState('');

  const handleChange = (event) => {
    setTipoCuentaState(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userLogin = {
      email: data.get('email'),
      password: data.get('password'),
      tipo_cuenta: tipoCuentaState
    };

    auth.signin(userLogin.email, userLogin.password, userLogin.tipo_cuenta)
      .then((res) => { 
        if (res) 
          navigate("/home")
        else {
          setOpen(true);
          setSeverity("error");
          setSnackMessage("Combinacion de credenciales incorrecta.")
        }
      });
  };
  
  const handleClose = (event) => {
    setOpen(false);
  };

  // Font
  const theme = createTheme({
    typography: {
      fontFamily: [
        'Inter',
        'bold',
      ].join(','),
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
        <img style={{ width: "40%" }} src={logo} />
        <ThemeProvider theme={theme}>
          <Typography component="h1" variant="h5" fontSize="40px">
            Sign in EHT
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControl fullWidth>
              <InputLabel id="tipo_cuenta">Tipo de cuenta</InputLabel>
              <Select
                labelId="tipo_cuenta"
                id="tipo_cuenta"
                required
                value={tipoCuentaState}
                label="tipo_cuenta"
                onChange={handleChange}
              >
                <MenuItem value={"super-administrador"}>
                  Super Administrador
                </MenuItem>
                <MenuItem value={"administrador"}>Administrador</MenuItem>
                <MenuItem value={"participante"}>Participante</MenuItem>
              </Select>
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{ backgroundColor: "#252525" }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link
                  onClick={() => navigate("/forgot-password")}
                  variant="body2"
                >
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link
                  onClick={() => navigate("/sign-up-participante")}
                  variant="body2"
                >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </ThemeProvider>
      </Box>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {snackMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}
