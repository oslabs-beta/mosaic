import {Row, Col, Card, Button} from 'antd';
import {FileAddOutlined} from '@ant-design/icons';
import './Dashboard.css';

function Projects() {
  return (
    <div className="site-card-wrapper">
      <Row gutter={16}>
        <Col span={8}>
          <Card title="Card title">
            <Button type="primary" shape="round" icon={<FileAddOutlined />} size={'small'}>
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
    </div>
  );
}

export default Projects;
