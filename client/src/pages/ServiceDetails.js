import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import {Row, Col, Card, Button, Tabs} from 'antd';
import {
  QuestionCircleOutlined,
  ReloadOutlined,
  CheckCircleOutlined,
  WarningOutlined,
} from '@ant-design/icons';

import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
TimeAgo.addDefaultLocale(en);

const {TabPane} = Tabs;

const callback = (key) => {
  console.log('tab changed:', key);
};

import Ping from 'ping.js';

function ServiceDetails() {
  const {id} = useParams();
  const [service, setService] = useState({});
  const [status, setStatus] = useState('');

  const timeAgo = new TimeAgo('en-US');
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

  // TO DO: update this to get status from service and save to DB
  // 1. Ping service at IP Address
  // 2. Save Status to DB
  // 3. Update Status in UI
  const pingService = () => {
    console.log('inside pingService');

    const p = new Ping();

    p.ping('http://google.comz')
      .then((data) => {
        console.log('Successful ping: ' + data);
        setStatus('Active');
      })
      .catch((data) => {
        console.error('Ping failed: ' + data);
        setStatus('Inactive');
      });
  };

  const getServiceStatus = () => {
    console.log(`pinging service: ${service.ipAddress}`);
    pingService();

    const newDate = timeAgo.format(new Date());
    // const newStatus = status === 'Pending' ? 'Active' : 'Inactive';
    setLastUpdated(newDate);
    // setStatus(newStatus);
  };

  return (
    <div>
      <h1>{service.name}</h1>
      <Row>
        <Col span={8}>
          <Card size="small" title="Location" style={{width: 300}}>
            <p>
              <strong>IP Address:</strong> {service.ipAddress}
            </p>
            <p>
              <strong>Host:</strong> {service.host}
            </p>
          </Card>
        </Col>
        <Col span={8}>
          <Card size="small" title={'Status: ' + status} style={{width: 300}}>
            <p>{status === 'Pending' && <QuestionCircleOutlined className="anticon--large" />}</p>
            <p>{status === 'Active' && <CheckCircleOutlined className="anticon--large" />}</p>
            <p>{status === 'Inactive' && <WarningOutlined className="anticon--large" />}</p>
          </Card>
        </Col>
        <Col span={8}>
          <Card size="small" title={'Updated: ' + lastUpdated} style={{width: 300}}>
            <p>
              <Button
                type="primary"
                shape="round"
                icon={<ReloadOutlined />}
                size={'large'}
                onClick={() => getServiceStatus()}>
                Refresh
              </Button>
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
