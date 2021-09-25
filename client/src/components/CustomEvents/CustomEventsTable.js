import {Table} from 'antd';
import {useEffect, useState} from 'react';
import axios from 'axios';
import trackCustomEvent from './utils';

function CustomEventsTable() {
  const [customEvents, setCustomEvents] = useState([]);

  useEffect(() => {
    const fetchCustomEvents = async () => {
      console.log('visit');
      trackCustomEvent('User Visited a Page', new Date(), {
        user: 'demoUser',
        customEventPayload: 'Visited Custom Events Page',
      });
      try {
        const customEvents = await axios.get('http://localhost:8080/customEvent');
        setCustomEvents(customEvents.data);
      } catch (error) {
        console.log('customEventsTable: ', error);
      }
    };
    fetchCustomEvents();
  }, []);

  const columns = [
    {
      title: 'Event Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Payload',
      dataIndex: 'payload',
      key: 'payload',
    },
  ];

  return (
    <div>
      <Table dataSource={customEvents} columns={columns} pagination={{pageSize: 10}} />
    </div>
  );
}

export default CustomEventsTable;
