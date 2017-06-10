var express1 = require ('express');
var app = express1();

var app = require('./express');


var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configure a public directory to host static content
app.use(express1.static(__dirname + '/public'));

//require ('./test/app')(app);


//var ourapp = require('./lectures/evening/angular/app');
//ourapp(app);

require ('./assignment/app');


var port = process.env.PORT || 3000;

app.listen(port);