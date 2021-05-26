import mongoose from 'mongoose';
import {options} from './helpers';
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    // githubId: {
    //   type: String,
    //   // required: true,
    //   unique: true,
    //   default: "",
    // },
    googleId: {
      type: String,
      required: true,
      unique: true,
      default: "",
    },
    projects: {
      type: Array,
      default: [],
    },
    projectCount: {
      type: Number,
      default: 0,
    },
    companyName: {
      type: String,
      default: "",
    },
  },
  options
);

const User = mongoose.model('users', UserSchema);
export default {User};