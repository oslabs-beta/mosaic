const mongoose = require('mongoose');
const keys = require('./keys');

mongoose.pluralize(null);

mongoose.connect(keys.MONGO_DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to Mosaic DB.'))
  .catch((err) => console.log(err));
