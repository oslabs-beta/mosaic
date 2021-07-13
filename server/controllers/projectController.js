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
    })
};

projectController.fetchProjects = (req, res, next) => {
  Project.find({})
    .then((data) =>{
      res.locals.response = data;
      next();
    })
    .catch((err) => {
      next({
        log: `Fetch projects - ERROR: ${err}`,
        message: {
          err: 'Error occured in projectController.fetchProjects',
          message: err,
        },
      });
    })
};

projectController.fetchProject = (req, res, next) => {
  const { id } = req.params;
  console.log('hiii', id);
  Project.find({_id: id})
    .populate({
      path: 'services',
      model: 'services',
      populate: {
        path: 'ownedBy',
        model: 'teams'
      }
    })
    .then((data) =>{
      console.log(data);
      res.locals.response = data[0];
      next();
    })
    .catch((err) => {
      next({
        log: `Fetch project - ERROR: ${err}`,
        message: {
          err: 'Error occured in projectController.fetchProject',
          message: err,
        },
      });
    })
};


projectController.deleteProject = (req, res, next) => {
  const {id} = req.params;

  Project.findOneAndDelete({_id: id})
    .then((data) => {
      next();
    })
    .catch((err) => {
      next({
        log: `Delete project - ERROR: ${err}`,
        message: {
          err: 'Error occured in projectController.deleteProject',
          message: err,
        },
      });
    });
};

export default projectController;
