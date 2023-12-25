import './App.css';
import {Outlet, useLocation} from "react-router-dom";
import {useAuth} from "./components/auth/ProvideAuth";
import React, {createElement, useMemo, useEffect, useState} from "react";
import HomeFactory from "./components/homeFactory/HomeFactory";
import NavbarIH from "./pages/navbar/NavbarIH";
import Login from "./pages/login/Login";



function App() {
  const auth = useAuth();
  const ViewComponent = useMemo(() => 
    auth.user === null 
      ? (<><Login/></>)
      : (<><Outlet/></>)
  , auth.user)

  return (
    <div>
      {ViewComponent}
    </div>
  );
}

export default App;
