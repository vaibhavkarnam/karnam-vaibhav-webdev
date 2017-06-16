var mongoose = require('mongoose');

var websiteSchema = mongoose.Schema({
    _user: {type: mongoose.Schema.Types.ObjectId, ref: "userModel"},
    name: String,
    description: String,
    dateCreated: {type: Date, default: Date.now}
 }, {collection: 'graduate_website'});

module.exports = websiteSchema;

// var mongoose = require('mongoose');
//
// var websiteSchema = mongoose.Schema({
//     _user:{type:mongoose.Schema.Types.ObjectId, ref:"GraduateUserModel"},
//     name: String,
//     description: String,
//     dateCreated: {type: Date, default: Date.now}
// }, {collection: 'website'});
//
// module.exports = websiteSchema;
