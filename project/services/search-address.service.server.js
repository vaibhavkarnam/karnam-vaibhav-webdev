// https://developer.oxforddictionaries.com/documentation

var q = require('q');
const app = require('../../express');
const https = require('https');
var xml2js = require('../xml2js');
var X2JS = require('../xml2json');
var parse = require('../xml-parser');
var inspect = require('../util').inspect;

app.get('/api/searchAddress/:street1/:street2/:street3/:city/:state', searchQuery);

function searchQuery(req, res) {
    var street1     = req.params.street1;
    var street2     = req.params.street2;
    var street3     = req.params.street3;
    var city     = req.params.city;
    var state     = req.params.state;
    console.log("inside server");

    searchAddress(street1, street2, street3, city, state)
        .then(function(response){
          //  console.log(response);
            res.send(response);
        }, function (error) {
            res.sendStatus(404).send(error);
        });
}

function searchAddress(street1, street2, street3, city, state) {
    var parser = new xml2js.Parser({explicitArray : false});
    var deferred = q.defer();
    https.get({
     //   http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=X1-ZWz1966qi8632j_1r7kw&address=STREET1+STREET2+STREET3&citystatezip=CITY%2C+STATE"
        host: 'www.zillow.com',
        path: '/webservice/GetSearchResults.htm?zws-id=X1-ZWz1966qi8632j_1r7kw&address='+street1+'+'+street2+'+'+street3+'&citystatezip='+city+'%2C'+state,
         headers: {
    }
    }, function(response) {
        var body = '';
        response.on('data', function(d) {
            body += d;
        });
         response.on('end', function() {
            try {
             var newbody = parse(body);
            //   body = JSON.parse(body);
             //   console.dir(body);
               // console.log(inspect(newbody, { colors: true, depth: Infinity }));
              //  console.dir(util.inspect(body, false, null));
                deferred.resolve(newbody);
            } catch(e) {
                deferred.reject({error: e});
            }
        });
    });
    return deferred.promise;
}

// function transform(cnv) {
//     var x2js = new X2JS();
//     var aftCnv = x2js.xml_str2json(cnv);
//     return aftCnv;
// }

function xmlParse(body) {
  //  console.log("Hi");
    var parser = new xml2js.Parser({explicitArray : false, ignoreAttrs : true});
    var ret = {};
    parser.parseString(body, function(err, data) {
        ret.err = err;
        ret.data = data;
    });
    if (ret.err) {
        throw ret.err;
    }
    return ret.data;
}




