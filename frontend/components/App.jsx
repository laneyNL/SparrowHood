import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom'
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import LoginContainer from './session_form/login_form_container';
import SignUpContainer from './session_form/signup_form_container'
import Splash from './splash';
import PortfolioContainer from './portfolio/portfolio_container'
import { connect } from 'react-redux';
import AssetShowContainter from './asset_detail/asset_show_container';

const App = ({loggedIn}) => (
  <div id='App'>
      <Switch>
        <AuthRoute path='/signup' component={SignUpContainer} />
        <AuthRoute path='/login' component={LoginContainer} />
        <ProtectedRoute path='/assets/:assetSymbol' component={AssetShowContainter} />
        {(loggedIn) ?
          <ProtectedRoute exact path='/' component={PortfolioContainer} /> :
          <Route exact path='/' component={Splash} />}
        <Redirect to='/' />
      </Switch>
  </div>
)

const mapStateToProps = state => (
  { loggedIn: Boolean(state.session.id) }
);

export default connect(mapStateToProps)(App);