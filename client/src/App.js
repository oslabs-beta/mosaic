import './App.css';
import {Switch, Route, Link} from 'react-router-dom';

// components
import RegisterServiceForm from './components/RegisterServiceForm';
import {Layout, Menu} from 'antd';
import SideMenu from './components/Dashboard/SideMenu';
import Projects from './components/Dashboard/Projects';
const {Header, Content} = Layout;

function App() {
  const loggedIn = true;

  return (
    <div className="App">
      {!loggedIn ? (
        <Switch>
          <Route path="/">
            <h1> Landing page</h1>
          </Route>
        </Switch>
      ) : (
        <div className="dashboardContainer">
          <Header className="header">
            <div className="logo" />
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['3']}>
              <Menu.Item key="3">
                <Link to="/"> Dashboard Home</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/register-service">Register Service</Link>
              </Menu.Item>
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
                    {/* <Route path="/dashboard">
                      <Projects />
                    </Route> */}

                    <Route path="/register-service">
                      <RegisterServiceForm />
                    </Route>

                    <Route path="/">
                      <Projects />
                    </Route>
                  </Switch>
                </Content>
              </Layout>
            </Layout>
          </Layout>
        </div>
      )}
    </div>
  );
}

export default App;
