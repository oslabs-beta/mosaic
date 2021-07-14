import express from 'express';
import team from '../controllers/teamController';

const router = express.Router();

router.get('/',
team.fetchTeams,
  (req, res) => {
    return res.status(200).json(res.locals.response);
  }
);

export default router;