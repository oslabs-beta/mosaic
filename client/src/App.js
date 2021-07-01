import './App.css';
import {Switch, Route, Link} from 'react-router-dom';
import {User, Project} from './providers';
import {GoogleSignInButton} from './components/GoogleSignInButton';
import {UserOutlined} from '@ant-design/icons';

// components
import ServiceDetailsForm from './components/ServiceDetailsForm';
import {Layout, Menu, Avatar} from 'antd';
import SideMenu from './components/Dashboard/SideMenu';
import Projects from './components/Dashboard/Projects';
import CustomEvents from './components/Dashboard/CustomEvents';

// pages
import ProjectDetails from './pages/ProjectDetails';
import ServiceDetails from './pages/ServiceDetails';

const {Header, Content} = Layout;

function App() {
  const loggedIn = true;

  return (
    <div className="App">
      <User.Provider>
        <Project.Provider>
          {!loggedIn ? (
            <h1> Landing page</h1>
          ) : (
            <div>
              <Header className="header">
                <div className="logo" />
                <Menu theme="dark" mode="horizontal">
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
                        <Route path="/register-service">
                          <ServiceDetailsForm />
                        </Route>
                        <Route path="/edit-service/:id">
                          <ServiceDetailsForm />
                        </Route>
                        <Route path="/service/:id">
                          <ServiceDetails />
                        </Route>
                        <Route path="/custom-events">
                          <CustomEvents />
                        </Route>
                        <Route path="/settings">
                          <h1>Settings</h1>
                        </Route>
                        <Route path="/">
                          <Projects />
                        </Route>
                      </Switch>
                    </Content>
                  </Layout>
                </Layout>
              </Layout>
              <GoogleSignInButton />
            </div>
          )}
        </Project.Provider>
      </User.Provider>
    </div>
  );
}

export default App;
