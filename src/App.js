import React, { Component } from 'react';
import { BrowserRouter, } from "react-router-dom";

import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

import { createStore } from 'redux';
import rootReducer from './store';
import { Provider } from 'react-redux' ;

// import Button from '@material-ui/core/Button'
// import Pricing from './templates/Pricing'

import RootRouter from './routers/RootRouter'
import MyNavbar from './templates/MyNavbar'

import { connect } from 'react-redux';
import { logIn, regEmail } from './store/loginState';


class App extends Component {
  render() {
      console.log("app", this.props.logedIn)
      return (
      <BrowserRouter>
        <MyNavbar logedIn={this.props.logedIn}/>
      </BrowserRouter>
    )
  }
}

const mapStateToProps = state => ({  //2
  logedIn : state.loginState.logedIn,
  upperUserEmail : state.loginState.userEmail,
});

const mapDispatchToProps = dispatch => {
  return {
    logIn : () => dispatch(logIn()),
    regEmail : email => dispatch(regEmail(email)),
  }
};

export default connect(
  mapStateToProps, mapDispatchToProps
)(App);
