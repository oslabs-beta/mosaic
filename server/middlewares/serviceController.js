const Service = require('../models/ServiceModel');
const serviceController = {};

serviceController.registerService = (req, res, next) => {
  const {name, description, version, ipAddress, host} = req.body;

  Service.create({
    name,
    description,
    version,
    ipAddress,
    host,
  })
    .then((data) => {
      res.locals.response = data;
      console.log('serviceController.registerService:', 'service registered');
      return next();
    })
    .catch((error) => {
      return next({
        log: `Register Service - ERROR: ${error}`,
        message: {
          err: 'Error occured in serviceController.registerService',
          message: error,
        },
      });
    });
};

module.exports = serviceController;
