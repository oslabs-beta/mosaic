import mongoose from 'mongoose';
const CustomEvent = mongoose.model('customEvents');
const customEventsController = {};


customEventsController.fetchCustomEvents = (req, res, next) => {
    CustomEvent.find({})
      .then((data) =>{
        res.locals.response = data;
        next();
      })
      .catch((err) => {
        next({
          log: `Fetch customer events - ERROR: ${err}`,
          message: {
            err: 'Error occured in customEventsController.fetchCustomEvents',
            message: err,
          },
        });
      })
  };


customEventsController.createCustomEvent = (req, res, next) => {
    console.log("req.body.customEventPayload,")
    console.log(req.body.customEventPayload)
    console.log("req.body")
    console.log(req.body)
    
    CustomEvent.create({
      name: req.body.customEventName, 
      date: req.body.customEventDate,
      payload: req.body.customEventPayload,
    })
      .then((data) => {
        res.locals.response = data;
        next();
      })
      .catch((err) => {
        next({
          log: `Create Custom Event - ERROR: ${err}`,
          message: {
            err: 'Error occured in customEventsController.createCustomEvent',
            message: err,
          },
        });
      })
  };

  export default customEventsController;