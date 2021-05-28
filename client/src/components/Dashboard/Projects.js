import {useState} from 'react';
import {Row, Col, Card, Button} from 'antd';
import {FileAddOutlined} from '@ant-design/icons';
import CreateProjectForm from './CreateProjectForm';
import './Dashboard.css';
import axios from 'axios';

function Projects() {
  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false);
  const onCreate = (values) => {
    axios
      .post('http://localhost:8080/projects', {
        ...values,
      })
      .then(() => {
        setIsCreateProjectOpen(false);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="site-card-wrapper">
      <Row gutter={16}>
        <Col span={8}>
          <Card className="card--centered">
            <Button
              type="primary"
              shape="round"
              icon={<FileAddOutlined />}
              size={'large'}
              onClick={() => setIsCreateProjectOpen(true)}>
              Add Project
            </Button>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Card title">Card content</Card>
        </Col>
        <Col span={8}>
          <Card title="Card title">Card content</Card>
        </Col>
      </Row>

      <CreateProjectForm
        visible={isCreateProjectOpen}
        onCreate={onCreate}
        onCancel={() => setIsCreateProjectOpen(false)}
      />
    </div>
  );
}

export default Projects;
