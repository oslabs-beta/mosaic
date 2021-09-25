import express from 'express';
import customEventsController from '../controllers/customEventsController'
const router = express.Router();

router.get('/', customEventsController.fetchCustomEvents, (req, res) => {
    console.log(res.locals.response);
    res.status(200).json(res.locals.response);
});

router.post('/create', customEventsController.createCustomEvent, (req, res) => {
  console.log(res.locals.response);
  res.status(200).json(res.locals.response);
});

export default router;