var app = require('../../express');

var pageModel = require('../model/page/page.model.server');

var pages = [
{ "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
{ "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
{ "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" },
{ "_id": "546", "name": "Post 4", "websiteId": "567", "description": "Lorem" }
];

app.get('/api/assignment/website/:websiteId/page', findPageByWebsiteId);
app.get('/api/assignment/page/:pageId', findPageById);
app.post('/api/assignment/website/:websiteId/page', createPage);
app.put('/api/assignment/page/:pageId', updatePage);
app.delete('/api/assignment/page/:pageId', deletePage);

function findPageByWebsiteId(req, res) {
// var results = [];
//
// for (var v in pages){
//     if(pages[v].websiteId === req.params.websiteId) {
//         results.push(pages[v]);
//     }
// }
//
// res.json(results);

    var websiteId = req.params['websiteId'];
    pageModel
        .findAllPagesForWebsite(websiteId)
        .then(function (pages) {
                res.json(pages);
            },
            function (error) {
                res.json(error);
            }
        );
}

function createPage(req, res) {
// var page = req.body;
// pages.push(page);
// res.json(page);
    var websiteId = req.params['websiteId'];
    var page = req.body;
    console.log("creating page");
    pageModel
        .createPage(websiteId, page)
        .then(function (page) {
            console.log("creating page");
                res.json(page);
            },
            function (error) {
                res.json(error);
            }
        );
}

function deletePage(req, res) {
// var page = req.body;
// for(var u in pages) {
//     if(pages[u]._id === req.params.pageId) {
//         pages.splice(u, 1);
//         res.sendStatus(200);
//         return;
//     }
    var pageId = req.params['pageId'];
    pageModel
        .deletePage(pageId)
        .then(function (status) {
                res.sendStatus(200);
            },
            function (error) {
                res.status(404).json(error);
            }
        );

// }
// res.sendStatus(404);

}

function findPageById(req, res) {
// var pageId = req.params['websiteId']
// for(var u in pages){
//     if(pages[u]._id === req.params.pageId) {
//         res.send(pages[u]);
//         return;
//     }
// }
// res.sendStatus(404).send({message: 'Page was not found'});

    var pageId = req.params['pageId'];
    pageModel
        .findPageById(pageId)
        .then(function (page) {
                res.json(page);
            },
            function (error) {
                res.status(404).json(error);
            }
        );
}


function updatePage(req, res) {

// var page = req.body;
// for(var u in pages) {
//     if(pages[u]._id === req.params.pageId) {
//         pages[u] = page;
//         res.sendStatus(200);
//         return;
//     }
// }
// res.sendStatus(404);

    var page = req.body;
    var pageId = req.params['pageId'];
    pageModel
        .updatePage(pageId, page)
        .then(function (status) {
                res.sendStatus(200);
            },
            function (error) {
                res.status(404).json(error);
            }
        );
}

