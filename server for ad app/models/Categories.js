const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
  category_name: String

},{versionKey : false})

module.exports = mongoose.model('Categories', CategorySchema)