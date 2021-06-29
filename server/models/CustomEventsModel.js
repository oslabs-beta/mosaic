import mongoose from 'mongoose';
import {options} from './helpers';

const Schema = mongoose.Schema;
const {
  Types: { 
    String,
    Object,
  },
} = Schema;

const CustomEventSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    date: {
      type: Date, 
      default: Date.now(),
    },
    payload: {
        type: Object,
        default: {}
    }
  },
  options,
);

const CustomEvent = mongoose.model('customEvents', CustomEventSchema);
export default CustomEvent;
