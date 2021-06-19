import express from 'express';
import serviceController from '../controllers/serviceController';

const router = express.Router();

router.post('/register', serviceController.registerService, (req, res) => {
  console.log('register service router is working');
  console.log(res.locals.response);
  res.status(200).json(res.locals.response);
});

router.get('/:id', serviceController.findServiceById, (req, res) => {
  console.log('find service router is working');
  console.log(res.locals.response);
  res.status(200).json(res.locals.response);
});

router.put('/update', serviceController.updateServiceById, (req, res) => {
  console.log('update service router is working');
  console.log(res.locals.response);
  res.status(200).json(res.locals.response);
});

export default router;
