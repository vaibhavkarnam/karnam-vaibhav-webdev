var app = require('../../express');

var userProjectModel = require('../models/user/user.model.server');
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(localStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;


var bcrypt = require("bcrypt-nodejs");

var googleConfig = {
    clientID     : process.env.GOOGLE_CLIENT_ID,
    clientSecret : process.env.GOOGLE_CLIENT_SECRET,
    callbackURL  : process.env.GOOGLE_CALLBACK_URL_PROJECT
}


var facebookConfig = {
    clientID     : process.env.FACEBOOK_CLIENT_ID,
    clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL  : process.env.FACEBOOK_CALLBACK_URL
};

passport.use(new GoogleStrategy(googleConfig, googleStrategy));
passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));


app.get('/auth/project/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
app.get('/auth/project/google/callback',
    passport.authenticate('google', {
        successRedirect: '/project/#!/profile/edit',
        failureRedirect: '/project/#!/login'
    }));

app.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email']}));
app.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/project/#!/profile/edit',
    failureRedirect: '/project/#!/login'
}));


app.get('/api/user/:userId', findUserById);
app.get('/api/user', findAllUsers);
app.post('/api/user', createUser);
app.put('/api/user/:userId', updateUser);
app.delete('/api/user/:userId', deleteUser);


app.post ('/api/login', passport.authenticate('local'),login);
app.get ('/api/loggedin', loggedin);
app.get ('/api/admin', admin);
app.get("/api/project/admin/users", getAllUsers);
app.post ('/api/logout', logout);
app.post ('/api/register', register);
app.put("/api/project/addFavorite", addFavorite);
app.put("/api/project/removeFavorite", removeFavorite);
app.put("/api/project/addFriend", addFriend);
app.put("/api/project/removeFriend", removeFriend);
app.put("/api/project/addToFriendRequest", addToFriendRequest);
app.put("/api/project/removeFromFriendRequest", removeFromFriendRequest);
app.put("/api/project/deleteImage/:userId", deleteImage);
app.put("/api/project/addNote", addNote);
app.put("/api/project/deleteNote", deleteNote);

var multer = require('multer');
var upload = multer({dest: __dirname + '/../../public/uploads'});
app.post('/api/project/uploads', upload.single('myImgFile'), uploadImage);

passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));

function deleteImage(req, res) {
    var userId = req.params.userId;
  //  var url = "images/defaultDisplayPic.jpg";
    userProjectModel
        .uploadImage(userId)
        .then(
            function (stats) {
                res.send(stats);
            },
            function (error) {
                res.send(error);
            }
        );
}

function uploadImage(req, res) {

    var userId = req.body.userId;

    var myFile = req.file;

    var originalname = myFile.originalname; // file name on user's computer
    var filename = myFile.filename;     // new file name in upload folder
    var path = myFile.path;         // full path of uploaded file
    var destination = myFile.destination;  // folder where file is saved to
    var size = myFile.size;
    var mimetype = myFile.mimetype;

    var url = "/uploads/" + filename;

    userProjectModel
        .uploadImage(userId, url)
        .then(
            function (stats) {
                res
                    .redirect('/project/#!/profile/edit');
            },
            function (error) {
                res.send(error);
            }
        );
}


function addNote(req, res) {
    var userId = req.body.userId;
    var note = req.body.note;
    userProjectModel
        .addNote(userId, note)
        .then(
            function (stats) {
                res.send(stats);
            },
            function (error) {
                res.send(error);
            }
        );
}

function deleteNote(req, res) {
    var userId = req.body.userId;
    var note = req.body.note;
    userProjectModel
        .deleteNote(userId, note)
        .then(
            function (stats) {
                res.send(stats);
            },
            function (error) {
                res.send(error);
            }
        );
}


function getAllUsers(req, res) {
    userProjectModel
        .getUsers()
        .then(
            function (users) {
                res.send(users);
            },
            function (error) {
                res.send([]);
            }
        );
}

function addFriend(req, res) {
    var userId = req.body.userId;
    var friendId = req.body.friendId;
    userProjectModel
        .addFriend(userId, friendId)
        .then(
            function (stats) {
                res.send(stats);
            },
            function (error) {
                res.send(error);
            }
        );
}

function removeFriend(req, res) {
    var userId = req.body.userId;
    var friendId = req.body.friendId;
    userProjectModel
        .removeFriend(userId, friendId)
        .then(
            function (stats) {
                res.send(stats);
            },
            function (error) {
                res.send(error);
            }
        );
}

function addToFriendRequest(req, res) {
    var userId = req.body.userId;
    var friendId = req.body.friendId;
    userProjectModel
        .addToFriendRequest(userId, friendId)
        .then(
            function (stats) {
                res.send(stats);
            },
            function (error) {
                res.send(error);
            }
        );
}

