import {useEffect, useState} from 'react';
import {useParams, Link, useHistory} from 'react-router-dom';
import axios from 'axios';
import {Row, Col, Drawer, Tabs, Table, Button, Badge, Modal, Typography, Spin, Tag} from 'antd';
import {
  PlusCircleOutlined,
  SettingFilled,
  StopOutlined,
  MedicineBoxOutlined,
} from '@ant-design/icons';
import {useProjectContext} from '../../providers/Project';
import {DependencyMap} from '../../components/DependencyMap';
import Ping from 'ping.js';
import css from './projectDetails.module.css';

const {TabPane} = Tabs;
const {Title} = Typography;

const initialDependencyMap = {
  nodes: [],
  links: [],
};

const buildServiceMap = (services) => {
  const map = {};
  services.forEach(({_id, name}) => {
    map[_id] = name;
  });
  return map;
};

const buildDependencyMap = (services, serviceMap) => {
  const map = {...initialDependencyMap};
  services.forEach(({_id, name, dependency, ownedBy}) => {
    if (!map.nodes.some((node) => node.name === name)) {
      map.nodes.push({
        id: _id,
        name,
        ownedBy: ownedBy.name,
      });
    }
    dependency.forEach((serviceId) => {
      const newLink = {
        source: name,
        target: serviceMap[serviceId],
        value: 1,
      };
      if (
        !map.links.some((link) => link.source === name && link.target === serviceMap[serviceId]) &&
        newLink.target !== undefined
      ) {
        map.links.push(newLink);
      }
    });
  });
  return map;
};

const callback = (key) => {
  console.log('tab changed:', key);
};

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Owner Team',
    dataIndex: 'ownerTeam',
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
  // {
  //   title: 'Actions',
  //   dataIndex: 'actions',
  // },
];

const ProjectDetails = () => {
  const {id} = useParams();
  const {projectState, setProjectState} = useProjectContext();
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState(null);
  const [isDeleteProjectOpen, setIsDeleteProjectOpen] = useState(false);
  const [serviceMap, setServiceMap] = useState({});
  const [dependencyMap, setDependencyMap] = useState(initialDependencyMap);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [serviceStatus, setServiceStatus] = useState({});
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
        setServiceMap(buildServiceMap(data?.services));
        setFetching(false);
      } catch (e) {
        setError(e);
        console.log(error);
      }
    };
    getProject();
  }, []);

  useEffect(() => {
    setDependencyMap(buildDependencyMap(projectState?.services, serviceMap));
  }, [serviceMap, projectState]);

  const getServicesData = () =>
    projectState?.services
      ?.sort((a, b) => (a.name < b.name ? -1 : 1))
      ?.map(({_id, name, version, dependency, status, ownedBy}) => ({
        key: _id,
        name: <Link to={`/service/${_id}`}>{name}</Link>,
        ownerTeam: ownedBy.name,
        version,
        dependencies: (
          <>
            {dependency?.map((dependencyId) => (
              <Tag key={dependencyId}>{serviceMap[dependencyId]}</Tag>
            ))}
          </>
        ),
        status: <Badge count={status} style={{backgroundColor: '#cccccc', color: 'black'}} />,
        // actions: <Link to={`/service/${_id}`}>View</Link>,
      }));

  const pingAll = () => {
    projectState.services.forEach((service) => {
      const p = new Ping();

      p.ping(service.ipAddress)
        .then((resTime) => {
          setServiceStatus((prev) => {
            return {...prev, [service._id]: resTime};
          });
        })
        .catch(() => {
          setServiceStatus((prev) => {
            return {...prev, [service._id]: false};
          });
        });
    });
  };

  if (error) {
    return null;
  }
  console.log(serviceStatus);
  return (
    <div>
      <div className={css.spinnerContainer}>
        <Spin spinning={fetching} tip="Loading..." />
      </div>
      {!fetching && (
        <>
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
                <Col sm={24} className={css.buttonContainer}>
                  <Button
                    ghost
                    type="primary"
                    shape="round"
                    icon={<MedicineBoxOutlined />}
                    size="middle"
                    className={css.button}
                    onClick={() => setDrawerVisible(true)}>
                    Dependency Health Check
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
                  <DependencyMap dependencyMapData={dependencyMap} />
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
          <Drawer
            title="Dependency Health Check"
            placement="right"
            closable
            width={400}
            onClose={() => {
              setDrawerVisible(false);
              setServiceStatus({});
            }}
            visible={drawerVisible}>
            <div>
              <Button
                style={{width: '30%'}}
                type="primary"
                shape="round"
                icon={<MedicineBoxOutlined />}
                size="small"
                className={css.button}
                onClick={pingAll}>
                Ping All
              </Button>
              {projectState.services.map((service) => (
                <div key={service._id}>
                  {service.name}
                  {!(service._id in serviceStatus) && <Badge status="default" />}
                  {service._id in serviceStatus && (
                    <span>
                      {serviceStatus[service._id] ? (
                        <>
                          <Badge status="success" />
                          <span>{serviceStatus[service._id]} ms</span>
                        </>
                      ) : (
                        <Badge status="error" />
                      )}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </Drawer>
        </>
      )}
    </div>
  );
};

export default ProjectDetails;
