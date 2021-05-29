import {Layout, Menu} from 'antd';
import {LaptopOutlined, SettingOutlined} from '@ant-design/icons';
import './Dashboard.css';
import {Link} from 'react-router-dom';

const {Sider} = Layout;

function SideMenu() {
  return (
    <Sider width={200} className="site-layout-background">
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        style={{height: '100%', borderRight: 0}}>
        <Menu.Item icon={<LaptopOutlined />} key="1">
          <Link to="/custom-events">Logs</Link>
        </Menu.Item>
        {/* <Menu.Item icon={<UserOutlined />} key="2">
          <Link to="/custom-events">Custom Events</Link>
        </Menu.Item> */}
        <Menu.Item icon={<SettingOutlined />} key="3">
          Settings
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

export default SideMenu;
