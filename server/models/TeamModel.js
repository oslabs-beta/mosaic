import mongoose from 'mongoose';
import {options} from './helpers';
const Schema = mongoose.Schema;
const {
  Types: {ObjectId, String},
} = Schema;

const TeamSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    ownedServices: {
      type: [ObjectId],
      default: [],
    },
  },
  options
);

const Team = mongoose.model('teams', TeamSchema);
export default Team;