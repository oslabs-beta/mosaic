import {useEffect, useState} from 'react';
import {useParams, Link} from 'react-router-dom';
import axios from 'axios';
import {Row, Col, Card, Button, Tabs, Table, Badge} from 'antd';
import {PlusCircleOutlined, SettingFilled, StopOutlined} from '@ant-design/icons';
import {DependencyMap} from '../DependencyMap';

const {TabPane} = Tabs;

const callback = (key) => {
  console.log('tab changed:', key);
};

const ProjectDetails = () => {
  const {id} = useParams();
  const [project, setProject] = useState({});

  useEffect(() => {
    const getProject = async () => {
      axios
        .get(`http://localhost:8080/projects/${id}`)
        .then((project) => setProject(project.data))
        .catch((error) => console.log(error));
    };

    getProject();
  }, []);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Version',
      dataIndex: 'version',
    },
    {
      title: 'Dependencies',
      dataIndex: 'dependencies',
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
    },
  ];

  const data =
    project.services &&
    project.services.map((service) => {
      return {
        name: service,
        version: '1.0.0',
        dependencies: '',
        status: <Badge count="Active" style={{backgroundColor: '#389E0D'}} />,
        actions: 'View',
      };
    });

  return (
    <div>
      <h1>{project.name}</h1>
      <Row gutter={30}>
        <Col span={8}>
          <Card size="small" className="card--centered">
            <Link to="/register-service">
              <Button
                type="primary"
                shape="round"
                icon={<PlusCircleOutlined />}
                size="large"
                onClick={() => console.log('Register Service')}>
                Register Service
              </Button>
            </Link>
          </Card>
        </Col>
        <Col span={8}>
          <Card size="small" className="card--centered">
            <Button
              ghost
              type="primary"
              shape="round"
              icon={<SettingFilled />}
              size="large"
              onClick={() => console.log('Edit Project Info')}>
              Edit Project Info
            </Button>
          </Card>
        </Col>
        <Col span={8}>
          <Card size="small" className="card--centered">
            <Button
              danger
              shape="round"
              icon={<StopOutlined />}
              size="large"
              onClick={() => console.log('Delete Project')}>
              Delete Project
            </Button>
          </Card>
        </Col>
      </Row>

      <Row className="serviceTabsContainer">
        <Col span={24}>
          <Tabs defaultActiveKey="1" onChange={callback}>
            <TabPane tab="Services" key="1">
              <Table columns={columns} dataSource={data} bordered />
            </TabPane>
            <TabPane tab="Dependency Map" key="2">
              <DependencyMap />
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </div>
  );
};

export default ProjectDetails;
