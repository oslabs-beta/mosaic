import {useEffect, useState} from 'react';
import {useParams, Link, useHistory} from 'react-router-dom';
import axios from 'axios';
import {Row, Col, Card, Button, Tabs, Table, Badge, Modal} from 'antd';
import {PlusCircleOutlined, SettingFilled, StopOutlined} from '@ant-design/icons';
import {useProjectContext} from '../providers/Project';
import {DependencyMap} from '../DependencyMap';

const {TabPane} = Tabs;

const callback = (key) => {
  console.log('tab changed:', key);
};

const ProjectDetails = () => {
  const {id} = useParams();
  const {projectState, setProjectState} = useProjectContext();
  const [isDeleteProjectOpen, setIsDeleteProjectOpen] = useState(false);
  const history = useHistory();

  const handleDelete = () => {
    axios
      .delete(`http://localhost:8080/projects/${id}`)
      .then(() => history.push('/'))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    const getProject = async () => {
      axios
        .get(`http://localhost:8080/projects/${id}`)
        .then((project) => {
          setProjectState(project.data);
        })
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

  const getServicesData = () =>
    projectState?.services?.map(({_id, name, version, dependency, status}) => ({
      key: _id,
      name,
      version,
      dependencies: dependency.length ? dependency : '',
      status: <Badge count={status} style={{backgroundColor: '#cccccc', color: 'black'}} />,
      actions: <Link to="/service/60b1914b12394d5148f8194e">View</Link>,
    }));

  return (
    <div>
      <h1>{projectState.name}</h1>
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
              onClick={() => setIsDeleteProjectOpen(true)}>
              Delete Project
            </Button>
          </Card>
        </Col>
      </Row>

      <Row className="serviceTabsContainer">
        <Col span={24}>
          <Tabs defaultActiveKey="1" onChange={callback}>
            <TabPane tab="Services" key="1">
              <p>
                <strong>Services:</strong>
              </p>

              <Table columns={columns} dataSource={getServicesData()} bordered />
            </TabPane>
            <TabPane tab="Dependency Map" key="2">
              <DependencyMap />
            </TabPane>
          </Tabs>
        </Col>
      </Row>
      <Modal
        title="Confirm Project Deletion"
        okText="Delete"
        okButtonProps={{danger: true}}
        visible={isDeleteProjectOpen}
        onOk={handleDelete}
        onCancel={() => setIsDeleteProjectOpen(false)}>
        <p>Are you sure you want to delete {projectState.name}? This cannot be undone.</p>
      </Modal>
    </div>
  );
};

export default ProjectDetails;
