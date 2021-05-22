const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const options = {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
};

const ServiceSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    version: {
      type: String,
      required: true,
    },
    ipAddress: {
      type: String,
      required: true,
    },
    host: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    dependency: {
      type: Array,
    },
    events: {
      type: Array,
    },
    description: {
      type: String,
      required: true,
    },
    projectId: {
      type: String,
      required: true,
    },
  },
  options,
);

const Service = mongoose.model('services', ServiceSchema);
module.exports = Service;
