import Footer from 'components/Footer';
import Header from 'components/Header';
import Login from 'pages/auth/Login';
import Register from 'pages/auth/Register';
import ResetPassword from 'pages/auth/ResetPassword';
import Home from 'pages/Home';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/" component={Home} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
