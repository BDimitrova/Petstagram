const mongoose = require('mongoose');

let photoSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        minLength: 2,
    },
    age: {
        type: Number,
        require: true,
        min: 1,
        max: 100
    },
    imageUrl: {
        type: String,
        require: true,
        validate: /^https?:\/\//i,
    },
    description: {
        type: String,
        require: true,
        minLength: 5,
        maxLength:50
    },
    location: {
        type: String,
        require: true,
        minLength: 5,
        maxLength: 30
    },
    commentList: [
        {
            content: {
                type: String,
                require: true
            }
        }
    ],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    ownerUsername: {
        type: String,
    }
});

photoSchema.method('getComment', function () {
    return this.commentList.map(x => x._id);
});

photoSchema.method('getUsername', function () {
    return this.commentList.map(x => x.username);
});

let Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;