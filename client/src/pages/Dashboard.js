import {Layout} from 'antd';
import SideMenu from '../components/Dashboard/SideMenu';
import '../components/Dashboard/Dashboard.css';
import Projects from '../components/Dashboard/Projects';
const {Content} = Layout;

const Dashboard = () => {
  return (
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
            <Projects />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
