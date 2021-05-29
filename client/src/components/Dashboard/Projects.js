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
    console.log(projectRows);
  }

  return (
    <div className="site-card-wrapper">
      <Row gutter={16} style={{marginBottom: '16px'}}>
        <Col span={24}>
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

        <CreateProjectForm
          visible={isCreateProjectOpen}
          onCreate={onCreate}
          onCancel={() => setIsCreateProjectOpen(false)}
        />
      </Row>

      {projectRows.splice(0, 2).map((row, i) => (
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
    </div>
  );
}

export default Projects;
