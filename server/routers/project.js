import express from 'express';
import project from '../controllers/projectController';

const router = express.Router();

router.post('/', 
  project.createProject,
  (req, res) => {
    return res.status(200).json(res.locals.response);
  }
) 

router.get('/',
  project.fetchProjects,
  (req, res) => {
    return res.status(200).json(res.locals.response);
  }
)

router.get('/:id',
  project.fetchProject,
  (req, res) => {
    return res.status(200).json(res.locals.response);
  }
)

router.delete('/:id', project.deleteProject, (req, res) => {
  return res.sendStatus(200);
});

export default router;

