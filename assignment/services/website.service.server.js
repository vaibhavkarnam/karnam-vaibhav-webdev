var app = require('../../express');

var websiteModel = require('../model/website/website.model.server');

app.get('/api/assignment/user/:userId/website', findAllWebsitesForUser);
app.get('/api/assignment/website/:websiteId', findWebsiteById);
app.post('/api/assignment/user/:userId/website', createWebsite);
app.put('/api/assignment/website/:websiteId', updateWebsite);
app.delete('/api/assignment/user/:userId/website/:websiteId', deleteWebsite);

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
    console.log(userId);
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
    console.log(userId);
    websiteModel
        .deleteWebsiteFromUser(userId, websiteId)
        .then(function (response) {
            res.json(response);
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

