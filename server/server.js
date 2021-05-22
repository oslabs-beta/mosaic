const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('./db');

const PORT = 8080;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const projectRouter = require('./routes/project');
app.use('/projects', projectRouter);

const serviceRouter = require('./routes/service');
app.use('/service', serviceRouter);

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: {err: 'An error occurred'},
  };
  const errorObj = {...defaultErr, ...err};
  console.log(errorObj.status, errorObj.message);
  return res.status(errorObj.status).send(errorObj.message.err);
});

const startServer = () => {
  app.listen(PORT);
  console.log('Express server is running on port 8080');
};

startServer();
