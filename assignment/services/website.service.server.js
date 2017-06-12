var app = require('../../express');

var websiteModel = require('../model/website/website.model.server');

var websites = [
{ "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
{ "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
{ "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
{ "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
{ "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
{ "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
{ "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
];

app.get('/api/assignment/user/:userId/website', findAllWebsitesForUser);
app.get('/api/assignment/website/:websiteId', findWebsiteById);
app.post('/api/assignment/user/:userId/website', createWebsite);
app.put('/api/assignment/website/:websiteId', updateWebsite);
app.delete('/api/assignment/website/:websiteId', deleteWebsite);

function findAllWebsitesForUser(req, res) {
// var results = [];
//
// for (var v in websites){
//     if(websites[v].developerId === req.params.userId) {
//         results.push(websites[v]);
//     }
// }
//
// res.json(results);


    websiteModel
        .findAllWebsitesForUser(req.params.userId)
        .then(function (websites) {
              res.json(websites);
        })
}

function createWebsite(req, res) {

    var website = req.body;
    var userId = req.params.userId;
    websiteModel
        .createWebsiteForUser(userId, website)
        .then(function (website) {
            console.log(website);
            res.json(website);
        });
}

function deleteWebsite(req, res) {
    var websiteId = req.params.websiteId;
    var userId = req.params.userId;
    websiteModel
        .deleteWebsiteFromUser(userId, websiteId)
        .then(function (status) {
            res.json(status);
        });
}

function findWebsiteById(req, res) {
// var websiteId = req.params['websiteId']
// for(var u in websites){
//     if(websites[u]._id === websiteId) {
//         res.send(websites[u]);
//         return;
//     }
// }
// res.sendStatus(404).send({message: 'Website was not found'});


    var websiteId = req.params['websiteId'];

    websiteModel
        .findWebsiteById(websiteId)
        .then(function (website) {
            res.json(website);
        });
}


function updateWebsite(req, res) {

// var website = req.body;
// for(var u in websites) {
//     if(websites[u]._id === req.params.websiteId) {
//         websites[u] = website;
//         res.sendStatus(200);
//         return;
//     }
// }
// res.sendStatus(404);


    var website = req.body;
    websiteModel
        .updateWebsite(req.params.websiteId, website)
        .then(function (status) {
            res.send(status);
        });
}

