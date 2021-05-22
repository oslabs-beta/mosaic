import './App.css';
import {Switch, Route, Link} from 'react-router-dom';

// components
import RegisterServiceForm from './components/RegisterServiceForm';

function App() {
  const loggedIn = true;
  return (
    <div className="App">
      {!loggedIn ? (
        <h1>Landing Page</h1>
      ) : (
        <div className="dashboardContainer">
          <p>
            <Link to="/">Home</Link>
          </p>
          <p>
            <Link to="/register-service">Register Service</Link>
          </p>

          <Switch>
            <Route path="/register-service">
              <RegisterServiceForm />
            </Route>

            <Route path="/">
              <h1>Dashboard Home</h1>
            </Route>
          </Switch>
        </div>
      )}
    </div>
  );
}

export default App;
