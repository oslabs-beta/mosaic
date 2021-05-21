import {Form, Input, Button} from 'antd';
// import {useState} from 'react';

function RegisterServiceForm() {
  //   const [values, setValues] = useState({
  //     name: '',
  //     description: '',
  //     version: '',
  //     ipAddress: '',
  //     host: '',
  //   });

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     console.log('form data', e.target);
  //   };

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
      <h1>Register Service Form</h1>

      <Form
        layout="vertical"
        name="registerServiceForm"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
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
          <Input placeholder="127.0. 0.1" />
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
    </div>
  );
}

export default RegisterServiceForm;
