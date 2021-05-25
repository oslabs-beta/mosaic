import express from 'express';
import project from '../controllers/projectController';

const router = express.Router();

router.post('/', 
  project.createProject,
  (req, res) => {
    return res.status(200).json(res.locals.response);
  }
    

) 
export default router;

