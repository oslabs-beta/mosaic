import './App.css';
import {Switch, Route, Link} from 'react-router-dom';

// components
import RegisterServiceForm from './components/RegisterServiceForm';
import Dashboard from './pages/Dashboard';
import {Layout, Menu} from 'antd';
const {Header} = Layout;

function App() {
  return (
    <div className="App">
      <Header className="header">
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['3']}>
          <Menu.Item key="1">
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/register-service">Register Service</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/dashboard"> Dashboard </Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Switch>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
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
