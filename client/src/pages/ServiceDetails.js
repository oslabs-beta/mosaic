import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import {Card, Button} from 'antd';
import {
  QuestionCircleOutlined,
  ReloadOutlined,
  CheckCircleOutlined,
  WarningOutlined,
} from '@ant-design/icons';

import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
TimeAgo.addDefaultLocale(en);

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

  const getServiceStatus = () => {
    const newDate = timeAgo.format(new Date());
    const newStatus = status === 'Pending' ? 'Active' : 'Inactive';
    setLastUpdated(newDate);
    setStatus(newStatus);
  };

  return (
    <div>
      <h1>
        Service Details for {id}: {service.name}
      </h1>
      <Card size="small" style={{width: 300}}>
        <p>
          <strong>IP Address:</strong> {service.ipAddress}
        </p>
        <p>
          <strong>Host:</strong> {service.host}
        </p>
      </Card>
      <Card size="small" title={'Status: ' + status} style={{width: 300}}>
        <p>{status === 'Pending' && <QuestionCircleOutlined />}</p>
        <p>{status === 'Active' && <CheckCircleOutlined />}</p>
        <p>{status === 'Inactive' && <WarningOutlined />}</p>
      </Card>
      <Card size="small" title={'Updated: ' + lastUpdated} style={{width: 300}}>
        <p>
          <Button
            type="primary"
            shape="round"
            icon={<ReloadOutlined />}
            size={'small'}
            onClick={() => getServiceStatus()}>
            Refresh
          </Button>
        </p>
      </Card>
    </div>
  );
}

export default ServiceDetails;
