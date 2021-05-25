const express = require('express');
const serviceController = require('../middlewares/serviceController');
const router = express.Router();

router.post('/register', serviceController.registerService, (req, res) => {
  console.log('register service router is working');
  console.log(res.locals.response);
  res.status(200).json(res.locals.response);
});

module.exports = router;
