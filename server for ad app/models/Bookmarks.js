const mongoose = require('mongoose')

const BookmarksSchema = new mongoose.Schema({
    user_id : {
        type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
    },
    ad_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ads'
    }
}, {versionKey: false})

module.exports = mongoose.model('Bookmarks', BookmarksSchema)