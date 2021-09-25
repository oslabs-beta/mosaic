import mongoose from 'mongoose';
import {options} from './helpers';

const Schema = mongoose.Schema;
const {
  Types: { 
    Mixed,
    Number,
    ObjectId, 
    String 
  },
} = Schema;

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
      default: "",
    },
    services: {
      type: [ObjectId],
      default: [],
    },
    serviceCount: {
      type: Number,
      default: 0,
    },
  },
  options,
);

const Project = mongoose.model('projects', ProjectSchema);
export default Project;
