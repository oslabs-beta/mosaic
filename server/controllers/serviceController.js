import Service from '../models/ServiceModel';
import Project from '../models/ProjectModel';
const serviceController = {};

serviceController.registerService = async (req, res, next) => {
  const {name, description, version, ipAddress, host, status, projectId, ownedBy} = req.body;

  try {
    const existingService = await Service.findOne({name});
    if (existingService && existingService.projectId === projectId) {
      next({
        status: 400, 
        log: `Register Service - ERROR: A service with the duplicate name exists`,
        message: {
          err: 'Error occured in serviceController.registerService',
          message: 'A service with the duplicate name exists',
        },
      });
    } else {
      const newService = await Service.create({
        name,
        version,
        ipAddress,
        host,
        status: status || 'Pending',
        dependency: [],
        events: [],
        description,
        projectId: projectId || '60a7210af2ee8c64dc1f611a',
        ownedBy,
      });
      res.locals.response = newService;
      console.log('serviceController.registerService:', 'service registered');

      const updatedProject = await Project.findByIdAndUpdate(
        projectId, 
        {
          $push: {
            services: newService._id
          },
          $inc: {
            serviceCount: 1
          }
        }
      ).exec();
      console.log('serviceController.registerService:', 'service pushed into the project\'s services');
      next();
    }
  } catch (error) {
    console.log('inside service create: ', error);
    next({
      log: `Register Service - ERROR: ${error}`,
      message: {
        err: 'Error occured in serviceController.registerService',
        message: error,
      },
    });
  }
};

serviceController.findServiceById = (req, res, next) => {
  const {id} = req.params;

  Service.findById(id)
    .populate({
      path: 'ownedBy',
      model: 'teams',
    })
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

serviceController.updateServiceById = async (req, res, next) => {
  console.log('update service req body: ', req.body);
  const {id} = req.params;

  try {
    const newService = await Service.findByIdAndUpdate(id, req.body);
    res.locals.response = newService;
    console.log('serviceController.updateServiceById:', 'service updated');
    next();
  } catch (e) {
    next({
      log: `Update Service by ID - ERROR: ${error}`,
      message: {
        err: 'Error occured in serviceController.updateServiceById',
        message: error,
      },
    });
  }
};

serviceController.deleteServiceById = async (req, res, next) => {
  console.log('delete service req body: ', req.body);
  const {id, projectId} = req.params;

  try {
    const data = await Service.findByIdAndDelete(id);
    res.locals.response = data;
    console.log('serviceController.deleteServiceById:', 'service deleted');
    next();
  } catch (error) {
    next({
      log: `Delete Service by ID - ERROR: ${error}`,
      message: {
        err: 'Error occured in serviceController.deleteServiceById',
        message: error,
      },
    });
  }
}

export default serviceController;
