var mongoose = require("mongoose");
var VenueSchemaProject = require("./house.schema.server");
var venueModelProject = mongoose.model("venueModelProject", VenueSchemaProject);

venueModelProject.createHouse = createHouse;
venueModelProject.findHouseById = findHouseById;
venueModelProject.findHouseByHouseId = findHouseByHouseId;
venueModelProject.updateHouse = updateHouse;
venueModelProject.addComment = addComment;
venueModelProject.deleteComment = deleteComment;
venueModelProject.addFavoriteOf = addFavoriteOf;
venueModelProject.removeFavoriteOf = removeFavoriteOf;
venueModelProject.isFavoriteOf = isFavoriteOf;
venueModelProject.deleteHouse = deleteHouse;
venueModelProject.getAllHouse = getAllHouse;


    module.exports = venueModelProject;

    function deleteHouse(venueId) {
        return venueModelProject.remove({"venueId": venueId});
    }

    function getAllHouse() {
        return venueModelProject.find();
    }

    function findHouseByHouseId(venueId) {
        console.log("from model");
        console.log(venueId);
        return venueModelProject.findOne({"venueId": venueId});
    }

    function createHouse(venue) {
        return venueModelProject.create(venue);
    }

    function findHouseById(vId) {
        return venueModelProject.findById(vId);
    }

    function updateHouse(venueId, venue) {
        delete venue._id;
        return venueModelProject
            .update(
                {venueId: venueId},
                {$set: venue}
            );
    }

    function addComment(venueId, comment) {
        return venueModelProject.update(
            {venueId: venueId},
            {$push: {comments: comment}}
        );
    }

    function deleteComment(venueId, comment) {
        return venueModelProject.update(
            {venueId: venueId},
            {$pull: {comments: comment}}
        );
    }

    function addFavoriteOf(venueId, userId) {
        return venueModelProject.update(
            {venueId: venueId},
            {$push: {favoriteOf: userId}}
        );
    }

    function removeFavoriteOf(venueId, userId) {
        return venueModelProject.update(
            {venueId: venueId},
            {$pull: {favoriteOf: userId}}
        );
    }

    function isFavoriteOf(venueId, userId) {
        return venueModelProject.findOne({
            venueId: venueId,
            favoriteOf: {
                $elemMatch: {
                    $eq: userId
                }
            }
        });
    }
    