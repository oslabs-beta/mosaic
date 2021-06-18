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
      console.log('inside service create: ', error);
      next({
        log: `Register Service - ERROR: ${error}`,
        message: {
          err: 'Error occured in serviceController.registerService',
          message: error,
        },
      });
    });
};

serviceController.findServiceById = (req, res, next) => {
  const {id} = req.params;

  Service.findById(id)
    .then((data) => {
      res.locals.response = data;
      console.log('serviceController.findServiceById:', 'service found');
      next();
    })
    .catch((error) => {
      next({
        log: `Find Service by ID - ERROR: ${error}`,
        message: {
          err: 'Error occured in serviceController.findServiceById',
          message: error,
        },
      });
    });
};

serviceController.updateServiceById = (req, res, next) => {
  console.log('update service req body: ', req.body);
  const {id, status} = req.body;

  Service.findByIdAndUpdate(id, {status: status})
    .then((data) => {
      res.locals.response = data;
      console.log('serviceController.updateServiceById:', 'service updated');
      next();
    })
    .catch((error) => {
      next({
        log: `Update Service by ID - ERROR: ${error}`,
        message: {
          err: 'Error occured in serviceController.updateServiceById',
          message: error,
        },
      });
    });
};

export default serviceController;
