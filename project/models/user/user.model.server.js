// var mongoose = require('mongoose');
// var usersSchema = require('./user.schema.server');
// //var db = require('../../app')
// var usersModel = mongoose.model('usersModel', usersSchema);
//
// usersModel.createUser = createUser;
// usersModel.findUserById = findUserById;
// usersModel.findAllUsers = findAllUsers;
// usersModel.findUserByUsername = findUserByUsername;
// usersModel.findUserByCredentials = findUserByCredentials;
// usersModel.updateUser = updateUser;
// usersModel.deleteUser = deleteUser;
// usersModel.addWebsite = addWebsite;
// usersModel.deleteWebsite = deleteWebsite;
//
// module.exports = usersModel;
//
// function deleteWebsite(userId, websiteId) {
//     console.log(userId);
//     return usersModel
//         .findById(userId)
//         .then(function (user) {
//             var index = user.websites.indexOf(websiteId);
//             user.websites.splice(index, 1);
//             return user.save();
//         });
// }
//
// function addWebsite(userId, websiteId) {
//     return usersModel
//         .findById(userId)
//         .then(function (user) {
//             user.websites.push(websiteId);
//             return user.save();
//         });
// }
//
// function createUser(user) {
//     return usersModel.create(user);
// }
//
// function findUserById(userId) {
//     return usersModel.findById(userId);
// }
//
// function findAllUsers() {
//     return usersModel.find();
// }
//
// function findUserByUsername(username) {
//     return usersModel.findOne({username: username});
// }
//
// function findUserByCredentials(username, password) {
//     return usersModel.findOne({username: username, password: password});
// }
//
// function updateUser(userId, newUser) {
//     delete newUser.username;
//     delete newUser.password;
//     return usersModel.update({_id: userId}, {$set: newUser});
// }
//
// function deleteUser(userId) {
//     return usersModel.remove({_id: userId});
// }