import {useEffect, useState} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import axios from 'axios';
import {Row, Col, Button, Tabs, Typography, Spin, Modal, Drawer, Tag} from 'antd';
import {
  QuestionCircleOutlined,
  ReloadOutlined,
  CheckCircleOutlined,
  WarningOutlined,
  SettingFilled,
  StopOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import Ping from 'ping.js';
import {useProjectContext} from '../../providers/Project';
import DependencyDetailsForm from '../../components/DependencyDetailsForm';
import css from './serviceDetails.module.css';

const PENDING = 'Pending';
const ACTIVE = 'Active';
const INACTIVE = 'Inactive';

const {TabPane} = Tabs;
const {Title} = Typography;

const buildServiceIdMap = (services) => {
  const obj = {};
  services.forEach((service) => {
    obj[service._id] = service;
  });
  return obj;
};

const callback = (key) => {
  console.log('tab changed:', key);
};

TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo('en-US');

function ServiceDetails() {
  const {projectState} = useProjectContext();
  const history = useHistory();
  const {id} = useParams();
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState(null);
  const [service, setService] = useState({});
  const [status, setStatus] = useState('');
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [serviceIdMap, setServiceIdMap] = useState(buildServiceIdMap(projectState?.services));

  useEffect(() => {
    const findService = async () => {
      try {
        setFetching(true);
        const {data} = await axios.get(`http://localhost:8080/service/${id}`);
        setService(data);
        setStatus(data.status);
        setLastUpdated(data.updatedAt);
        setFetching(false);
      } catch (e) {
        console.error(e);
        setError(e);
      }
    };
    findService();
  }, []);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/service/${id}/${projectState._id}`);
      history.replace('/');
    } catch (e) {
      console.error(e);
      setError(e);
    }
  };

  // ping service at IP Address, save status to DB, update status in UI
  const pingService = async () => {
    const p = new Ping();

    try {
      setFetching(true);
      const data = await p.ping('http://google.com');
      console.log('Successful ping: ' + data);
      setStatus('Active');
      // const res = await axios.put('http://localhost:8080/service/update', {
      //   id,
      //   status: 'Active',
      // });
      setFetching(false);
    } catch (e) {
      console.error(e);
      setError(e);
      setStatus('Inactive');
    }
  };

  const getServiceStatus = () => {
    pingService();

    const newDate = new Date();
    setLastUpdated(newDate);
  };

  if (error) {
    return null;
  }

  return (
    <div>
      <div className={css.spinnerContainer}>
        <Spin spinning={fetching} tip="Loading..." />
      </div>
      {!fetching && (
        <>
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={17}>
              <Title level={3}>{service.name}</Title>
              <p className={css.textLeftAligned}>
                <strong>Description: </strong>
                {service.description}
              </p>
              <p className={css.textLeftAligned}>
                <strong>Version: </strong>
                {service.version}
              </p>
              <p className={css.textLeftAligned}>
                <strong>IP Address: </strong>
                {service.ipAddress}
              </p>
              <p className={css.textLeftAligned}>
                <strong>Host: </strong>
                {service.host}
              </p>
              <p className={css.textLeftAligned}>
                <strong>Status: </strong>
                <span>
                  {status}
                  {status === PENDING && <QuestionCircleOutlined className="anticon--small" />}
                  {status === ACTIVE && <CheckCircleOutlined className="anticon--small" />}
                  {status === INACTIVE && <WarningOutlined className="anticon--small" />}
                </span>
              </p>
              <p className={css.textLeftAligned}>
                <strong>Last Updated: </strong>
                {lastUpdated ? timeAgo.format(new Date(lastUpdated)) : null}
              </p>
              <div>
                <strong>Dependencies: </strong>
                {service?.dependency?.map((dependencyId) => (
                  <Tag key={dependencyId}>{serviceIdMap[dependencyId].name}</Tag>
                ))}
              </div>
            </Col>
            <Col xs={24} lg={7}>
              <Row gutter={[16, 16]}>
                <Col sm={24} className={css.buttonContainer}>
                  <Button
                    ghost
                    type="primary"
                    shape="round"
                    icon={<SettingFilled />}
                    size="middle"
                    className={css.button}
                    onClick={() => history.push(`/edit-service/${id}`)}>
                    Edit Service Info
                  </Button>
                </Col>
                <Col sm={24} className={css.buttonContainer}>
                  <Button
                    type="primary"
                    shape="round"
                    icon={<PlusCircleOutlined />}
                    size="middle"
                    className={css.button}
                    onClick={() => setDrawerVisible(true)}>
                    Update Dependency
                  </Button>
                  <Drawer
                    title="Update Dependency"
                    placement="right"
                    closable
                    width={400}
                    onClose={() => setDrawerVisible(false)}
                    visible={drawerVisible}>
                    <DependencyDetailsForm
                      serviceInfo={service}
                      setServiceInfo={setService}
                      onSuccess={() => setDrawerVisible(false)}
                      dependencyOptions={projectState.services.map(
                        (element) => serviceIdMap[element._id],
                      )}
                    />
                  </Drawer>
                </Col>
                <Col sm={24} className={css.buttonContainer}>
                  <Button
                    type="primary"
                    shape="round"
                    icon={<ReloadOutlined />}
                    size="middle"
                    className={css.button}
                    onClick={() => getServiceStatus()}>
                    Refresh
                  </Button>
                </Col>
                <Col sm={24} className={css.buttonContainer}>
                  <Button
                    danger
                    shape="round"
                    icon={<StopOutlined />}
                    size="middle"
                    className={css.button}
                    onClick={() => setIsDeleteConfirmationOpen(true)}>
                    Delete Service
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="serviceTabsContainer">
            <Col span={24}>
              <Tabs defaultActiveKey="1" onChange={callback}>
                <TabPane tab="Events" key="1">
                  Events...
                </TabPane>
                <TabPane tab="Dependencies" key="2">
                  Dependencies...
                </TabPane>
              </Tabs>
            </Col>
          </Row>
          <Modal
            title="Confirm Service Deletion"
            okText="Delete"
            okButtonProps={{danger: true}}
            visible={isDeleteConfirmationOpen}
            onOk={handleDelete}
            onCancel={() => setIsDeleteConfirmationOpen(false)}>
            <p>Are you sure you want to delete {service.name}? This cannot be undone.</p>
          </Modal>
        </>
      )}
    </div>
  );
}

export default ServiceDetails;
