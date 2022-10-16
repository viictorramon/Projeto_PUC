const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/agendaautomotiva_db');
mongoose.Promise = global.Promise;

module.exports = mongoose;