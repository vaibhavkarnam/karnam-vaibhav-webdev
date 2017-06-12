 var mongoose = require('mongoose');
 var websiteSchema = require('./website.schema.server');
 var websiteModel = mongoose.model('GraduateWebsiteModel',websiteSchema);
 var userModel = require('../user/user.model.server');
//
// // api
 websiteModel.findAllWebsites = findAllWebsites;
 websiteModel.findWebsiteById = findWebsiteById;
 websiteModel.updateWebsite = updateWebsite;
 websiteModel.createWebsiteForUser = createWebsiteForUser;
 websiteModel.findAllWebsitesForUser = findAllWebsitesForUser;
 websiteModel.deleteWebsiteFromUser = deleteWebsiteFromUser;
//
 module.exports = websiteModel;
//
function findWebsiteById(websiteId) {
    return websiteModel.findById(websiteId);
}


function updateWebsite(websiteId, newWebsite) {
    return websiteModel.update({_id: websiteId}, {$set: newWebsite});
}
// //
function deleteWebsiteFromUser(userId, websiteId) {
    return websiteModel
        .remove({_id: websiteId})
        .then(function () {
            return userModel
                .deleteWebsite(userId, websiteId);
            return;
        });
}
// //
 function findAllWebsitesForUser(userId) {
     return websiteModel
       .find({_user: userId})
         .populate('_user')
         .exec();
 }
//
 function createWebsiteForUser(userId, website) {
     website._user = userId;
//     //console.log(website);
     return websiteModel.create(website)
         .then(function (website) {
             return userModel
             .addWebsite(userId, website._id)
         });
}
//
 function findAllWebsites() {
     return websiteModel.find();
 }


