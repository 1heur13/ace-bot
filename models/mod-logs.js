const { Schema, model } = require("mongoose")


module.exports = model('mod-logs', new Schema({
  Guild: String,
  Channel: String,
}))