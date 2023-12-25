import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';
import {useAuth} from "../../components/auth/ProvideAuth";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export default function AlertDialog() {

  let auth = useAuth();
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose= () => {
    setOpen(false);
  }

  const handleEliminar = () => {
    eliminarPerfil(auth.user.userID)
  };

  const eliminarPerfil = (idParticipante) => {
    axios
      .post("http://localhost:5000/eliminar-perfil", { idParticipante })
      .then((res) => {
        if (res.status === 200) {
          auth.signout(() => {
            // Adicionalmente indicamos que se debe redirigir al usuario a la pantalla inicial, es decir, al login.
            navigate("/");
          });
        }
      })
      .catch(() => {
        console.log("ERROR: no se pudo eliminar el perfil");
      });
    setOpen(false)
  }

  const theme = createTheme({
    palette: {
      red: {
        main: '#DA3633',
        light: '#fc5956',
        dark: '#9c2a28',
        contrastText: '#FFF',
      },
    },
  });

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen} endIcon={<DeleteIcon/>}>
        Eliminar Perfil
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Eliminar Perfil"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Estás completamente seguro de querer eliminar tu perfil? Esta acción
            no se puede deshacer.
          </DialogContentText>
        </DialogContent>
        <ThemeProvider theme={theme}>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button variant="contained" onClick={handleEliminar} color='red' endIcon={<DeleteIcon/>} autoFocus>
              Eliminar
            </Button>
          </DialogActions>
        </ThemeProvider>
      </Dialog>
    </React.Fragment>
  );
}
