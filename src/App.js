import Login from 'pages/auth/Login';
import Register from 'pages/auth/Register';
import ResetPassword from 'pages/auth/ResetPassword';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <Switch>
        <Route
          exact
          path={process.env.PUBLIC_URL + '/login'}
          component={Login}
        />
        <Route
          exact
          path={process.env.PUBLIC_URL + '/register'}
          component={Register}
        />
        <Route
          exact
          path={process.env.PUBLIC_URL + '/reset-password'}
          component={ResetPassword}
        />
        <Route
          exact
          path={process.env.PUBLIC_URL + '/:username'}
          component={Profile}
        />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
