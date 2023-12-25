import PantallaInicioAdmin from "../../pages/PantallasInicio/PantallaInicioAdmin";
import PantallaInicioSuperAdmin from "../../pages/PantallasInicio/PantallaInicioSuperAdmin";
import PantallaInicioParticipante from "../../pages/PantallasInicio/PantallaInicioParticipante";
import Login from "../../pages/login/Login";
import BuscarTorneo from "../../pages/search-tournament/BuscarTorneo";

class View {
  view;

  getView() {
    return this.view;
  }
}

class SuperAdmin extends View {
  constructor() {
    super();
    this.view = PantallaInicioSuperAdmin;
  }
}

class Participantes extends View {
  constructor() {
    super();
    this.view = PantallaInicioParticipante;
  }
}

class Admin extends View {
  constructor() {
    super();
    this.view = PantallaInicioAdmin;
  }
}

class LoginView extends View {
  constructor() {
    super();
    this.view = Login;
  }
}

class BuscarTorneoView extends View {
  constructor() {
    super();
    this.view = BuscarTorneo;
  }
}


class HomeFactory {
  static createHome(userType) {
    switch (userType) {
      case 1:
        return new SuperAdmin()
      case 2:
        return new Admin()
      case 3:
        return new Participantes()
      default:
        return new LoginView()
    }
  }
}

export default HomeFactory