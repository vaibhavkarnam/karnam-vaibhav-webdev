
    var mongoose = require("mongoose");

    var VenueSchemaProject = mongoose.Schema({
        venueId: String,
        venueName: String,
        owners: [{type: mongoose.Schema.ObjectId, ref: "userProjectModel"}],
        comments: [{
            value: String,
            commentedOn: {type: Date, default: Date.now()},
            commentedBy: {type: mongoose.Schema.ObjectId, ref: "userProjectModel"}
        }],
        venueAddress: String,
        venueContactNumber: String,
        displayPicture: String,
        photos: [String],
        favoriteOf: [{type: mongoose.Schema.ObjectId, ref: "userProjectModel"}],
        rating: {
            ratedBy: {type: mongoose.Schema.ObjectId, ref: "userProjectModel"},
            value: String
        }
    }, {collection: "project_venue"});

    module.exports = VenueSchemaProject;
