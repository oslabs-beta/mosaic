const  Projects  = require('../models/ProjectModel');


const projectController = {};

projectController.createProject = (req, res, next) => {
  Projects.create({
    name: req.body.name,
    description: req.body.description,
    services: req.body.services,
    serviceCount: req.body.serviceCount,
  })
  .then(data => {
    res.locals.response = data;
    next();
  })
  .catch((err) => {
    next({
      log: `Create project - ERROR: ${err}`,
      message: {
        err: 'Error occured in projectController.createProject',
        message: err,
      },
    });
  }); 
}

module.exports = projectController;