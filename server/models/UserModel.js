import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const options = {
  timestamps: true, 
  createdAt: "created_at", 
  updatedAt: "updated_at"
};

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
    githubId: {
      type: String,
      // required: true,
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

const User = mongoose.model('User', UserSchema);
export default {User};