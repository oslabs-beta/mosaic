/* eslint-disable react/prop-types */
import {Form, Input, Modal, Select} from 'antd';
import TrackCustomEvent from '../../CustomEvents/utils';

const CreateProject = ({visible, onCreate, onCancel}) => {
  const [form] = Form.useForm();
  return (
    <>
      <Modal
        title="Create Project Form"
        visible={visible}
        confirmLoading={false}
        onCancel={onCancel}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              onCreate(values);
              TrackCustomEvent('User Created New Project', new Date(), {
                user: 'demoUser',
                customEventPayload: values,
              });
            })
            .catch((info) => {
              console.log('Validate Failed:', info);
            });
        }}>
        <Form
          form={form}
          layout="vertical"
          name="createProjectForm"
          initialValues={{
            remember: true,
          }}>
          <Form.Item
            label="Project Name"
            name="projectName"
            required={true}
            rules={[
              {
                required: true,
                message: 'Cannot be blank',
              },
            ]}>
            <Input placeholder="Project Name" />
          </Form.Item>

          <Form.Item
            label="Description"
            name="projectDescription"
            required={true}
            rules={[
              {
                required: true,
                message: 'Cannot be blank',
              },
            ]}>
            <Input placeholder="Project Description" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateProject;
