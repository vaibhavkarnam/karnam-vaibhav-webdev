var app = require('../../express');

var multer = require('multer'); // npm install multer --save
var upload = multer({dest: __dirname + '/../../public/assignment/uploads'});

var widgetModel = require('../model/widget/widget.model.server');


var widgetTypes = [
    { "widgetType": "HEADING", "text": "Heading" },
    { "widgetType": "IMAGE", "text": "Image" },
    { "widgetType": "YOUTUBE", "text": "YouTube" },
    { "widgetType": "HTML", "text": "HTML" },
    { "widgetType": "TEXT", "text": "Text" }

];

app.get('/api/assignment/page/:pageId/widget', findWidgetsByPageId);
app.get('/api/assignment/widget/:widgetId', findWidgetById);
app.post('/api/assignment/page/:pageId/widget', createWidget);
app.put('/api/assignment/widget/:widgetId', updateWidget);
app.put('/api/page/:pageId/widget', WidgetReOrder);
app.get ('/api/getwidget', findWidgetTypes);
app.delete('/api/assignment/widget/:widgetId', deleteWidget);
app.post("/api/upload/", upload.single('myFile'), uploadImage);

function findWidgetTypes(req, res) {
    return res.json(widgetTypes);
}

function findWidgetsByPageId(req, res) {

// var pageId = req.params['pageId'];
// var results = findWidgets(pageId);
// res.json(results);
    var pageId = req.params['pageId'];
    widgetModel
        .findAllWidgetsForPage(pageId)
        .sort({order: 1})
        .then(function (widgets) {
                res.json(widgets);
            }, function (error) {
                res.json(error);
            }
        );
}

function WidgetReOrder(req, res) {
if (req.query['initial'] && req.query['final']) {
    var initial = parseInt(req.query['initial']);
    var final = parseInt(req.query['final']);
    var pageId = req.params['pageId'];
  //  var results = findWidgets(pageId);
    // if (initial >= 0 && final < results.length)
    // {
    //     var oldindex, newindex, newPos;
    //
    //     if (initial < final) {
    //         oldindex = initial;
    //         newindex = final;
    //         newPos = -1;
    //     } else {
    //         oldindex = final;
    //         newindex = initial;
    //         newPos = 1;
    //     }
    //     for (var i=oldindex; i <= newindex; i++)
    //     {
    //         if (i === initial)
    //             results[i].index = final;
    //         else
    //             results[i].index += newPos;
    //     }
    //
    //     res.sendStatus(200);
    //     return;
    // }
    widgetModel
        .widgetReorder(pageId, initial, final)
        .then(function (status) {
                res.sendStatus(200);
            }, function (error) {
                res.json(error);
            }
        );
}
else {
    res.sendStatus(404);
}
}


function createWidget(req, res) {
// var pageId = req.params['pageId'];
//
// var widget = req.body;
// widget.index = findWidgets(pageId).length;
// widgets.push(widget);
// res.json(widget._id);
    var pageId = req.params['pageId'];
    var widget = req.body;
    console.log("creating widget");
    widgetModel
        .createWidget(pageId, widget)
        .then(function (widget) {
                res.json(widget);
            }, function (error) {
                res.json(error);
            }
        );
}


function deleteWidget(req, res) {
//
//
// var widget = req.body;
// for (var u in widgets) {
//     if (widgets[u]._id === req.params.widgetId) {
//         widgets.splice(u, 1);
//         res.sendStatus(200);
//         return;
//     }
// }
// res.sendStatus(404);

    var widgetId = req.params['widgetId'];
    widgetModel
        .deleteWidget(widgetId)
        .then(function (status) {
                res.sendStatus(200);
            }, function (error) {
                res.json(error);
            }
        );
}

function findWidgetById(req, res) {
// var widgetId = req.params['widgetId']
// for (var u in widgets) {
//     if (widgets[u]._id === widgetId) {
//         res.send(widgets[u]);
//         return;
//     }
// }
// res.sendStatus(404);
    var widgetId = req.params['widgetId'];
    widgetModel
        .findWidgetById(widgetId)
        .then(function (widget) {
                res.json(widget);
            }, function (error) {
                res.json(error);
            }
        );
}


function findWidgetByIdServer(req, res) {
var widgetId = req.params['widgetId']
for (var u in widgets) {
    if (widgets[u]._id === widgetId) {
        res.send(widgets[u]);
        return;
    }
}
res.sendStatus(404);
}

function updateWidget(req, res) {


// var widget = req.body;
// for (var u in widgets) {
//     if (widgets[u]._id === req.params.widgetId) {
//         widgets[u] = widget;
//         res.sendStatus(200);
//         return;
//     }
// }
//
// res.sendStatus(404);
    var widget = req.body;
    var widgetId = req.params['widgetId'];
    widgetModel
        .updateWidget(widgetId, widget)
        .then(function (status) {
                res.sendStatus(200);
            }, function (error) {
                res.json(error);
            }
        );
}


function uploadImage(req, res) {

var widgetId = req.body.widgetId;
var width = req.body.width;
var myFile = req.file;

var userId = req.body.userId;
var websiteId = req.body.websiteId;
var pageId = req.body.pageId;

var originalname = myFile.originalname; // file name on user's computer
var filename = myFile.filename;     // new file name in uploads folder
var path = myFile.path;         // full path of uploaded file
var destination = myFile.destination;  // folder where file is saved to
var size = myFile.size;
var mimetype = myFile.mimetype;


// for (var u in widgets) {
//     if (widgets[u]._id === widgetId) {
//         var widget = widgets[u];
//     }
// }
var url = '/assignment/uploads/' + filename;

    widgetModel
        .updateWidgetUrl(widgetId, url)
        .then(function () {
            var callbackUrl = "/assignment/#!/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget";

            res.redirect(callbackUrl);
        });
}


