import mongoose from 'mongoose';
const Project = mongoose.model('projects');
const projectController = {};

projectController.createProject = (req, res, next) => {
  Project.create({
    name: req.body.projectName,
    description: req.body.projectDescription,
    services: req.body.services,
    serviceCount: req.body.services.length,
  })
    .then((data) => {
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
};

export default projectController;
