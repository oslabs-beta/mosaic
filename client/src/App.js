import './App.css';
import {Switch, Route, Link} from 'react-router-dom';
import User from './components/providers/User';
import {GoogleSignInButton} from './components/GoogleSignInButton';
import {UserOutlined} from '@ant-design/icons';

// components
import RegisterServiceForm from './components/RegisterServiceForm';
import {Layout, Menu, Avatar} from 'antd';
import SideMenu from './components/Dashboard/SideMenu';
import Projects from './components/Dashboard/Projects';
import ProjectDetails from './components/Dashboard/ProjectDetails';
import CustomEvents from './components/Dashboard/CustomEvents';
const {Header, Content} = Layout;

function App() {
  const loggedIn = true;

  return (
    <div className="App">
      <User.Provider>
        {!loggedIn ? (
          <h1> Landing page</h1>
        ) : (
          <div>
            <Header className="header">
              <div className="logo" />
              <Menu theme="dark" mode="horizontal">
                <Menu.Item key="1">
                  <Link to="/">Home</Link>
                </Menu.Item>
                <Menu.Item key="2">
                  <Link to="/register-service">Register Service</Link>
                </Menu.Item>
                <Menu.Item key="3">
                  <Link to="/dashboard"> Dashboard </Link>
                </Menu.Item>
                <Menu.Item key="4" style={{position: 'absolute', right: 88}}>
                  <Link to="/user-settings">Welcome Back, Carlos</Link>
                </Menu.Item>
                <Link to="/user-settings">
                  <Avatar
                    shape="square"
                    size={64}
                    icon={<UserOutlined />}
                    style={{position: 'absolute', right: 24}}
                  />
                </Link>
              </Menu>
            </Header>

            <Layout>
              <SideMenu />
              <Layout>
                <Layout style={{padding: '0 24px 24px'}}>
                  <Content
                    className="site-layout-background"
                    style={{
                      padding: 24,
                      marginTop: 24,
                      minHeight: 280,
                    }}>
                    <Switch>
                      <Route path="/dashboard/project-details/:id">
                        <ProjectDetails />
                      </Route>
                      <Route path="/dashboard">
                        <Projects />
                      </Route>
                      <Route path="/register-service">
                        <RegisterServiceForm />
                      </Route>
                      <Route path="/custom-events">
                        <CustomEvents />
                      </Route>
                      <Route path="/">
                        <h1>Mosaic</h1>
                      </Route>
                    </Switch>
                  </Content>
                </Layout>
              </Layout>
            </Layout>
            <GoogleSignInButton />
          </div>
        )}
      </User.Provider>
    </div>
  );
}

export default App;
