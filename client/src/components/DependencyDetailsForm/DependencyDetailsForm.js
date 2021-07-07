import {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {Form, Button, Spin, Typography, Select} from 'antd';
import axios from 'axios';
import {useProjectContext} from '../../providers/Project';
import css from './dependencyDetailsForm.module.css';

const {Title} = Typography;
const {Option} = Select;

const DependencyDetailsForm = ({serviceInfo, setServiceInfo, dependencyOptions}) => {
  const serviceId = serviceInfo._id;
  let history = useHistory();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleSubmit = async (values) => {
    try {
      setSubmitting(true);
      const {data} = await axios.put(`http://localhost:8080/service/${serviceId}`, {
        ...values,
      });
      setServiceInfo(data);
      setSubmitting(false);
      history.push(`/service/${serviceId}`);
    } catch (e) {
      console.log(e);
      setError(e);
    }
  };

  if (error) {
    return null;
  }

  console.log(dependencyOptions);

  return (
    <div>
      <div className={css.spinnerContainer}>
        <Spin spinning={submitting} tip="Loading..." />
      </div>
      {!submitting && (
        <>
          <Form
            layout="vertical"
            name="dependencyDetailsForm"
            initialValues={{
              dependency: serviceInfo.dependency,
            }}
            onFinish={handleSubmit}
            onFinishFailed={onFinishFailed}>
            <Form.Item
              label="Dependencies"
              name="dependency"
              required={true}
              rules={[
                {
                  required: true,
                  message: 'Cannot be blank',
                },
              ]}>
              <Select
                mode="multiple"
                // allowClear
                placeholder="Please select dependencies"
                onChange={(e) => console.log(e)}>
                {dependencyOptions?.map(({_id, name}) => {
                  if (serviceId !== _id) {
                    return (
                      <Option value={_id} key={_id}>
                        {name}
                      </Option>
                    );
                  }
                })}
              </Select>
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
};

export default DependencyDetailsForm;
