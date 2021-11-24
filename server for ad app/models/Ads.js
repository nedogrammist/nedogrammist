
const mongoose = require('mongoose')

const AdSchema = new mongoose.Schema({
  ad_name: String,
  description: String,
  user_id: String,
  ad_category: String,
  price: String

},{versionKey : false})

module.exports = mongoose.model('Ads', AdSchema)