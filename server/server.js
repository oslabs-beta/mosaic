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

const startServer = () => {
  app.listen(PORT);
  console.log("Express server is running on port 8080")
};

startServer();