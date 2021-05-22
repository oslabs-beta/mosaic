import {Layout, Menu} from 'antd';
import {UserOutlined, LaptopOutlined, SettingOutlined} from '@ant-design/icons';
import './Dashboard.css';
const {SubMenu} = Menu;
const {Sider} = Layout;

function SideMenu() {
  return (
    <Sider width={200} className="site-layout-background">
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        style={{height: '100%', borderRight: 0}}>
        <SubMenu key="sub1" icon={<UserOutlined />} title="Dashboard">
          <Menu.Item key="1">option1</Menu.Item>
          <Menu.Item key="2">option2</Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" icon={<LaptopOutlined />} title="Logs">
          <Menu.Item key="5">option5</Menu.Item>
          <Menu.Item key="6">option6</Menu.Item>
        </SubMenu>
        <SubMenu key="sub3" icon={<SettingOutlined />} title="Settings">
          <Menu.Item key="9">option9</Menu.Item>
          <Menu.Item key="10">option10</Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  );
}

export default SideMenu;
