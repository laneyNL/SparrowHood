import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom'
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import LoginContainer from './session_form/login_form_container';
import SignUpContainer from './session_form/signup_form_container'
import Splash from './splash';
import PortfolioContainer from './portfolio/portfolio_container'
import { connect } from 'react-redux';

const App = ({loggedIn}) => (
  <div>
    <div>
      <Switch>
        <AuthRoute path='/signup' component={SignUpContainer} />
        {/* <AuthRoute path='/login' component={LoginContainer} />

        {(loggedIn) ?
          <Route exact path='/' component={PortfolioContainer} /> :
          <Route exact path='/' component={Splash} />}
        <Redirect to='/' /> */}
      </Switch>

    </div>
  </div>
)

const mapStateToProps = state => (
  { loggedIn: Boolean(state.session.id) }
);

export default connect(mapStateToProps)(App);