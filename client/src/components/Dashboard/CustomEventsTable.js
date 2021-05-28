import {Table} from 'antd';

function CustomEventsTable() {
  const currentDate = new Date();
  const data = [
    {
      key: '1',
      name: 'User Logged In',
      date: currentDate.toString(),
      payload: '{ username: "clovera", timestamp: "1231231" }',
    },
    {
      key: '2',
      name: 'User Purchased an Item',
      date: currentDate.toString(),
      payload: '{ item: "bag", price: "34.99", timestamp: "1231231" }',
    },
    {
      key: '3',
      name: 'User Logged In',
      date: currentDate.toString(),
      payload: '{ username: "clovera", timestamp: "1231231" }',
    },
    {
      key: '4',
      name: 'User Purchased an Item',
      date: currentDate.toString(),
      payload: '{ item: "bag", price: "34.99", timestamp: "1231231" }',
    },
    {
      key: '5',
      name: 'User Abandoned Cart',
      date: currentDate.toString(),
      payload: '{ item: "Nike Shoes Model 534", price: "74.99", timestamp: "1231231" }',
    },
    {
      key: '6',
      name: 'User Email Signed Up',
      date: currentDate.toString(),
      payload: '{ email: "c@codemaster.com", timestamp: "1231231" }',
    },
  ];

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
      <Table dataSource={data} columns={columns} pagination={{pageSize: 15}} />
    </div>
  );
}

export default CustomEventsTable;
