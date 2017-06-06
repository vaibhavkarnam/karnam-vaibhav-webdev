var app = require('../../express');

    var multer = require('multer'); // npm install multer --save
    var upload = multer({dest: __dirname + '/../../public/assignment/uploads'});


    var widgets = [
        {"_id": "123", "widgetType": "HEADING", "pageId": "546", "size": 2, "text": "GIZMODO", "name": "GIZMODO"},
        {"_id": "234", "widgetType": "HEADING", "pageId": "546", "size": 4, "text": "Lorem ipsum", "name": "GIZMODO"},
        {
            "_id": "345", "widgetType": "IMAGE", "pageId": "546", "width": "100%",
            "url": "http://lorempixel.com/400/200/", "name": "GIZMODO", "text": "GIZMODO"
        },
        {"_id": "456", "widgetType": "HTML", "pageId": "546", "text": "<p>Lorem ipsum</p>", "name": "GIZMODO"},
        {"_id": "567", "widgetType": "HEADING", "pageId": "546", "size": 4, "text": "Lorem ipsum", "name": "GIZMODO"},
        {
            "_id": "678", "widgetType": "YOUTUBE", "pageId": "546", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E", "name": "GIZMODO", "text": "GIZMODO"
        },
        {"_id": "789", "widgetType": "HTML", "pageId": "546", "text": "<p>Lorem ipsum</p>", "name": "GIZMODO"}
    ];

    app.get('/api/assignment/page/:pageId/widget', findWidgetsByPageId);
    app.get('/api/assignment/widget/:widgetId', findWidgetById);
    app.post('/api/assignment/page/:pageId/widget', createWidget);
    app.put('/api/assignment/widget/:widgetId', updateWidget);
    app.delete('/api/assignment/widget/:widgetId', deleteWidget);
    app.post("/api/upload", upload.single('myFile'), uploadImage);


    function findWidgetsByPageId(req, res) {

        var results = [];

        for (var v in widgets) {
            if (widgets[v].pageId === req.params.pageId) {
                results.push(widgets[v]);
            }
        }

        res.json(results);


        // var results = [];
        //
        // for (var v in websites){
        //     if(websites[v].developerId === req.params.userId) {
        //         results.push(websites[v]);
        //     }
        // }
        //
        // res.json(results);
    }

    function createWidget(req, res) {

        var widget = req.body;
        widgets.push(widget);
        res.json(widget._id);
        // var website = req.body;
        // websites.push(website);
        // res.json(website);
    }

    function deleteWidget(req, res) {


        var widget = req.body;
        for (var u in widgets) {
            if (widgets[u]._id === req.params.widgetId) {
                widgets.splice(u, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);

    }

    function findWidgetById(req, res) {
        var widgetId = req.params['widgetId']
        for (var u in widgets) {
            if (widgets[u]._id === widgetId) {
                res.send(widgets[u]);
                return;
            }
        }
        res.sendStatus(404);
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

        // var website = req.body;
        // for(var u in websites) {
        //     if(websites[u]._id === req.params.websiteId) {
        //         websites[u] = website;
        //         res.sendStatus(200);
        //         return;
        //     }
        // }
        // res.sendStatus(404);


        var widget = req.body;
        for (var u in widgets) {
            if (widgets[u]._id === req.params.widgetId) {
                widgets[u] = widget;
                res.sendStatus(200);
                return;
            }
        }

        res.sendStatus(404);
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


        for (var u in widgets) {
            console.log("inside");
            if (widgets[u]._id === widgetId) {
                console.log("inside for");
                var widget = widgets[u];
            }
        }
        widget.url = '/assignment/uploads/' + filename;
        console.log(widget.url);

        var callbackUrl = "/assignment/#!/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget";

        res.redirect(callbackUrl);
    }