function removeFromFriendRequest(req, res) {
    var userId = req.body.userId;
    var friendId = req.body.friendId;
    userProjectModel
        .removeFromFriendRequest(userId, friendId)
        .then(
            function (stats) {
                res.send(stats);
            },
            function (error) {
                res.send(error);
            }
        );
}


function addFavorite(req, res) {
    var userId = req.body.userId;
    var venue = req.body.venue;
    userProjectModel
        .addToFavorites(userId, venue)
        .then(
            function (stats) {
                res.send(stats);
            },
            function (error) {
                res.send(error);
            }
        );
}

function removeFavorite(req, res) {
    var userId = req.body.userId;
    var venueId = req.body.venueId;
    userProjectModel
        .removeFromFavorites(userId, venueId)
        .then(
            function (stats) {
                res.send(stats);
            },
            function (error) {
                res.send(error);
            }
        );
}

function logout(req, res) {
    req.logout();
    res.sendStatus(200);
}

function register(req, res) {
    var user = req.body;
    console.log("registering");
    user.password = bcrypt.hashSync(user.password);
    userProjectModel
        .createUser(user)
        .then(function (user) {
            req
                .login(user, function (status) {
                    res.json(user);
                });
        });
}

function loggedin(req, res) {
    if(req.isAuthenticated()) {
        res.json(req.user);
    } else {
        res.send('0');
    }
}

function admin(req, res) {
    if(req.isAuthenticated() && req.user.roles.indexOf('ADMIN')>-1) {
        res.json(req.user);
    } else {
        res.send('0');
    }
}

function localStrategy(username, password, done) {
    userProjectModel
        .findUserByUsername(username)
        .then(function (user) {
            if (!user) {
                return done(null, false);
            }
            if (user.username === username && bcrypt.compareSync(password, user.password)) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        }, function (err) {
            if (err) {
                return done(err);
            } else {
                return done(null, false);
            }
        });
}

function login(req, res) {
    var user = req.user;
    res.json(user);
}

function createUser(req, res) {
    var user = req.body;
    userProjectModel
        .createUser(user)
        .then(function (user) {
            res.json(user);
        }, function (err) {
            res.send(err);
        });
}

function deleteUser(req, res) {

    var userId = req.params.userId;
    userProjectModel
        .deleteUser(userId)
        .then(function (status) {
            res.send(status);
        });
}

function updateUser(req, res) {

    var user = req.body;
    userProjectModel
        .updateUser(req.params.userId, user)
        .then(function (status) {
            //console.log("in serser");
            res.send(status);
        });
}


function findAllUsers(req, res) {

    var username = req.query['username'];
    var password = req.query.password;
    if(username && password) {
        userProjectModel
            .findUserByCredentials(username, password)
            .then(function (user) {
                if(user) {
                    res.json(user);
                } else {
                    res.sendStatus(404);
                }
            });
    } else if(username) {
        userProjectModel
            .findUserByUsername(username)
            .then(function (user) {
                if(user) {
                    res.json(user);
                } else {
                    res.sendStatus(404);
                }
            });
    } else {
        userProjectModel
            .findAllUsers()
            .then(function (users) {
                res.json(users);
            });
    }
}


function findUserById(req, res) {
    var userId = req.params['userId'];
    userProjectModel
        .findUserById(userId)
        .then(function (user) {
            res.json(user);
        });
}



function serializeUser(user, done) {
    done(null, user);
}

function deserializeUser(user, done) {
    userProjectModel
        .findUserById(user._id)
        .then(
            function(user){
                done(null, user);
            },
            function(err){
                done(err, null);
            }
        );
}


function googleStrategy(token, refreshToken, profile, done) {
    userProjectModel
        .findUserByGoogleId(profile.id)
        .then(
            function(user) {
                if(user) {
                    return done(null, user);
                } else {
                    var email = profile.emails[0].value;
                    var emailParts = email.split("@");
                    var newGoogleUser = {
                        username:  emailParts[0],
                        firstName: profile.name.givenName,
                        lastName:  profile.name.familyName,
                        email:     email,
                        google: {
                            id:    profile.id,
                            token: token
                        }
                    };
                    return userProjectModel.createUser(newGoogleUser);
                }
            },
            function(err) {
                if (err) { return done(err); }
            }
        )
        .then(
            function(user){
                return done(null, user);
            },
            function(err){
                if (err) { return done(err); }
            }
        );
}


function facebookStrategy(token, refreshToken, profile, done) {

    userProjectModel
        .findUserByFacebookId(profile.id)
        .then(function (user) {
            if (user) {
                return done(null, user);
            } else {
                var newUser = {
                    username: profile.displayName.replace(/ /g, ""),
                    facebook: {
                        token: token,
                        id: profile.id
                    }
                };
                userProjectModel
                    .createUser(newUser)
                    .then(function (user) {
                        return done(null, user);
                    }, function (err) {
                        return done(err, null);
                    });
            }
        }, function (err) {
            return done(err, null);
        });
}
