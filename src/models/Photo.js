const mongoose = require('mongoose');

let photoSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    age: {
        type: Number,
        require: true,
    },
    imageUrl: {
        type: String,
        require: true,
        validate: /^https?:\/\//i,
    },
    description: {
        type: String,
        require: true,
    },
    location: {
        type: String,
        require: true,
    },
    commentList: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        }
    ],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    ownerUsername: {
        type:  mongoose.Schema.Types.String,
        ref: 'User'
    }
});

photoSchema.method('getComment', function () {
    return this.commentList.map(x => x._id);
});

photoSchema.method('getUsername', function () {
    return this.commentList.map(x => x.username);
});

// photoSchema.method('getUsernameOfOwner', function () {
//     return this.owner.username;
// })

let Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;