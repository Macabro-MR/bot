// userDatabase.js
const mongoose = require('mongoose');

const usuario = mongoose.Schema({
  username: { type: String },
  password: { type: String },
}, { versionKey: false });

module.exports.usuario = mongoose.model('api', usuario);
