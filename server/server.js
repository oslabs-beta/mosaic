const express = require("express");
const cors = require("cors");
const projectRouter = require('./routes/project');
require('./db');

const PORT = 8080;
const app = express();


app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/projects', projectRouter);

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = { ...defaultErr, ...err };
  console.log(errorObj.status, errorObj.message);
  return res.status(errorObj.status).send(errorObj.message.err);
});

const startServer = () => {
  app.listen(PORT);
  console.log("Express server is running on port 8080")
};

startServer();