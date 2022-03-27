import React, { useState, useEffect } from 'react';
import MainPage from './pages/MainPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import {BrowserRouter, Switch, Route} from "react-router-dom";


function App() {

  return (
    <>
    <BrowserRouter>
      <Switch>
        <Route path={"/signup"}>
          <Signup />
        </Route>
        <Route path={"/login"}>
          <Login />
        </Route>
        <Route path={"/"}>
          <MainPage />
        </Route>
      </Switch>
    </BrowserRouter>
      
      
    </>
  );
}



export default App;
