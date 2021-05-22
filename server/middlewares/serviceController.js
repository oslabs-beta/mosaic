const Service = require('../models/ServiceModel');
const serviceController = {};

serviceController.registerService = (req, res, next) => {
  const {name, description, version, ipAddress, host, status, projectId} = req.body;
  console.log('req body', req.body);
  console.log('name:', name);
  console.log(Service);

  Service.create({
    name,
    version,
    ipAddress,
    host,
    status: status || 'active',
    dependency: [],
    events: [],
    description,
    projectId: projectId || '00000',
  })
    .then((data) => {
      res.locals.response = data;
      console.log('serviceController.registerService:', 'service registered');
      next();
    })
    .catch((error) => {
      console.log('inside create: ', error);
      next({
        log: `Register Service - ERROR: ${error}`,
        message: {
          err: 'Error occured in serviceController.registerService',
          message: error,
        },
      });
    });
};

module.exports = serviceController;
