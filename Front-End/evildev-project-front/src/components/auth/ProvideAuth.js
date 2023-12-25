import {createContext, useContext, useState} from "react";
import axios from "axios";

export const authContext = createContext();

function ProvideAuth({children}) {
  const auth = useProvideAuth();
  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  );
}

function useAuth() {
  return useContext(authContext);
}

function useProvideAuth() {
  const [user, setUser] = useState(null);

  async function signin(email, password, tipo_cuenta) {
    let correctLogin = false;
    await axios
      .post("http://localhost:5000/api/auth/login", {
        email,
        password,
        tipo_cuenta,
      })
      .then((res) => {
        const data = res.data;
        const userData = {
          userID: data.userID,
          email: data.userLogin,
          userType: data.userStatus,
        };
        setUser(userData);
        correctLogin = true;
      })
      .catch((err) => {
        correctLogin = false;
      });
    return Promise.resolve(correctLogin);
  }

  function signout(cb) {
    setUser(null);
    cb()
  };

  return {
    user,
    signin,
    signout
  };
}

export {useAuth, ProvideAuth, useProvideAuth}
