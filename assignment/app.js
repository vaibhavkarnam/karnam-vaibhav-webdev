var mongoose = require('mongoose');
var connectionString = 'mongodb://127.0.0.1:27017/webdev'; // for local
if(process.env.MLAB_USERNAME_WEBDEV) { // check if running remotely
    var username = process.env.MLAB_USERNAME_WEBDEV; // get from environment
    var password = process.env.MLAB_PASSWORD_WEBDEV;
    connectionString = 'mongodb://' + username + ':' + password;
    connectionString += '@ds011495.mlab.com:11495/heroku_l08l5qhv'; // user yours
}

mongoose.connect(connectionString);

// var db = mongoose.connection;
// db.once('open',function () {
//     console.log("open");
// });


mongoose.Promise = require('q').Promise;

require('./services/user.service.server.js');
require('./services/website.service.server');
require('./services/page.service.server');
require('./services/widget.service.server');


