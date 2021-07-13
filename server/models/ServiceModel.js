import mongoose from 'mongoose';
import {options} from './helpers';

const Schema = mongoose.Schema;
const {
  Types: {ObjectId, String},
} = Schema;

const ServiceSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
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
      default: '',
    },
    projectId: {
      type: ObjectId,
      required: true,
    },
    ownedBy: {
      type: ObjectId,
    }
  },
  options,
);

ServiceSchema.post('findOneAndDelete', async (doc, next) => {
  // Remove the referenced objectId from the dependency array of other services
  mongoose.model("services").updateMany(
    {dependency: { $elemMatch: {$eq: doc._id} }},
    {$pull: { dependency: doc._id },},
    {multi:true}, 
    function (err, result) {
      if (err) {
        console.log(`[error] ${err}`);
        next(err);
      } else {
        console.log('success');
        console.log('result --> ', result);
        next();
      }
    }
  );

  mongoose.model("projects").findOneAndUpdate(
    {services: { $elemMatch: {$eq: doc._id} }},
    {
      $pull: { services: doc._id },
      $inc: {
        serviceCount: -1
      }
    },
    {multi:true}, 
    function (err, result) {
      if (err) {
        console.log(`[error] ${err}`);
        next(err);
      } else {
        console.log('success');
        console.log('result --> ', result);
        next();
      }
    }
  );
});

const Service = mongoose.model('services', ServiceSchema);
export default Service;
