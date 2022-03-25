import React, { useState, useEffect } from 'react';
import MainPage from './pages/MainPage';
import Login from './pages/Login';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import { getTokenFromUrl } from './spotify/Spotify';


function App() {
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    const hash = getTokenFromUrl();
    console.log(hash);
    window.location.hash = "";
    const token = hash.access_token;

    if (token) {
      setToken(token)
    }

  }, []);

  return (
    <>
      { token ? <MainPage/> : <Login/> } 
    </>
  );
}



export default App;
