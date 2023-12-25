import {createTheme} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import logo from "../../assets/logo-bnw.png";
import {ThemeProvider} from "@emotion/react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import * as React from "react";
import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [validPsw, setValidPsw] = useState(true)
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userLogin = {
      email: data.get('email'),
      password: data.get('password'),
    };

    axios
      .post("http://localhost:5000/api/auth/forgot-password", userLogin)
      .then(() => navigate("/"))
      .catch();
  };

  const validatePassword = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget);

    const psw = data.get('password');
    const pswRepeat = data.get('password-repeat');

    if (psw === '' || pswRepeat === '') {
      setValidPsw(true);
      return;
    }

    setValidPsw(psw === pswRepeat)
  }

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
      <CssBaseline/>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <img style={{width: '40%'}} src={logo} alt="EHT Logo"/>
        <ThemeProvider theme={theme}>
          <Typography component="h1" variant="h5" fontSize='40px'>
            Change Password
          </Typography>
          <Box component="form" onSubmit={handleSubmit} onChange={validatePassword} noValidate sx={{mt: 1}}>
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
              error={validPsw}
              name="password"
              label="New Password"
              type="password"
              id="password"
              helperText="Passwords must match"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              error={validPsw}
              name="password-repeat"
              label="Repeat password"
              type="password"
              id="password-repeat"
              helperText="Passwords must match"
            />
            <Button
              type="submit"
              fullWidth
              disable={validPsw}
              variant="contained"
              sx={{mt: 3, mb: 2}}
              style={{backgroundColor: '#252525'}}
            >
              Sign In
            </Button>
          </Box>
        </ThemeProvider>
      </Box>
    </Container>
  );
}