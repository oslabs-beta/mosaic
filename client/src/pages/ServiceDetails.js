import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import {Card, Button} from 'antd';
import {QuestionCircleOutlined, ReloadOutlined} from '@ant-design/icons';

import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
TimeAgo.addDefaultLocale(en);

function ServiceDetails() {
  const {id} = useParams();
  const [service, setService] = useState({});

  const timeAgo = new TimeAgo('en-US');

  useEffect(() => {
    const findService = async () => {
      const service = await axios.get(`http://localhost:8080/service/${id}`);
      setService(service.data);
    };
    findService();
  }, []);

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
      <Card size="small" title={'Status: ' + service.status} style={{width: 300}}>
        <p>
          <QuestionCircleOutlined />
        </p>
      </Card>
      <Card
        size="small"
        title={'Updated: ' + timeAgo.format(new Date() - 24 * 60 * 60 * 1000)}
        style={{width: 300}}>
        <p>
          <Button
            type="primary"
            shape="round"
            icon={<ReloadOutlined />}
            size={'small'}
            onClick={() => console.log('refreshing...')}>
            Refresh
          </Button>
        </p>
      </Card>
    </div>
  );
}

export default ServiceDetails;
