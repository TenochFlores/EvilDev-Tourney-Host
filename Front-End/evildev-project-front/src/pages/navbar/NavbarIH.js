import {AppBar, Box, Drawer, IconButton, Toolbar, Typography} from "@mui/material";
import {useState} from "react";
import NavListDrawer from "./NavListDrawer";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import logo from "../../assets/logo-bnd.png";
import {useNavigate} from "react-router-dom"; // Ruta relativa a la ubicación actual del archivo

export default function NavbarIH() {
  const [openUserNavbar, setOpenUserNavbar] = useState(false);
  const navigate = useNavigate();

  return (<>
    <AppBar position="sticky" sx={{backgroundColor: "#252525"}}>
      <Toolbar>
        <Box
          onClick={() => {
            navigate('/home')
          }}>
          <img
            src={logo}
            alt="Your Icon"
            style={{width: "5%", height: "5%", marginRight: "1%"}}
          />
          <Typography variant="h6">Evil Hub Tourney</Typography>
        </Box>
        <Box sx={{flexGrow: 1}}/>{" "}
        <IconButton
          color="inherit"
          size="large"
          onClick={() => setOpenUserNavbar(true)}
        >
          <AccountCircleIcon/>
        </IconButton>
      </Toolbar>
    </AppBar>

    <Drawer
      open={openUserNavbar}
      anchor="right"
      onClose={() => setOpenUserNavbar(false)}
    >
      <NavListDrawer/>
    </Drawer>
  </>);
}
