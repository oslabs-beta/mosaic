import {useEffect, useState} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';

const ProjectDetails = () => {
  const {id} = useParams();
  const [project, setProject] = useState({});

  useEffect(() => {
    const getProject = async () => {
      axios
        .get(`http://localhost:8080/projects/${id}`)
        .then((project) => setProject(project.data))
        .catch((error) => console.log(error));
    };

    getProject();
  }, []);

  return <pre>{JSON.stringify(project, null, 2)}</pre>;
};

export default ProjectDetails;
