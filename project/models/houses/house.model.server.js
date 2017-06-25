var mongoose = require("mongoose");
var VenueSchemaProject = require("./house.schema.server");
var venueModelProject = mongoose.model("venueModelProject", VenueSchemaProject);

venueModelProject.createVenue = createVenue;
venueModelProject.findVenueById = findVenueById;
venueModelProject.findVenueByVenueId = findVenueByVenueId;
venueModelProject.updateVenue = updateVenue;
venueModelProject.addComment = addComment;
venueModelProject.deleteComment = deleteComment;
venueModelProject.addFavoriteOf = addFavoriteOf;
venueModelProject.removeFavoriteOf = removeFavoriteOf;
venueModelProject.isFavoriteOf = isFavoriteOf;
venueModelProject.deleteVenue = deleteVenue;
venueModelProject.getAllVenue = getAllVenue;


    module.exports = venueModelProject;

    function deleteVenue(venueId) {
        return venueModelProject.remove({"venueId": venueId});
    }

    function getAllVenue() {
        return venueModelProject.find();
    }

    function findVenueByVenueId(venueId) {
        console.log("from model");
        console.log(venueId);
        return venueModelProject.findOne({"venueId": venueId});
    }

    function createVenue(venue) {
        return venueModelProject.create(venue);
    }

    function findVenueById(vId) {
        return venueModelProject.findById(vId);
    }

    function updateVenue(venueId, venue) {
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
    