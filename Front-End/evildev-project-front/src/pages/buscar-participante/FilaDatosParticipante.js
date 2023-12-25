import {Button, Grid, Typography} from "@mui/material";
import Divider from "@mui/material/Divider";
import {React} from "react";
import {useNavigate} from "react-router-dom";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const FilaDatosParticipante = ({
                                 imageSrc = "",
                                 name = "",
                                 email = "",
                                 user = "",
                               }) => {
  const navigate = useNavigate();

  const handleEditarAdministrador = (event) => {
    event.preventDefault();
    //navigate("/");
  };

  const handleBorrarAdministrador = (event) => {
    event.preventDefault();
    //navigate("/");
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
              width: "10vw"
            }}
            sx={{marginRight: 1}}
            onClick={handleEditarAdministrador}
          >
            <PersonAddIcon/>
          </Button>
        </Grid>
      </Grid>

      {/* Linea */}
      <Divider
        style={{width: "80vw", borderWidth: "3px", borderColor: "#A8A8A8"}}
      />
    </>
  );
};

export default FilaDatosParticipante;
