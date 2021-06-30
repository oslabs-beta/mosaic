import {useEffect, useState} from 'react';
import {useParams, Link, useHistory} from 'react-router-dom';
import axios from 'axios';
import {Row, Col, Card, Tabs, Table, Button, Badge, Modal, Typography} from 'antd';
import {PlusCircleOutlined, SettingFilled, StopOutlined} from '@ant-design/icons';
import {useProjectContext} from '../../providers/Project';
import {DependencyMap} from '../../components/DependencyMap';
import css from './projectDetails.module.css';

const {TabPane} = Tabs;
const {Title, Text} = Typography;

const callback = (key) => {
  console.log('tab changed:', key);
};

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

const ProjectDetails = () => {
  const {id} = useParams();
  const {projectState, setProjectState} = useProjectContext();
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState(null);
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
      try {
        setFetching(true);
        const {data} = await axios.get(`http://localhost:8080/projects/${id}`);
        setProjectState(data);
        console.log(data);
        setFetching(false);
      } catch (e) {
        setError(e);
        console.log(error);
      }
    };
    getProject();
  }, []);

  const getServicesData = () =>
    projectState?.services?.map(({_id, name, version, dependency, status}) => ({
      key: _id,
      name,
      version,
      dependencies: dependency.length ? dependency : '',
      status: <Badge count={status} style={{backgroundColor: '#cccccc', color: 'black'}} />,
      actions: <Link to={`/service/${_id}`}>View</Link>,
    }));

  if (fetching || error) {
    return null;
  }

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={18}>
          <Title level={3}>{projectState.name}</Title>
          <p className={css.textLeftAligned}>
            <strong>Description: </strong>
            {projectState.description}
          </p>
          <p className={css.textLeftAligned}>
            <strong>Service Count: </strong>
            {projectState.serviceCount}
          </p>
          <p className={css.textLeftAligned}>
            <strong>Last Updated: </strong>
            {new Date(projectState.updatedAt).toLocaleString()}
          </p>
        </Col>
        <Col xs={24} lg={6}>
          <Row gutter={[16, 16]}>
            <Col sm={24} className={css.buttonContainer}>
              <Button
                type="primary"
                shape="round"
                icon={<PlusCircleOutlined />}
                size="middle"
                className={css.button}
                onClick={() => history.push('/register-service')}>
                Register Service
              </Button>
            </Col>
            <Col sm={24} className={css.buttonContainer}>
              <Button
                ghost
                type="primary"
                shape="round"
                icon={<SettingFilled />}
                size="middle"
                className={css.button}
                onClick={() => console.log('Edit Project Info')}>
                Edit Project Info
              </Button>
            </Col>
            <Col sm={24} className={css.buttonContainer}>
              <Button
                danger
                shape="round"
                icon={<StopOutlined />}
                size="middle"
                className={css.button}
                onClick={() => setIsDeleteProjectOpen(true)}>
                Delete Project
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row className={css.serviceTabsContainer}>
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
