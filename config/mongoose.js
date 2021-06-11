const mongoose = require('mongoose');

// to prevent this warning : DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead
mongoose.set('useCreateIndex', true);

// mongoose.connect('mongodb://localhost:27017/blogberry_db', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect('mongodb://localhost:27017/classmanagementsystem', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

// if there is any error
db.on('error', console.error.bind(console, 'error connecting to database'));

// if successfull
db.once('open', () => console.log("Database Connected successfully"));

module.exports = db;