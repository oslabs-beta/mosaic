import mongoose from 'mongoose';
import dotenv from "dotenv";

dotenv.config();

mongoose.pluralize(null);

mongoose.connect(process.env.MONGO_DB_URI, {
  // options for the connect method to parse the URI
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to Resourcus DB.'))
  .catch((err) => console.log(err));
