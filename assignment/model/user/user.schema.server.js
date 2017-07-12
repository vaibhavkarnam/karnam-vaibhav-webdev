var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: {type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    roles: [{type: String, default: 'USER', enum: ['USER', 'STUDENT', 'FACULTY', 'ADMIN']}],
    google:{
        id: String,
        token: String
    },
    facebook: {
        id:    String,
        token: String
    },
    websites: [{type: mongoose.Schema.Types.ObjectId, ref: "GraduateWebsiteModel"}],
    dateCreated: {type: Date, default: Date.now}
}, {collection: "user"});

module.exports = userSchema;