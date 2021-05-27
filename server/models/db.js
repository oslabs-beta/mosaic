import mongoose from 'mongoose';
import dotenv from "dotenv";

dotenv.config();

const mongoOptions = {
  // options for the connect method to parse the URI
  useUnifiedTopology: true,
  useNewUrlParser: true,
  // useCreateIndex: true
};

mongoose.pluralize(null);
mongoose.connect(process.env.MONGO_DB_URI, mongoOptions)
  .then(() => console.log('Connected to Mosaic DB 🚀🔥'))
  .catch((err) => console.log(err));
