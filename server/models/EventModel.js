import mongoose from 'mongoose';
import {options} from './helpers';

const Schema = mongoose.Schema;
const {
  Types: { 
    Mixed,
    ObjectId, 
    String 
  },
} = Schema;

const EventSchema = new Schema(
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
    servicesId: {
      type: [ObjectId],
      default: [],
    },
    properties: {
      type: Mixed,
      default: {},
    }
  },
  options,
);

const Event = mongoose.model('events', EventSchema);
export default {Event};