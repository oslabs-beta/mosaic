const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      unique: true,
    },
    lastName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    githubId: {
      type: String,
      required: true,
      unique: true,
    },
    googleId: {
      type: String,
      required: true,
      unique: true,
    },
    projects: {
      type: Array,
    },
    projectCount: {
      type: Number,
    },
    companyName: {
      type: String,
    },
  },
  options
);

const User = mongoose.model('User', UserModel);
module.exports = { User };