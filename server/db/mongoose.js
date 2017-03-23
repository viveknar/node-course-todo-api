const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MOGODB_URI || 'mongodb://127.0.0.1:27017/TodoApp');

module.exports.mongoose = mongoose;