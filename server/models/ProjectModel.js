const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const options = {
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
};

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
      type: Array,
    },
    serviceCount: {
      type: Number,
    },
  },
  options
);

const Project = mongoose.model('Project', ProjectSchema);
module.exports = Project;