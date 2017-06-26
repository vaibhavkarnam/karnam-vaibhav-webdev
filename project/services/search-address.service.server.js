// https://developer.oxforddictionaries.com/documentation

var q = require('q');
const app = require('../../express');
const https = require('https');
var xml2js = require('../xml2js');
var X2JS = require('../xml2json');
var parse = require('../xml-parser');
var inspect = require('../util').inspect;

var venueModelProject = require('../models/houses/house.model.server');

app.get('/api/searchAddress/:street1/:street2/:street3/:city/:state', searchQuery);
app.get('/api/results/:zpid', getDetails);
app.get('/api/searchResults/:zpid', getDetailsSeller);
app.post("/api/project/venue", createVenue);
app.get("/api/project/venue/:venueId", findVenueById);
app.put("/api/project/venue/:venueId", updateVenue);
app.put("/api/project/venue/:venueId/addComment", addComment);
app.put("/api/project/venue/:venueId/deleteComment", deleteComment);
app.put("/api/project/venue/:venueId/addFavorite", addFavoriteOf);
app.put("/api/project/venue/:venueId/removeFavorite", removeFavoriteOf);
app.get("/api/project/venue/:venueId/isFavoriteOf/:userId", isFavoriteOf);
app.get("/api/project/admin/venues", getAllVenue);
app.delete("/api/project/venue/:venueId", deleteVenue);

var API_ID = process.env.ID;

function getDetails(req, res) {
    var zpid     = req.params.zpid;


    findDetails(zpid)
        .then(function(response){
            //  console.log(response);
            res.send(response);
        }, function (error) {
            res.sendStatus(404).send(error);
        });
}

