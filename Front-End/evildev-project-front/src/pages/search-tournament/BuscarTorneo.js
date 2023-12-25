import React, { useEffect, useState, useCallback } from "react";
import {CardTournament} from '../../components/elements/CardTournament'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Container , Fab} from '@mui/material';
import {useAuth} from "../../components/auth/ProvideAuth";
import axios from 'axios';
import default_tournament_image from '../../assets/default_tournament.jpg'
import AddIcon from "@mui/icons-material/Add";
import NavbarIH from "../navbar/NavbarIH";
import { useNavigate } from 'react-router-dom';

export default function BuscarTorneo() {

    const [torneosState, setTorneosState] = useState([])
    const [torneosEncontradosState, setTorneosEncontradosState] = useState([])
    const [userState, setUserState] = useState({})

    let auth = useAuth()

    useEffect(() => {
        getTorneos()   
        setUser()         
    }, [])

    const deleteTorneo = useCallback(() => {
      getTorneos();
    }, []);

    function setUser() {
        if (auth){
            setUserState(auth.user)
        }  
    }

    function getTorneos() {
        axios
          .post("http://localhost:5000/get-tournaments")
          .then((res) => {
            const data = res.data;
            setTorneosState(data.data);
            setTorneosEncontradosState(data.data);
          })
          .catch(() => {
            console.log("ERROR: no se pudo obtener los torneos");
          });
        return Promise.resolve(true)
    }

  const buscarTorneo = (e) => {
    e.preventDefault()
    const target = e.target
    const texto = target.busqueda.value

    let torneos_encontrados = torneosState.filter(torneo => {
      return torneo.nombre_torneo.toLowerCase().includes(texto.toLowerCase())
    })

    setTorneosEncontradosState(torneos_encontrados)
  }

  const mostrarTodosLosTorneos = () => {
    setTorneosEncontradosState([].concat(torneosState))
  }

  const estiloBoton = {
    color: 'white',
    backgroundColor: '#252525',
    padding: '8px',
    border: 'none',
    borderRadius: '4px',
    margin: '4px',
    cursor: 'pointer'
  }

  const estiloBarraBusqueda = {
    border: 'none',
    backgroundColor: '#EBEBEB',
    padding: '8px',
    margin: '4px',
    borderRadius: '6px',
    width: '30%'
  }

  const estiloBotonTodosLosTorneos = {
    color: 'white',
    backgroundColor: '#2DCCFF',
    padding: '8px',
    border: 'none',
    borderRadius: '4px',
    margin: '4px',
    cursor: 'pointer'
  }

  const navigate = useNavigate();

  return (
    <>
      <NavbarIH />
      <Container>
        <h1>Torneos</h1>
        <Fab
          color="primary"
          aria-label="add"
          onClick={() => navigate("/tourneys/add")}
        >
          <AddIcon />
        </Fab>
        <form onSubmit={buscarTorneo} style={{ padding: "12px" }}>
          <input
            name="busqueda"
            type="text"
            placeholder="Search"
            style={estiloBarraBusqueda}
          />
          <input type="submit" style={estiloBoton} value="Buscar" />
        </form>
        <button
          style={estiloBotonTodosLosTorneos}
          onClick={mostrarTodosLosTorneos}
        >
          Todos los torneos
        </button>
        <h3 style={{ color: "#9E9E9E" }}>
          Encuentra y participa en los torneos más emocionantes para ti
        </h3>
      </Container>
      <Container>
        {torneosEncontradosState.length > 0 && (
          <Box sx={{ flexGrow: 1 }}>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              {torneosEncontradosState.map((torneo) => (
                <Grid item xs={2} sm={4} md={4} key={torneo.id_torneo}>
                  <CardTournament
                    id_torneo={torneo.id_torneo}
                    id_administrador={torneo.id_administrador}
                    foto={
                      torneo.foto !== null
                        ? torneo.foto
                        : default_tournament_image
                    }
                    nombre_torneo={torneo.nombre_torneo}
                    reglas={torneo.reglas}
                    consola={torneo.consola}
                    nombre_videojuego={torneo.nombre_videojuego}
                    numero_participantes={torneo.numero_participantes}
                    fecha_inicio={torneo.fecha_inicio}
                    fecha_fin={torneo.fecha_fin}
                    userID={userState ? userState.userID : -1}
                    userType={userState ? userState.userType : -1}
                    clicHandler={deleteTorneo}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
        {torneosEncontradosState.length === 0 && (
          <h1>No hay torneos coincidentes con la busqueda</h1>
        )}
      </Container>
    </>
  );
}
