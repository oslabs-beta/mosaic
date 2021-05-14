const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const PORT = 8080;
const app = express();

const startServer = () => {
  app.listen(PORT);
  console.log("Express server is running on port 8080")
};

startServer();