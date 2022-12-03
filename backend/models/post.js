const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true,
        maxLenght : 300
    },
    picture: {
        type: String,
    },
    video: {
        type: String,
    },
    usersLiked: {
        type: [String],
        required: true
    },
    comments: {         // tout va être gérer par le frontend
        type: [
            {
            commentId: String,
            userId: String,
            text: String,
            timestamp: Date
            }
        ],
    },
    dateSave : {
        type: Date,
        default: new Date().getTime()
    }
}
);

module.exports = mongoose.model('Post', postSchema);