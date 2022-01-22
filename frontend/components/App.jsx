import React from 'react';
import { Route, Link } from 'react-router-dom'
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import LoginContainer from './session_form/login_form_container';
import SignUpContainer from './session_form/signup_form_container'
import Splash from './splash';
import Portfolio from './portfolio/portfolio'

const App = () => (
  <div>
    <header>
      <Link to='/' >SparrowHood</Link>
    </header>
    <div>
      <AuthRoute path='/signup' component={SignUpContainer} />
      <AuthRoute path='/login' component={LoginContainer} />
      <AuthRoute exact path='/' component={Splash} />
      <ProtectedRoute exact path='/' component={Portfolio}/>
    </div>
  </div>
)

export default App;