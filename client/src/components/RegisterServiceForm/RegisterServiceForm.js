import {Form, Input, Button, Radio} from 'antd';
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

  return (
    <div>
      <h1>Register Service Form</h1>

      <Form
        // {...formItemLayout}
        layout="horizontal"
        form={Form.useForm()}
        initialValues={{}}
        onValuesChange={onFormLayoutChange}>
        <Form.Item label="Form Layout" name="layout">
          <Radio.Group value={formLayout}>
            <Radio.Button value="horizontal">Horizontal</Radio.Button>
            <Radio.Button value="vertical">Vertical</Radio.Button>
            <Radio.Button value="inline">Inline</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Field A">
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item label="Field B">
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item {...buttonItemLayout}>
          <Button type="primary">Submit</Button>
        </Form.Item>
      </Form>

      {/* <form onSubmit={(e) => handleSubmit(e)}>
        <p>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            placeholder="My Service"
            //   onChange={(e) => {}}
          />
        </p>
        <p>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            placeholder="This is a service."
            // onChange={(e) => {}}
          />
        </p>
        <p>
          <label htmlFor="version">Version</label>
          <input
            type="text"
            name="version"
            placeholder="1.0.0"
            //   onChange={(e) => {}}
          />
        </p>
        <p>
          <label htmlFor="ipAddress">IP Address</label>
          <input
            type="text"
            name="ipAddress"
            placeholder="127.0. 0.1"
            //   onChange={(e) => {}}
          />
        </p>
        <p>
          <label htmlFor="host">Host</label>
          <input
            type="text"
            name="host"
            placeholder="Local"
            //   onChange={(e) => {}}
          />
        </p>

        <p>
          <input type="submit" value="Submit" />
        </p>
      </form> */}
    </div>
  );
}

export default RegisterServiceForm;
