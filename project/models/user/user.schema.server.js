var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: {type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    Phone: String,
    roles: [{type: String, default: 'BUYER', enum: ['USER', 'SELLER', 'BUYER', 'ADMIN']}],
    google:{
        id: String,
        token: String
    },
    facebook: {
        id:    String,
        token: String
    },
    favorites: [{
        venueId: {type: String, ref: "venueModelProject"},
        venueImage: String,
        venueName: String
    }],
    bucketList: [{
        venueId: {type: mongoose.Schema.ObjectId, ref: "venueModelProject"},
        venueImage: String,
        venueName: String
    }],
    notes: [{
        value: String,
        writtenBy: {type: mongoose.Schema.ObjectId, ref: "userProjectModel"},
        createdOn: {type: Date, default: Date.now()}
    }],
    photos: [String],
    friends: [{type: mongoose.Schema.ObjectId, ref: "userProjectModel"}],
    friendRequest: [{type: mongoose.Schema.ObjectId, ref: "userProjectModel"}],
    displayPicture: {type: String, default: "images/user.png"},
    Houses: [{type: mongoose.Schema.Types.ObjectId, ref: "venueModelProject"}],
    dateCreated: {type: Date, default: Date.now}
}, {collection: "user_project_db"});

module.exports = userSchema;