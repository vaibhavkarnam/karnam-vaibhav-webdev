var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
//var db = require('../../app')
var userProjectModel = mongoose.model('userProjectModel', userSchema);

userProjectModel.createUser = createUser;
userProjectModel.findUserById = findUserById;
userProjectModel.findAllUsers = findAllUsers;
userProjectModel.findUserByUsername = findUserByUsername;
userProjectModel.findUserByCredentials = findUserByCredentials;
userProjectModel.updateUser = updateUser;
userProjectModel.deleteUser = deleteUser;
userProjectModel.addWebsite = addWebsite;
userProjectModel.deleteWebsite = deleteWebsite;
userProjectModel.findUserByGoogleId = findUserByGoogleId;
userProjectModel.findUserByFacebookId = findUserByFacebookId;
userProjectModel.addToFriendRequest = addToFriendRequest;
userProjectModel.removeFromFriendRequest = removeFromFriendRequest;
userProjectModel.addFriend = addFriend;
userProjectModel.removeFriend = removeFriend;
userProjectModel.addToFavorites = addToFavorites;
userProjectModel.removeFromFavorites = removeFromFavorites;
userProjectModel.uploadImage = uploadImage;
userProjectModel.addNote = addNote;
userProjectModel.deleteNote = deleteNote;
userProjectModel.getUsers =getUsers;

module.exports = userProjectModel;

function uploadImage(userId, url) {
    return userProjectModel
        .update(
            {_id: userId},
            {
                $set: {
                    displayPicture: url
                }
            }
        );
}

function getUsers() {
    return userProjectModel.find();
}

function addNote(userId, note) {
    return userProjectModel.update(
        {_id: userId},
        {$push: {notes: note}}
    );
}

function deleteNote(userId, note) {
    return userProjectModel.update(
        {_id: userId},
        {$pull: {notes: note}}
    );
}

function addToFriendRequest(userId, friendId) {
    return userProjectModel.update(
        {_id: userId},
        {$push: {friendRequest: friendId}}
    );
}

function removeFromFriendRequest(userId, friendId) {
    return userProjectModel.update(
        {_id: userId},
        {$pull: {friendRequest: friendId}}
    );
}


function addFriend(userId, friendId) {
    return userProjectModel.update(
        {_id: userId},
        {$push: {friends: friendId}}
    );
}

function removeFriend(userId, friendId) {
    return userProjectModel.update(
        {_id: userId},
        {$pull: {friends: friendId}}
    );
}


function addToFavorites(userId, venue) {
    console.log(userId);
    console.log(venue);
    return userProjectModel.update(
        {_id: userId},
        {$push: {favorites: venue}}
    );
}

function removeFromFavorites(userId, venueId) {
    return userProjectModel.update(
        {_id: userId},
        {$pull: {favorites: {venueId: venueId}}}
    );
}

function findUserByGoogleId(googleId) {
    return userProjectModel
        .findOne({'google.id':googleId});
}

function findUserByFacebookId(facebookId) {
    return userProjectModel
        .findOne({'facebook.id':facebookId});
}
// function findUserByGoogleId(googleId) {
//     return userProjectModel.findOne({'google.id' : googleId});
// }

function deleteWebsite(userId, websiteId) {
    return userProjectModel
        .findById(userId)
        .then(function (user) {
            var index = user.websites.indexOf(websiteId);
            user.websites.splice(index, 1);
            return user.save();
        });
}

function addWebsite(userId, websiteId) {
    return userProjectModel
        .findById(userId)
        .then(function (user) {
            user.websites.push(websiteId);
            return user.save();
        });
}

function createUser(user) {
    return userProjectModel.create(user);
}

function findUserById(userId) {
    return userProjectModel.findById(userId);
}

function findAllUsers() {
    return userProjectModel.find();
}

function findUserByUsername(username) {
    return userProjectModel.findOne({username: username});
}

function findUserByCredentials(username, password) {
    return userProjectModel.findOne({username: username, password: password});
}

function updateUser(userId, newUser) {
    delete newUser.username;
    delete newUser.password;
    return userProjectModel.update({_id: userId}, {$set: newUser});
}

function deleteUser(userId) {
    return userProjectModel.remove({_id: userId});
}