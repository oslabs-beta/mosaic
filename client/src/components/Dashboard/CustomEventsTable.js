import {Table} from 'antd';
import {useEffect, useState} from 'react';
import './Dashboard.css';
import axios from 'axios';

function CustomEventsTable() {
  const [customEvents, setCustomEvents] = useState([]);

  useEffect(() => {
    const fetchCustomEvents = async () => {
      try {
        const customEvents = await axios.get('http://localhost:8080/customEvent');
        setCustomEvents(customEvents.data);
      } catch (error) {
        console.log(error);
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
      <Table dataSource={customEvents} columns={columns} pagination={{pageSize: 15}} />
    </div>
  );
}

export default CustomEventsTable;
