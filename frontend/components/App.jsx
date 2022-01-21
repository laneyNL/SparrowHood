import React from 'react';
import { Route, Link } from 'react-router-dom'
import { AuthRoute, ProtectedRoute } from '../util/route_util';

const App = () => (
  <div>
    <header>
      <Link to='/' >SparrowHood</Link>
    </header>
    <div>
      Inside App
    </div>
  </div>
)

export default App;