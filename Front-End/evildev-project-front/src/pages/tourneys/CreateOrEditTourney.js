import * as React from "react";
import {useEffect, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import {Alert, Snackbar} from "@mui/material";
import {useAuth} from "../../components/auth/ProvideAuth";
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import moment from 'moment'

export default function CreateOrEditTourney() {
    const location = useLocation();
    const {tourneyId} = useParams();
    const navigate = useNavigate();
    const auth = useAuth();

    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState('warning');
    const [snackMessage, setSnackMessage] = useState('');

    const [tourney, setTourney] = useState({});
    const [tourneyPhoto, setTourneyPhoto] = useState(null);
    const [tourneyParticipants, setTourneyParticipants] = useState(1);
    const [tourneyConsole, setTourneyConsole] = useState(moment());
    const [tourneyName, setTourneyName] = useState(moment());
    const [tourneyRules, setTourneyRules] = useState(moment());
    const [tourneyGameName, setTourneyGameName] = useState(moment());
    const [tourneyStartDate, setTourneyStartDate] = useState(moment());
    const [tourneyEndDate, setTourneyEndDate] = useState(moment());

    const defaultImagePath = "../../assets/Participante_white.png"; // Ruta de la imagen por defecto
    let isView = location.pathname.search('view') > -1;

    function getTourney(tourneyId) {
        if (!tourneyId) return;

        axios
          .get(`http://localhost:5000/api/tourney/${tourneyId}`)
          .then((res) => {
            setTourney(res.data);
          })
          .catch(() => {
            setSeverity("error");
            setSnackMessage(
              "Something went wrong while fetching the tourney info."
            );
            setOpen(true);
            isView = true;
          });
    }

    useEffect(() => getTourney(tourneyId), [])
    useEffect(() => {
        setTourneyName(tourney?.tourneyName ?? '')
        setTourneyRules(tourney?.tourneyRules ?? '')
        setTourneyParticipants(Number(tourney?.tourneyParticipants))
        setTourneyConsole(tourney?.tourneyConsole ?? '')
        setTourneyGameName(tourney?.tourneyGameName ?? '')
        setTourneyStartDate(moment.utc(tourney?.tourneyStartDate));
        setTourneyEndDate(moment.utc(tourney?.tourneyEndDate));
    }, [tourney]);

    const handleSubmit = (event) => {
        event.preventDefault();
        let photo;
        if (!tourneyPhoto) {

            const confirmNoImage = window.confirm(
                "¿Está seguro de continuar sin subir una imagen?"
            );

            if (confirmNoImage) {
                fetch(defaultImagePath)
                    .then((res) => res.blob())
                    .then((blob) => {
                        console.log(blob)
                        photo = new Blob([blob])
                    })
                    .catch((error) => {
                        console.error("Error al cargar la imagen predeterminada:", error);
                    });
            } else {
                return;
            }
        } else {
            photo = new Blob([tourneyPhoto]);
        }

        const data = new FormData(event.currentTarget);
        const newTourney = {
          tourneyId: tourney?.tourneyId ?? -1,
          tourneyAdminId: auth?.user?.userID ?? 1,
          tourneyName: tourneyName,
          tourneyRules: tourneyRules,
          tourneyConsole: tourneyConsole,
          tourneyGameName: tourneyGameName,
          tourneyParticipantsNumber: tourneyParticipants,
          tourneyStartDate: tourneyStartDate,
          tourneyEndDate: tourneyEndDate,
          tourneyPhoto: photo,
        };

        axios
          .post("http://localhost:5000/api/tourney/", newTourney)
          .then((res) => {
            if (res.status === 200) {
              setSeverity("success");
              setSnackMessage("Tourney created succesfully!");
              setOpen(true);
              setTimeout(() => {
                navigate("/tourneys");
              }, 2000);
            }
          })
          .catch((err) => {
            setSeverity("warning");
            setSnackMessage("Something went wrong...");
            setOpen(true);
          });
    };

    const handleClose = (event) => {
        setOpen(false);
    };

    return (
        <Container>
            <Box component="form" onSubmit={handleSubmit} sx={{mt: 1}}>
                <TextField margin='dense'
                           type='file'
                           id='tourneyPhoto'
                           helperText='Tourney Photo'
                           name='tourneyPhoto'
                           disabled={isView}
                           onChange={(event) => {
                               setTourneyPhoto(event.target.value)
                           }}
                           value={tourneyPhoto}
                />
                <TextField margin='normal'
                           required fullWidth
                           id='tourneyName'
                           label='Tourney Name'
                           name='tourneyName'
                           disabled={isView}
                           onChange={(event) => {
                               setTourneyName(event.target.value)
                           }}
                           value={tourneyName}
                />
                <TextField margin='normal'
                           required fullWidth
                           id='tourneyRules'
                           label='Tourney Rules'
                           name='tourneyRules'
                           disabled={isView}
                           onChange={(event) => {
                               setTourneyRules(event.target.value)
                           }}
                           value={tourneyRules}
                />
                <TextField margin='normal'
                           required fullWidth
                           id='tourneyConsole'
                           label='Console'
                           name='tourneyConsole'
                           disabled={isView}
                           onChange={(event) => {
                               setTourneyConsole(event.target.value)
                           }}
                           value={tourneyConsole}
                />
                <TextField margin='normal'
                           required fullWidth
                           id='tourneyGameName'
                           label='Tourney Game Name'
                           name='tourneyGameName'
                           disabled={isView}
                           onChange={(event) => {
                               setTourneyGameName(event.target.value)
                           }}
                           value={tourneyGameName}
                />
                <TextField margin='normal'
                           required fullWidth
                           type='number'
                           id='tourneyParticipantsNumber'
                           helperText='# of Participants'
                           name='tourneyParticipantsNumber'
                           disabled={isView}
                           onChange={(event) => {
                               setTourneyParticipants(event.target.value)
                           }}
                           value={tourneyParticipants}
                />
                <DatePicker label='Fecha de Inicio' disablePast
                            onChange={(newValue) => setTourneyStartDate(newValue)}
                            disabled={isView} value={tourneyStartDate}
                />
                <br/>
                <br/>
                <DatePicker label='Fecha de Fin' minDate={tourneyStartDate}
                            onChange={(newValue) => setTourneyEndDate(newValue)}
                            disabled={isView} value={tourneyEndDate}
                />

                <Button
                    type="submit"
                    fullWidth
                    disabled={isView}
                    variant="contained"
                    sx={{mt: 3, mb: 2}}
                    style={{backgroundColor: '#252525'}}
                >
                    Submit
                </Button>
            </Box>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={severity} sx={{width: '100%'}}>
                    {snackMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
}
