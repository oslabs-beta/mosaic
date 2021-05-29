import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {Row, Col, Card, Button} from 'antd';
import {FileAddOutlined} from '@ant-design/icons';
import CreateProjectForm from './CreateProjectForm';
import './Dashboard.css';
import axios from 'axios';

function Projects() {
  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const projects = await axios.get('http://localhost:8080/projects');
      setProjects(projects.data);
    };
    fetchProjects();
  }, []);
  const onCreate = (values) => {
    axios
      .post('http://localhost:8080/projects', {
        ...values,
      })
      .then((data) => {
        setProjects([...projects, data.data]);
        setIsCreateProjectOpen(false);
      })
      .catch((error) => console.log(error));
  };

  const projectRows = [];
  for (let i = 0; i < projects.length; i += 3) {
    projectRows.push(projects.slice(i, i + 3));
  }

  return (
    <div className="site-card-wrapper">
      <Button
        type="primary"
        shape="round"
        icon={<FileAddOutlined />}
        size={'small'}
        style={{marginBottom: '20px'}}
        onClick={() => setIsCreateProjectOpen(true)}>
        Add Project
      </Button>
      {projectRows.map((row, i) => (
        <Row key={i} gutter={16} style={{marginBottom: '16px'}}>
          {row.map((project) => (
            <Col key={project.id} span={8}>
              <Card
                title={
                  <Link to={`/dashboard/project-details/${project._id}`}>{project.name}</Link>
                }>
                {project.description}
              </Card>
            </Col>
          ))}
        </Row>
      ))}
      {/* <Row gutter={16}>
        <Col span={8}>
          <Card title="Card title">Card content</Card>
        </Col>
        <Col span={8}>
          <Card title="Card title">Card content</Card>
        </Col>
      </Row> */}

      <CreateProjectForm
        visible={isCreateProjectOpen}
        onCreate={onCreate}
        onCancel={() => setIsCreateProjectOpen(false)}
      />
    </div>
  );
}

export default Projects;
