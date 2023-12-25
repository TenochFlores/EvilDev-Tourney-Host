import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Paper from '@mui/material/Paper';
import {
  Alert,
  ButtonGroup,
  Fab,
  IconButton,
  Skeleton,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import React, {useState, useEffect} from "react";
import axios from "axios";
import {useAuth} from "../../components/auth/ProvideAuth";
import {useNavigate} from "react-router-dom";

import { format } from "date-fns";

import NavbarIH from "../navbar/NavbarIH";

import defaultImage from "../../assets/Torneo_black_foto.png";

const defaultTourneyImage = defaultImage;

export default function Tourneys() {
  const auth = useAuth();
  const [snackMessage, setSnackMessage] = useState('')
  const [tourneys, setTourneys] = useState([])
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate()

  // const tipousuario = auth.user.userType;
  const tipousuario = 3
  
  useEffect(() => {getTourneys()}, [])

  function getTourneys() {
  axios
    .get("http://localhost:5000/api/tourney/")
    .then((res) => {
      setTourneys(res.data);
    })
    .catch(() => {
      setSnackMessage("Couldn't get tourneys.");
      setOpen(true);
    });
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (id) => {
    const response = axios.delete(
      `http://localhost:5000/api/tourney/${id}`
    );
    response
      .then(() => {
        setSnackMessage('Tourney deleted succesfully!');
        setOpen(true);
        getTourneys();
      })
      .catch(() => {
        setSnackMessage('Something went wrong...');
        setOpen(true)
      })
  }

  
  function formatFechas(fecha) {
    if (!fecha) {
      return ""; // O un valor predeterminado en caso de que fechaInicio sea null o undefined
    }

    return format(new Date(fecha), "dd-MM-yyyy");
  }



  return (
    <>
      <NavbarIH />
      <Container
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <CssBaseline />
        <Grid container spacing={2}>
          <Grid xs={8}>
            <h1>Torneos</h1>
          </Grid>

          <Grid xs={4}>
            <Fab
              color="primary"
              aria-label="add"
              onClick={() => navigate("/tourneys/add")}
            >
              <AddIcon />
            </Fab>
          </Grid>

          <Grid xs={12}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell align="center">Foto</TableCell>
                    <TableCell align="center">Nombre Torneo</TableCell>
                    <TableCell align="center">Reglas</TableCell>
                    <TableCell align="center">Nombre Videojuego</TableCell>
                    <TableCell align="center">Consola</TableCell>
                    <TableCell align="center"># Participantes</TableCell>
                    <TableCell align="center">Fecha inicio</TableCell>
                    <TableCell align="center">Fecha fin</TableCell>
                    {tipousuario === 3 && ( // Si entra un participante se muestra el status participacion
                      <TableCell align="center">Status Participación</TableCell>
                    )}
                    {tipousuario !== 1 && ( // Solo el superadmin no podrá ver las acciones
                      <TableCell align="center">Acciones</TableCell>
                    )}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {!tourneys ? (
                    <TableRowsLoader rowsNum={10} />
                  ) : (
                    tourneys?.map((row) => (
                      <TableRow key={row.torneo_id}>
                        <TableCell>{row.torneo_id}</TableCell>
                        <TableCell component="th" scope="row" align="center">
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
                            {row.foto ? (
                              <img
                                src={`data:image/png;base64,${row.foto}`}
                                alt={"Panchito"}
                                width="55vw"
                                height="55vw"
                                style={{ borderRadius: "50%" }}
                              />
                            ) : (
                              <img
                                src={defaultTourneyImage}
                                alt="Imagen por defecto"
                                width="55vw"
                                height="55vw"
                                style={{ borderRadius: "50%" }}
                              />
                            )}
                          </Grid>
                        </TableCell>

                        <TableCell component="th" scope="row" align="center">
                          {row.nombre_torneo}
                        </TableCell>
                        <TableCell align="center">{row.reglas}</TableCell>
                        <TableCell align="center">
                          {row.nombre_videojuego}
                        </TableCell>
                        <TableCell align="center">{row.console}</TableCell>
                        <TableCell align="center">
                          {row.numero_participantes}
                        </TableCell>
                        <TableCell align="center">
                          {formatFechas(row.fecha_inicio)}
                        </TableCell>
                        <TableCell align="center">
                          {formatFechas(row.fecha_fin)}
                        </TableCell>
                        {tipousuario === 3 && (
                          <TableCell align="center">{row.console}</TableCell>
                        )}
                        {tipousuario !== 1 && (
                          <TableCell align="center">
                            <ButtonGroup
                              variant="outlined"
                              aria-label="outlined button group"
                            >
                              {tipousuario !== 3 && (
                                <IconButton
                                  onClick={() =>
                                    navigate(
                                      `/tourneys/update/${row.torneo_id}`
                                    )
                                  }
                                >
                                  <EditIcon />
                                </IconButton>
                              )}
                              {tipousuario === 2 && (
                                <IconButton
                                  color="error"
                                  onClick={() => handleDelete(row.torneo_id)}
                                >
                                  <DeleteIcon />
                                </IconButton>
                              )}
                              {tipousuario === 3 && (
                                <IconButton color="primary">Unirse</IconButton>
                              )}
                            </ButtonGroup>
                          </TableCell>
                        )}
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Container>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {snackMessage}
        </Alert>
      </Snackbar>
    </>
  );
}

const TableRowsLoader = ({rowsNum}) => {
  return [...Array(rowsNum)].map((row, index) => (
    <TableRow key={index}>
      <TableCell>
        <Skeleton animation="wave" variant="text"/>
      </TableCell>
      <TableCell component="th" scope="row" align="center">
        <Skeleton animation="wave" variant="text"/>
      </TableCell>
      <TableCell align="center">
        <Skeleton animation="wave" variant="text"/>
      </TableCell>
      <TableCell align="center">
        <Skeleton animation="wave" variant="text"/>
      </TableCell>
      <TableCell align="center">
        <Skeleton animation="wave" variant="text"/>
      </TableCell>
    </TableRow>
  ));
};
