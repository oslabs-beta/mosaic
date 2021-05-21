const express = require('express');
const router = express.Router();
const Project = require('../controllers/projectController');

router.post('/', 
  Project.createProject,
  (req, res) => {
    return res.status(200).json(res.locals.response);
  }
    

)

module.exports = router;

