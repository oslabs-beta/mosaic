import './App.css';
import {Switch, Route, Link} from 'react-router-dom';
import {GoogleSignInButton} from './components/GoogleSignInButton';

// components
import RegisterServiceForm from './components/RegisterServiceForm';

function App() {
  return (
    <div className="App">
      <p>
        <Link to="/">Home</Link>
      </p>
      <p>
        <Link to="/register-service">Register Service</Link>
      </p>
      <GoogleSignInButton />
      <Switch>
        <Route path="/register-service">
          <RegisterServiceForm />
        </Route>

        <Route path="/">
          <h1>Mosaic</h1>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
