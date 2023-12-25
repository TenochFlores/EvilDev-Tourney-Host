import {Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material"

import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";

import {Box} from "@mui/system"

import {useAuth} from "../../components/auth/ProvideAuth";
import {useNavigate} from "react-router-dom";


export default function NavListDrawer() {
  // useAuth nos proporciona el contexto authContext del cual podremos obtener al usuario, su función de singin y singout.
  const auth = useAuth();
  const navigate = useNavigate();

    const handeVerPerfil = () => {
      navigate("/perfil-participante");
    }
    const handleCerrarSesion = () => {
      // Usamos al función de singout del usuario actual. Esta ya es proporcionada por useAuth y manejada en ProvideAuth.
      auth.signout(() => {
        // Adicionalmente indicamos que se debe redirigir al usuario a la pantalla inicial, es decir, al login.
        navigate("/");
      });
    };

  return (
    <Box sx={{width: 250}}>
      <nav>
        <List>
          <ListItem>
            <ListItemText primary="Mi perfil"/>
          </ListItem>
        </List>
      </nav>
      <Divider/>
      <List>
        <ListItem disablePadding>
          <ListItemButton component="a" onClick={handeVerPerfil}>
            <ListItemIcon>
              <PersonIcon/>
            </ListItemIcon>
            Ver perfil
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component="a" onClick={handleCerrarSesion}>
            <ListItemIcon>
              <LogoutIcon/>
            </ListItemIcon>
            Cerrar sesión
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
}