var mongoose = require('mongoose');
var pageSchema = require('./page.schema.server');
var pageModel = mongoose.model('GraduatePageModel', pageSchema);
var websiteModel = require('../website/website.model.server');

pageModel.createPage = createPage;
pageModel.findAllPagesForWebsite = findAllPagesForWebsite;
pageModel.findPageById = findPageById;
pageModel.updatePage = updatePage;
pageModel.deletePage = deletePage;
pageModel.addWidget = addWidget;

module.exports = pageModel;

function createPage(websiteId, page) {
    page._website = websiteId;
    console.log("in model");
    return pageModel
        .create(page)
        .then(function (page) {
            console.log("page Created");
            return websiteModel
                .addPage(websiteId, page._id);
        });
}

function findAllPagesForWebsite(websiteId) {
    return pageModel
        .find({_website: websiteId});
}

function findPageById(pageId) {
    return pageModel
        .findOne({_id: pageId});
}

function updatePage(pageId, page) {
    return pageModel
        .update({_id: pageId}, {$set: page});
}

function deletePage(pageId) {
    return pageModel
        .remove({_id: pageId});
}

function addWidget(pageId, widgetId) {
    return pageModel
        .findOne({_id: pageId})
        .then(function (page) {
            page.widgets.push(widgetId);
            return page.save();
        })
}



// var mongoose = require('mongoose');
// var pageSchema = require('./page.schema.server');
// var pageModel = mongoose.model('GraduatePageModel', pageSchema);
// var userModel = require('../user/user.model.server');
// var websiteModel = require('../website/website.model.server');
//
// // api
// pageModel.findAllpages = findAllpages;
// pageModel.findPageById = findPageById;
// pageModel.updatePage = updatePage;
// pageModel.createPageForWebsite = createPageForWebsite;
// pageModel.findAllPagesForWebsite = findAllPagesForWebsite;
// pageModel.deletePageFromWebsite = deletePageFromWebsite;
//
// module.exports = pageModel;
//
// function findPageById(pageId) {
//     return pageModel.findById(pageId);
// }
//
//
// function updatePage(pageId, newPage) {
//     return pageModel.update({_id: pageId}, {$set: newPage});
// }
//
// function deletePageFromWebsite(pageId, websiteId) {
//     return pageModel
//         .remove({_id: pageId})
//         .then(function (status) {
//             return websiteModel
//                 .deletePage(websiteId, pageId);
//         });
// }
//
// function findAllPagesForWebsite(websiteId) {
//     return pageModel
//         .find({_website: websiteId})
//         .populate('_website')
//         .exec();
// }
//
// function createPageForWebsite(websiteId, page) {
//     page._website = websiteId;
//     return pageModel
//         .create(page)
//         .then(function (page) {
//             return websiteModel
//                 .addPage(websiteId, page._id)
//         })
// }
//
// function findAllpages() {
//     return pageModel.find();
// }