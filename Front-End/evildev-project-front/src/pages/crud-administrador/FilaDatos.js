import {Button, Grid, Typography} from "@mui/material";
import Divider from "@mui/material/Divider";
import {React} from "react";
import {useNavigate} from "react-router-dom";
import iconEditarUsuario from "../../assets/Editar_usuario_white.png";
import iconEliminarUsuario from "../../assets/Eliminar_usuario_white.png";
import { useState } from 'react';
import { useAuth } from "../../components/auth/ProvideAuth";


import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import axios from 'axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const FilaDatos = ({id, imageSrc, name, email, user, clickHandler }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const auth = useAuth();
  const tipousuario = auth?.user?.userType;
  // const tipousuario = 1; //Borrar una vez se solucione el login

  const navigate = useNavigate();

  const handleEditarAdministrador = (event) => {
    event.preventDefault();
    if(id===0){
      alert("Hubo un error al obtener el id del torneo")
    } else {
      navigate("/editar_administrador/"+id);
    }
  };

  const handleBorrarAdministrador = async () => {
    if(id > 1){
      try{
        const response = await axios.post(
          "http://localhost:5000/eliminar_administrador",
          { id: id },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("Respuesta del servidor:", response.data)
      }catch(error) {
        if (error.response && error.response.status === 401) {
          alert(error.response.data.message); // Muestra el mensaje de error
        } else {
          console.error("Error al intentar eliminar administrador:", error);
        }
      }
    }
    handleClose()
    clickHandler()
  };

  return (
    <>
      <Grid
        container
        spacing={0}
        width="80vw"
        height="10vw"
        mt={4}
        sx={{marginBottom: "-22px", marginTop: "-22px"}}
      >
        {/* Foto */}
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
          <img
            src={`data:image/png;base64,${imageSrc}`}
            alt={"Panchito"}
            width="55vw"
            height="55vw"
            style={{borderRadius: "50%"}}
          />
        </Grid>

        {/* Nombre */}
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
          <Typography variant="h7" sx={{fontWeight: "bold"}}>
            {name}
          </Typography>
          <div></div>
          <Typography variant="h7">{user}</Typography>
        </Grid>

        {/* Correo */}
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
          <Typography variant="h7">{email}</Typography>
        </Grid>

        {/* Botonoes */}
        {(id <= 1 || tipousuario !== 1) ? <></> : 
          <Grid
          item
          xs={3}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            type="button"
            style={{
              backgroundColor: "blue",
              display: "flex",
              alignItems: "center", // Centra verticalmente
              justifyContent: "center", // Centra horizontalmente
            }}
            sx={{marginRight: 1}}
            onClick={handleEditarAdministrador}
          >
            <img
              src={iconEditarUsuario}
              alt="Icono Registrar Administrador"
              style={{width: "20px"}}
            />
          </Button>

          <Button
            variant="contained"
            type="button"
            style={{
              backgroundColor: "red",
              display: "flex",
              alignItems: "center", // Centra verticalmente
              justifyContent: "center", // Centra horizontalmente
            }}
            sx={{marginRight: 1}}
            onClick={handleOpen}
          >
            <img
              src={iconEliminarUsuario}
              alt="Icono Eliminar Administrador"
              style={{width: "20px"}}
            />
          </Button>
        </Grid>
        }
      </Grid>

      {/* Linea */}
      <Divider
        style={{width: "80vw", borderWidth: "3px", borderColor: "#A8A8A8"}}
      />
      {/* Modal de Confirmacion de Eliminar Administrador */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ textAlign: 'center', m: 1 }}
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Confirmación de Eliminación
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            ¿Segur@ que quieres eliminar al administrador {name}?
          </Typography>
          <br></br>
          <div>
            <Button color="primary" onClick={handleClose}>Cancelar</Button>
            <Button variant="contained" color="error" onClick={handleBorrarAdministrador}>Confirmar</Button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default FilaDatos;
