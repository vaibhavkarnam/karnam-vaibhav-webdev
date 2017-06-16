var express1 = require ('express');
var app = express1();

var app = require('./express');


var bodyParser = require('body-parser');
require('body-parser-xml')(bodyParser);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.xml({
    limit: '1MB',   // Reject payload bigger than 1 MB
    xmlParseOptions: {
        normalize: true,     // Trim whitespace inside text nodes
        normalizeTags: true, // Transform tags to lowercase
        explicitArray: false // Only put nodes in array if >1
    }
}));

// configure a public directory to host static content
app.use(express1.static(__dirname + '/public'));

//require ('./test/app')(app);


//var ourapp = require('./lectures/evening/angular/app');
//ourapp(app);

require ('./assignment/app');
require ('./project/app');


var port = process.env.PORT || 3000;

app.listen(port);