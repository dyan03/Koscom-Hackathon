import React from 'react';
import { BrowserRouter, } from "react-router-dom";

import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

// import Button from '@material-ui/core/Button'
// import Pricing from './templates/Pricing'

import RootRouter from './routers/RootRouter'
import MyNavbar from './templates/MyNavbar'


function App() {
  return (
    <BrowserRouter>
      <MyNavbar/>
    </BrowserRouter>
  )
}

export default App;
