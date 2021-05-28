import Service from '../models/ServiceModel';
const serviceController = {};

serviceController.registerService = (req, res, next) => {
  const {name, description, version, ipAddress, host, status, projectId} = req.body;

  Service.create({
    name,
    version,
    ipAddress,
    host,
    status: status || 'Pending',
    dependency: [],
    events: [],
    description,
    projectId: projectId || '60a7210af2ee8c64dc1f611a',
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

export default serviceController;
