const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const options = {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
};

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
    },
    servicesId: 
      {
        type: array,
      },
    
  },
  options
);

const Event = mongoose.model('Event', EventModel);
module.exports = { Event };