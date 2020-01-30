import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';


// import HeadTabs from './HeaderTabs';
import Main from '../pages/Main';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import FundInfo from '../pages/FundInfo';
import RegisterFund from '../pages/RegisterFund';

function RootRouter() {
  return (
    <Fragment>
      <Router>
        <Route exact path='/' component={Main} />
        <Route
          exact
          path='/signIn'
          component={SignIn}
        />
        <Route
          exact
          path='/signUp'
          component={SignUp}
        />
        <Route
          exact
          path='/fundInfo'
          component={FundInfo}
        />
        <Route
          exact
          path='/registerFund'
          component={RegisterFund}
        />
      </Router>
    </Fragment>
  );
}

export default RootRouter; 