import routes from './config/routesConfig';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        {routes.map((route, index) => (
          <Route key={index} {...route} />
        ))}
      </Switch>
    </Router>
  );
}

export default App;
