var mongoose = require('mongoose');

var usersSchema = mongoose.Schema({
    username: {type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    Houses: [{type: mongoose.Schema.Types.ObjectId, ref: "propertyModel"}],
    dateCreated: {type: Date, default: Date.now}
}, {collection: "projectuser"});

module.exports = usersSchema;