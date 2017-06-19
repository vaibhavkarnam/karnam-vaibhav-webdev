// /**
//  * Created by vaibhav on 15-06-2017.
//  */
// var app = require('../express');
// var mongoose = require("mongoose");
// //mongoose.connect("mongodb://localhost:27017/webdev");
// //var db = mongoose.connection;
// //db.on('error', console.error.bind(console, 'connection error:'));
// //db.once('open', function() {
// //    console.log("connected")
// //});
// mongoose.Promise=require("q").Promise;
// require('./services/user.service.server');
// //require('./services/website.service.server');
// //require('./services/widget.service.server');
//
//
// require('./services/search-address.service.server');
// require('./xml2json');
//
//
// app.get('/api/lectures/graduate/session',
//     function (req, res) {
//         console.log(req.session);
//         res.send(req.session);
//     });
//
// app.get('/api/lectures/graduate/session/:name/:value',
//     function (req, res) {
//         var name = req.params.name;
//         var value = req.params.value;
//         req.session[name] = {name: value};
//         console.log(req.session);
//         res.send(req.session);
//     });