function findDetails(zpid) {
    var parser = new xml2js.Parser({explicitArray : false});
    var deferred = q.defer();
    var pathvar = '/webservice/GetUpdatedPropertyDetails.htm?zws-id=API_KEY&zpid='+zpid;
    var newpathvar = pathvar.replace("API_KEY",API_ID);
    https.get({
        //   http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=&address=STREET1+STREET2+STREET3&citystatezip=CITY%2C+STATE"
        host: 'www.zillow.com',
        path: newpathvar
    }, function(response) {
        var body = '';
        response.on('data', function(d) {
            body += d;
        });
        response.on('end', function() {
            try {
                var newbody = parse(body);
                //   body = JSON.parse(body);
                 console.dir(newbody);
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


function getDetailsSeller(req, res) {
    var zpid     = req.params.zpid;


    findDetailsSeller(zpid)
        .then(function(response){
            //  console.log(response);
            res.send(response);
        }, function (error) {
            res.sendStatus(404).send(error);
        });
}

function findDetailsSeller(zpid) {
    var parser = new xml2js.Parser({explicitArray : false});
    var deferred = q.defer();
    var pathvardet = '/webservice/GetZestimate.htm?zws-id=API_KEY&zpid='+zpid;
    var newpathvardet = pathvardet.replace("API_KEY",API_ID);
    https.get({
        //   http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=&address=STREET1+STREET2+STREET3&citystatezip=CITY%2C+STATE"
        host: 'www.zillow.com',
        path: newpathvardet
    }, function(response) {
        var body = '';
        response.on('data', function(d) {
            body += d;
        });
        response.on('end', function() {
            try {
                var newbody = parse(body);
                //   body = JSON.parse(body);
                console.dir(newbody);
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
    var pathqr = '/webservice/GetSearchResults.htm?zws-id=API_KEY&address='+street1+'+'+street2+'+'+street3+'&citystatezip='+city+'%2C'+state;
    var newpathqr =  pathqr.replace('API_KEY',API_ID);
    https.get({
     //   http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=&address=STREET1+STREET2+STREET3&citystatezip=CITY%2C+STATE"
        host: 'www.zillow.com',
        path: newpathqr
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


function getAllVenue(req, res) {
    venueModelProject
        .getAllVenue()
        .then(
            function (venues) {
             //   console.log(venues);
                res.send(venues);
            },
            function (error) {
                res.send(null);
            }
        )
}

function deleteVenue(req, res) {
    var venueId = req.params.venueId;
    console.log("deleted");
    console.log(venueId);
    venueModelProject
        .deleteVenue(venueId)
        .then(
            function (stats) {
                console.log("deleted");
                res.send(stats);
            },
            function (error) {
                res.send(error);
            }
        );
}

function isFavoriteOf(req, res) {
    var venueId = req.params.venueId;
    var userId = req.params.userId;
    venueModelProject
        .isFavoriteOf(venueId, userId)
        .then(
            function (venue) {
                res.json(venue);
            },
            function (error) {
                res.statusCode(404).send(null);
            }
        );
}

function addFavoriteOf(req, res) {
    var venueId = req.params.venueId;
    var userId = req.body.userId;
    var venue = {
        venueId: venueId,
        favoriteOf: [userId]
    };
    venueModelProject
        .findVenueByVenueId(venueId)
        .then(
            function (venueCheck) {
                if (venueCheck) {
                    venueModelProject
                        .addFavoriteOf(venueId, userId)
                        .then(
                            function (stats) {
                                res.send(stats);
                            },
                            function (error) {
                                res.send(error);
                            }
                        );
                } else {
                    venueModelProject
                        .createVenue(venue)
                        .then(
                            function (response) {
                                res.send(response);
                            },
                            function (error) {
                                res.send(error);
                            }
                        );
                }
            }
        );


}

function removeFavoriteOf(req, res) {
    var venueId = req.params.venueId;
    var userId = req.body.userId;
    venueModelProject
        .removeFavoriteOf(venueId, userId)
        .then(
            function (stats) {
                res.send(stats);
            },
            function (error) {
                res.send(error);
            }
        );
}

function deleteComment(req, res) {
    var venueId = req.params.venueId;
    var comment = req.body;
    venueModelProject
        .deleteComment(venueId, comment)
        .then(
            function (stats) {
                res.send(stats);
            },
            function (error) {
                res.send(error);
            }
        );
}

function addComment(req, res) {
    var venueId = req.params.venueId;
    var comment = req.body;
    var venue = {
        venueId: venueId,
        comments: [comment]
    }
    venueModelProject
        .findVenueByVenueId(venueId)
        .then(
            function (venueCheck) {
                if (venueCheck) {
                    venueModelProject
                        .addComment(venueId, comment)
                        .then(
                            function (stats) {
                                res.send(stats);
                            },
                            function (error) {
                                res.send(error);
                            }
                        );
                } else {
                    venueModelProject
                        .createVenue(venue)
                        .then(
                            function (response) {
                                res.send(response);
                            },
                            function (error) {
                                res.send(error);
                            }
                        );
                }
            }
        );
}

function createVenue(req, res) {
    var venue = req.body;
    venueModelProject
        .createVenue(venue)
        .then(
            function (venue) {
                res.json(venue);
            },
            function (error) {
                res.statusCode(400).send(error);
            }
        );
}

function findVenueById(req, res) {
    var venueId = req.params.venueId;
    venueModelProject
        .findVenueByVenueId(venueId)
        .then(
            function (venue) {
                res.json(venue);
            },
            function (error) {
                res.statusCode(404).send(null);
            }
        )
}


function updateVenue(req, res) {
    var venueId = req.params.venueId;
    var venue = req.body;
    venueModelProject
        .findVenueByVenueId(venueId)
        .then(
            function (venueCheck) {
                if (venueCheck) {
                    venueModelProject
                        .updateVenue(venueId, venue)
                        .then(
                            function (stats) {
                                res.send(stats);
                            },
                            function (error) {
                                res.send(error);
                            }
                        );
                } else {
                    venueModelProject
                        .createVenue(venue)
                        .then(
                            function (response) {
                                res.send(response);
                            },
                            function (error) {
                                res.send(error);
                            }
                        );
                }
            }
        );
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




