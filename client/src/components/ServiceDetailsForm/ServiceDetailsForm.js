import {useEffect, useState} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import {Form, Input, Button, Spin, Typography, Select} from 'antd';
import axios from 'axios';
import {useProjectContext} from '../../providers/Project';
import css from './serviceDetails.module.css';

const {Title} = Typography;
const {Option} = Select;

function ServiceDetailsForm() {
  const {id} = useParams();
  let history = useHistory();
  const [serviceInfo, setServiceInfo] = useState({
    name: '',
    description: '',
    version: '',
    ipAddress: '',
    host: '',
    ownedBy: '',
  });
  const [teamOptions, setTeamOptions] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const {
    projectState: {_id: projectId},
  } = useProjectContext();

  console.log(serviceInfo);

  const handleSubmit = async (values) => {
    if (id) {
      try {
        setSubmitting(true);
        const {data} = await axios.put(`http://localhost:8080/service/${id}`, {
          ...values,
        });
        setServiceInfo(data);
        setSubmitting(false);
        history.push(`/service/${id}`);
      } catch (e) {
        console.log(e);
        setError(e);
      }
    } else {
      try {
        setSubmitting(true);
        const {data} = await axios.post(`http://localhost:8080/service`, {
          ...values,
          projectId,
        });
        setServiceInfo(data);
        setSubmitting(false);
        history.push(`/service/${data._id}`);
      } catch (e) {
        console.log(e);
        setError(e);
      }
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    const fetchServiceInfo = async () => {
      try {
        setSubmitting(true);
        const {data} = await axios.get(`http://localhost:8080/service/${id}`);
        setServiceInfo(data);
        setSubmitting(false);
      } catch (e) {
        console.log(e);
        setError(e);
      }
    };
    if (id) {
      fetchServiceInfo();
    }

    const fetchTeams = async () => {
      try {
        setSubmitting(true);
        const {data} = await axios.get(`http://localhost:8080/team`);
        const options = data?.map(({_id, name}) => ({
          value: _id,
          name,
        }));
        setTeamOptions(options);
        setSubmitting(false);
      } catch (e) {
        console.log(e);
        setError(e);
      }
    };
    fetchTeams();
  }, []);

  if (error) {
    return null;
  }

  return (
    <div>
      <div className={css.spinnerContainer}>
        <Spin spinning={submitting} tip="Loading..." />
      </div>
      {!submitting && (
        <>
          <Title level={3}>Service Info Form</Title>
          <Form
            layout="vertical"
            name="registerServiceForm"
            initialValues={{
              name: serviceInfo.name,
              description: serviceInfo.description,
              version: serviceInfo.version,
              ipAddress: serviceInfo.ipAddress,
              host: serviceInfo.host,
              ownedBy: serviceInfo.ownedBy,
            }}
            onFinish={handleSubmit}
            onFinishFailed={onFinishFailed}>
            <Form.Item
              label="Name"
              name="name"
              required={true}
              rules={[
                {
                  required: true,
                  message: 'Cannot be blank',
                },
              ]}>
              <Input placeholder="My Service" />
            </Form.Item>
            <Form.Item
              label="Owned By"
              name="ownedBy"
              required={true}
              rules={[
                {
                  required: true,
                  message: 'Cannot be blank',
                },
              ]}>
              <Select placeholder="Please select the team" style={{width: '100%'}}>
                {teamOptions.map(({value, name}) => (
                  <Option key={value} value={value}>
                    {name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="Description" name="description">
              <Input placeholder="This is a service." />
            </Form.Item>

            <Form.Item label="Version" name="version">
              <Input placeholder="1.0.0" />
            </Form.Item>

            <Form.Item
              label="IP Address"
              name="ipAddress"
              rules={[
                {
                  required: true,
                  message: 'Cannot be blank',
                },
              ]}>
              <Input placeholder="127.0.0.1" />
            </Form.Item>

            <Form.Item
              label="Host"
              name="host"
              rules={[
                {
                  required: true,
                  message: 'Cannot be blank',
                },
              ]}>
              <Input placeholder="Local" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </>
      )}
    </div>
  );
}

export default ServiceDetailsForm;
