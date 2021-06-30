import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import {Row, Col, Card, Button, Tabs} from 'antd';
import {
  QuestionCircleOutlined,
  ReloadOutlined,
  CheckCircleOutlined,
  WarningOutlined,
  SettingFilled,
} from '@ant-design/icons';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import Ping from 'ping.js';

const {TabPane} = Tabs;

const callback = (key) => {
  console.log('tab changed:', key);
};

TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo('en-US');

function ServiceDetails() {
  const {id} = useParams();
  const [service, setService] = useState({});
  const [status, setStatus] = useState('');

  // TO DO: get date from DB and Reformat lastUpdated
  const [lastUpdated, setLastUpdated] = useState(
    timeAgo.format(new Date('2021-05-28T19:45:33.903Z')),
  );

  useEffect(() => {
    const findService = async () => {
      const service = await axios.get(`http://localhost:8080/service/${id}`);
      setService(service.data);
      setStatus(service.data.status);
    };
    findService();
  }, []);

  // ping service at IP Address, save status to DB, update status in UI
  const pingService = () => {
    const p = new Ping();

    p.ping('http://google.comz')
      .then((data) => {
        console.log('Successful ping: ' + data);
        setStatus('Active');
      })
      .then(() => {
        axios
          .put('http://localhost:8080/service/update', {
            id,
            status: 'Active',
          })
          .then((response) => {
            console.log('put response:', response.data);
          })
          .catch((error) => console.log(error));
      })
      .catch((data) => {
        console.error('Ping failed: ' + data);
        setStatus('Inactive');
      });
  };

  const getServiceStatus = () => {
    pingService();

    const newDate = timeAgo.format(new Date());
    setLastUpdated(newDate);
  };

  return (
    <div>
      <h1>{service.name}</h1>
      <Row gutter={[10, 10]}>
        <Col md={24} lg={8}>
          <Card size="small" title="Location">
            <p>
              <strong>IP Address:</strong> {service.ipAddress}
            </p>
            <p>
              <strong>Host:</strong> {service.host}
            </p>
            <Button
              ghost
              type="primary"
              shape="round"
              icon={<SettingFilled />}
              size="large"
              onClick={() => console.log('Edit Project Info')}>
              Edit Service Info
            </Button>
          </Card>
        </Col>
        <Col md={24} lg={8}>
          <Card size="small" title={'Status: ' + status}>
            <p>{status === 'Pending' && <QuestionCircleOutlined className="anticon--large" />}</p>
            <p>{status === 'Active' && <CheckCircleOutlined className="anticon--large" />}</p>
            <p>{status === 'Inactive' && <WarningOutlined className="anticon--large" />}</p>
            <Button
              type="primary"
              shape="round"
              icon={<ReloadOutlined />}
              size={'large'}
              onClick={() => getServiceStatus()}>
              Refresh
            </Button>
          </Card>
        </Col>
        <Col md={24} lg={8}>
          <Card size="small" title={'Updated: ' + lastUpdated}>
            <p style={{marginTop: 15}}>
              {/* <Button
                type="primary"
                shape="round"
                icon={<ReloadOutlined />}
                size={'large'}
                onClick={() => getServiceStatus()}>
                Refresh
              </Button> */}
            </p>
          </Card>
        </Col>
      </Row>

      <Row className="serviceTabsContainer">
        <Col span={24}>
          <Tabs defaultActiveKey="1" onChange={callback}>
            <TabPane tab="Overview" key="1">
              <p>
                <strong>Description:</strong> {service.description}
              </p>
              <p>
                <strong>Version:</strong> {service.version}
              </p>
            </TabPane>
            <TabPane tab="Events" key="2">
              Events...
            </TabPane>
            <TabPane tab="Dependencies" key="3">
              Dependencies...
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </div>
  );
}

export default ServiceDetails;
