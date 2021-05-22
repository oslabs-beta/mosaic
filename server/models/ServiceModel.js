import mongoose from 'mongoose';
import {options} from './helpers';

const Schema = mongoose.Schema;
const {
  Types: {
    ObjectId,
    String,
  }
} = Schema;

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
      type: [ObjectId],
      default: [],
    },
    events: {
      type: [ObjectId],
      default: [],
    },
    description: {
      type: String,
      default: "",
    },
    projectId: {
      type: ObjectId,
      required: true,
    },
  },
  options
);

const Service = mongoose.model('services', ServiceSchema);
export default {Service};