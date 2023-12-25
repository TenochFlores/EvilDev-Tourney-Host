import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios'
import { useEffect } from 'react';
import ErrorAlert from '../../helpers/ErrorAlert';
import SuccessAlert from '../../helpers/SuccessAlert';

import { useNavigate } from 'react-router-dom';

export const CardTournament = ({
  id_torneo,
  id_administrador,
  foto,
  nombre_torneo,
  reglas,
  consola,
  nombre_videojuego,
  numero_participantes,
  fecha_inicio,
  fecha_fin,
  userID,
  userType,
  limitDescripcion = 80,
  clicHandler,
}) => {
  const navigate = useNavigate();
  const [readMoreState, setReadMoreState] = React.useState(false);
  const [showJoinButtonState, setShowJoinButtonState] = React.useState(false);
  const [errorState, setErrorState] = React.useState("");
  const [successState, setSuccessState] = React.useState("");
  const [estatusParticipacion, setEstatusParticipacion] = React.useState(false);
  const [colorEstatusParticipacion, setColorEstatusParticipacion] =
    React.useState("#FF0000");

  useEffect(() => {
    setReadMoreState(getDescripcion().length > limitDescripcion ? true : false);
    // Boton de unirse
    isJoined(id_torneo, userID, userType);
  }, []);

  const getStatus = (fecha_inicio, fecha_fin) => {
    // Fecha actual
    const fechaActual = new Date();
    // Fecha inicio
    const fechaInicio = new Date(fecha_inicio);
    // Fecha fin
    const fechaFin = new Date(fecha_fin);
    // Aun no inicia el torneo
    const aunNoInicia = fechaActual < fechaInicio;
    // Ya inicio el torneo
    const yaInicio = fechaActual >= fechaInicio && fechaActual <= fechaFin;
    // Ya termino el torneo
    const yaTermino = fechaActual > fechaFin;
    if (aunNoInicia) return -1;
    if (yaInicio) return 0;
    if (yaTermino) return 1;
  };

  const getStatusParticipacion = (id_torneo, id_usuario) => {};

  const formatDate = (date) => {
    const fecha = new Date(date);

    const meses = [
      "Ene",
      "Feb",
      "Mar",
      "Abr",
      "May",
      "Jun",
      "Jul",
      "Ago",
      "Sep",
      "Oct",
      "Nov",
      "Dic",
    ];

    const day = fecha.getDate();
    const month = meses[fecha.getMonth()];
    const year = fecha.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const getDescripcion = () => {
    const descripcion = `
Videojuego: ${nombre_videojuego}
Consola: ${consola}
Participantes inscritos: ${numero_participantes}
Fecha de inicio: ${formatDate(fecha_inicio)}
Finaliza el: ${formatDate(fecha_fin)}
Reglas: ${reglas}`;

    return descripcion;
  };

  const estatus = getStatus(fecha_inicio, fecha_fin);

  const descripcion = getDescripcion();

  let colorEstatus = "#bbb";

  switch (estatus) {
    case -1:
      colorEstatus = "#56F000";
      break;
    case 0:
      colorEstatus = "#FFB302";
      break;
    case 1:
      colorEstatus = "#bbb";
      break;
  }

  function defineStatusParticipacion(idTournament, idUser, userType) {
    if (userType === 3) {
      axios
        .post("http://localhost:5000/is-joined", { idTournament, idUser })
        .then((res) => {
          const data = res.data;
          const updatedColor = data.status ? "#23C030" : "#FF0000";
          setColorEstatusParticipacion(updatedColor);
          setEstatusParticipacion(data.status);
        })
        .catch(() => {
          console.log(
            "ERROR: no se pudo obtener el estatus de participacion del usuario en el torneo"
          );
        });
    }
  }

  function isJoined(idTournament, idUser, userType) {
    if (userType === 3) {
      axios
        .post("http://localhost:5000/is-joined", { idTournament, idUser })
        .then((res) => {
          const data = res.data;
          setShowJoinButtonState(data.status === false ? true : false);
        })
        .catch(() => {
          console.log(
            "ERROR: no se pudo obtener el estatus del usuario en el torneo"
          );
        });
      return Promise.resolve(true);
    } else {
      setShowJoinButtonState(false);
    }
  }

  const leaveUserTournament = (id_torneo, id_usuario) => {
    axios
      .post("http://localhost:5000/leave", {
        idTournament: parseInt(id_torneo),
        idUser: parseInt(id_usuario),
      })
      .then((res) => {
        const data = res.data;
        const status = data.status;
        if (status) {
          setSuccessState("Has abandonado el torneo");
          setShowJoinButtonState(true);
          // Lo borramos despues de un tiempo
          setTimeout(() => {
            setSuccessState("");
          }, 5000);
        } else {
          setErrorState("No has podido al torneo");
          setShowJoinButtonState(false);
          // Lo borramos despues de un tiempo
          setTimeout(() => {
            setErrorState("");
          }, 5000);
        }
      })
      .catch((error) => {
        console.log("ERROR: el usuario no pudo abandonar el torneo");
      });
  };

  const joinUserTournament = (id_torneo, id_usuario) => {
    axios
      .post("http://localhost:5000/join", {
        idTournament: parseInt(id_torneo),
        idUser: parseInt(id_usuario),
      })
      .then((res) => {
        const data = res.data;
        const status = data.status;
        if (status) {
          setSuccessState("Te has unido al torneo");
          setShowJoinButtonState(false);
          // Lo borramos despues de un tiempo
          setTimeout(() => {
            setSuccessState("");
          }, 5000);
        } else {
          setErrorState("No has pudido unirte al torneo");
          setShowJoinButtonState(true);
          // Lo borramos despues de un tiempo
          setTimeout(() => {
            setErrorState("");
          }, 5000);
        }
      })
      .catch((error) => {
        console.log("ERROR: no se pudo unir el usuario en el torneo");
      });
  };

  const handlerJoinTournament = () => {
    // Verificar si el torneo tiene cupo
    // Registrar al participante en el torneo
    joinUserTournament(id_torneo, userID);
  };

  const handlerLeaveTournament = () => {
    leaveUserTournament(id_torneo, userID);
  };

  const handleDelete = () => {
    const response = axios.delete(
      `http://localhost:5000/api/tourney/${id_torneo}`
    );
    response
      .then(() => {
        alert("Torneo eliminado correctamente");
        clicHandler();
      })
      .catch(() => {
        alert("Ocurrió un error al eliminar el torneo");
      });
  };

  const handleEdit = () => {
    navigate(`/tourneys/update/${id_torneo}`);
  };

  const showReadMore = () => {
    setReadMoreState(!readMoreState);
  };

  const styleButtonReadMore = {
    color: "white",
    backgroundColor: "#252525",
    padding: "6px",
    textTransform: "none",
  };

  const styleButtonUnirse = {
    color: "white",
    backgroundColor: "#23C030",
    padding: "6px",
    textTransform: "none",
  };

  const styleButtonAbandonar = {
    color: "white",
    backgroundColor: "#FF0000",
    padding: "6px",
    textTransform: "none",
  };

  const styleButtonEditar = {
    color: "white",
    backgroundColor: "#0090FF",
    padding: "6px",
    textTransform: "none",
  };

  const styleButtonEliminar = {
    color: "white",
    backgroundColor: "#FF0000",
    padding: "6px",
    textTransform: "none",
  };

  const styleSpanEstatus = {
    height: "12px",
    width: "12px",
    backgroundColor: colorEstatus,
    borderRadius: "50%",
    display: "inline-block",
    marginLeft: "4px",
  };
  const styleSpanEstatusParticipacion = {
    height: "12px",
    width: "12px",
    backgroundColor: colorEstatusParticipacion,
    borderRadius: "50%",
    display: "inline-block",
    marginLeft: "4px",
  };

  const styleDescripcion = {
    whiteSpace: "pre-wrap", // Mantiene los saltos de línea
  };

  return (
    <Card sx={{ maxWidth: 345 }} style={{ borderRadius: "12px" }}>
      <CardMedia sx={{ height: 140 }} image={foto} title="foto torneo" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {nombre_torneo}
        </Typography>
        {/*ESTATUS PARTICIPACIÓN*/}
        {defineStatusParticipacion(id_torneo, userID, userType)}
        {userType === 3 && (
          <p style={{ marginLeft: "12px" }}>
            Estatus Participación
            <span style={styleSpanEstatusParticipacion}></span>
          </p>
        )}
        <p style={styleDescripcion}>
          {readMoreState
            ? descripcion.slice(0, limitDescripcion) + "..."
            : descripcion}
        </p>
      </CardContent>
      <CardActions>
        {/*READMORE*/}
        {readMoreState && descripcion.length > limitDescripcion && (
          <Button
            size="small"
            style={styleButtonReadMore}
            onClick={showReadMore}
          >
            Read More
          </Button>
        )}
        {!readMoreState && descripcion.length > limitDescripcion && (
          <Button
            size="small"
            style={styleButtonReadMore}
            onClick={showReadMore}
          >
            Read Less
          </Button>
        )}

        {/*Editar Torneo*/}
        {id_administrador === userID && userType === 2 && (
          <Button size="small" style={styleButtonEditar} onClick={handleEdit}>
            Editar
          </Button>
        )}

        {/*Eliminar Torneo*/}
        {id_administrador === userID && userType === 2 && (
          <Button
            size="small"
            style={styleButtonEliminar}
            onClick={handleDelete}
          >
            Eliminar
          </Button>
        )}

        {/*UNIRSE*/}
        {userType === 3 && showJoinButtonState && estatus === -1 && (
          <Button
            size="small"
            style={styleButtonUnirse}
            onClick={handlerJoinTournament}
          >
            Unirme
          </Button>
        )}

        {/*ABANDONAR*/}
        {userType === 3 && !showJoinButtonState && estatusParticipacion && (
          <Button
            size="small"
            style={styleButtonAbandonar}
            onClick={handlerLeaveTournament}
          >
            Abandonar
          </Button>
        )}

        {/*ESTATUS TORNEO*/}
        <p style={{ marginLeft: "12px" }}>
          Estatus Torneo<span style={styleSpanEstatus}></span>
        </p>
      </CardActions>
      {/*ERROR MESSAGE*/}
      {errorState.length > 0 && <ErrorAlert message={errorState} />}
      {/*SUCCESS MESSAGE*/}
      {successState.length > 0 && <SuccessAlert message={successState} />}
    </Card>
  );
};