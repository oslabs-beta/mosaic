const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    services: {
      type: array,
    },
    serviceCount: {
      type: Number,
    },
  },
  options
);

const Project = mongoose.model('Project', ProjectModel);
module.exports = { Project };