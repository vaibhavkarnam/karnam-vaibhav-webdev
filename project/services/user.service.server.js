// var app = require('../../express');
//
// var userModel = require('../models/user/user.model.server');
// var passport      = require('passport');
// var LocalStrategy = require('passport-local').Strategy;
// passport.use(new LocalStrategy(localStrategy));
// passport.serializeUser(serializeUser);
// passport.deserializeUser(deserializeUser);
//
// var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
//
// var FacebookStrategy = require('passport-facebook').Strategy;
//
//
// var bcrypt = require("bcrypt-nodejs");
//
// var googleConfig = {
//     clientID     : process.env.GOOGLE_CLIENT_ID,
//     clientSecret : process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL  : process.env.GOOGLE_CALLBACK_URL
// };
//
//
// var facebookConfig = {
//     clientID     : process.env.FACEBOOK_CLIENT_ID,
//     clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
//     callbackURL  : process.env.FACEBOOK_CALLBACK_URL,
//     profileFields : ['id', 'emails','name']
// };
//
// passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));
//
// passport.use(new GoogleStrategy(googleConfig, googleStrategy));
//
//
//
// app.get ('/auth/facebook', passport.authenticate('facebook', { scope : ['email'] }));
//
// app.get('/auth/facebook/callback',
//     passport.authenticate('facebook', {
//         successRedirect: '/fyh/index.html',
//         failureRedirect: '/fyh/'+'index.html#!/login'
//     }));
//
//
// app.get('/api/fyh/user/:userId', findUserById);
// app.get('/api/fyh/user', findAllUsers);
// app.post('/api/fyh/user', createUser);
// app.put('/api/fyh/user/:userId', updateUser);
// app.delete('/api/fyh/user/:userId', deleteUser);
//
//
// app.post  ('/api/fyh/graduate/login', passport.authenticate('local'), login);
// app.get   ('/api/fyh/graduate/loggedin', loggedin);
// app.get   ('/api/fyh/graduate/admin', admin);
// app.post  ('/api/fyh/graduate/logout', logout);
// app.post  ('/api/fyh/graduate/register', register);
//
//
//
// app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
// app.get('/auth/google/callback',
//     passport.authenticate('google', {
//         successRedirect: '/fyh/index.html#!/user/profile',
//         failureRedirect: '/fyh/index.html#!/login'
//     }));
//
// function logout(req, res) {
//     req.logout();
//     res.sendStatus(200);
// }
//
// function register(req, res) {
//     var userObj = req.body;
//     userObj.password = bcrypt.hashSync(userObj.password);
//     userModel
//         .createUser(userObj)
//         .then(function (user) {
//             req
//                 .login(user, function (status) {
//                     res.send(status);
//                 });
//         });
// }
//
// function loggedin(req, res) {
//     console.log(req.user);
//     if(req.isAuthenticated()) {
//         res.json(req.user);
//     } else {
//         res.send('0');
//     }
// }
//
// function admin(req, res) {
//     if(req.isAuthenticated() && req.user.roles.indexOf('ADMIN')>-1) {
//         res.json(req.user);
//     } else {
//         res.send('0');
//     }
// }
//
// function localStrategy(username, password, done) {
//     userModel
//         .findUserByCredentials(username, password)
//         .then(function (user) {
//                 //  console.log("local strategy");
//                 //   console.log(user);
//                 if(user && bcrypt.compareSync(password, user.password)) {
//                     console.log("successful");
//                     return done(null, user);
//                 } else {
//                     //     console.log("unsuccessful");
//                     return done(null, false);
//                 }
//             },
//             function(err) {
//                 //   console.log("unsuccessful");
//                 if (err) { return done(err); }
//             }
//         );
// }
//
// function login(req, res) {
//     res.json(req.user);
// }
//
// function createUser(req, res) {
//     var user = req.body;
//     userModel
//         .createUser(user)
//         .then(function (user) {
//             res.json(user);
//         }, function (err) {
//             res.send(err);
//         });
// }
//
// function deleteUser(req, res) {
//
//     var userId = req.params.userId;
//     userModel
//         .deleteUser(userId)
//         .then(function (status) {
//             res.send(status);
//         });
// }
//
// function updateUser(req, res) {
//
//     var user = req.body;
//     userModel
//         .updateUser(req.params.userId, user)
//         .then(function (status) {
//             res.send(status);
//         });
// }
//
//
// function findAllUsers(req, res) {
//
//     var username = req.query['username'];
//     var password = req.query.password;
//     if(username && password) {
//         userModel
//             .findUserByCredentials(username, password)
//             .then(function (user) {
//                 if(user) {
//                     res.json(user);
//                 } else {
//                     res.sendStatus(404);
//                 }
//             });
//     } else if(username) {
//         userModel
//             .findUserByUsername(username)
//             .then(function (user) {
//                 if(user) {
//                     res.json(user);
//                 } else {
//                     res.sendStatus(404);
//                 }
//             });
//     } else {
//         userModel
//             .findAllUsers()
//             .then(function (users) {
//                 res.json(users);
//             });
//     }
// }
//
//
// function findUserById(req, res) {
//
//
//     var userId = req.params['userId'];
//
//     userModel
//         .findUserById(userId)
//         .then(function (user) {
//             res.json(user);
//         });
// }
//
//
//
// function serializeUser(user, done) {
//     done(null, user);
// }
//
// function deserializeUser(user, done) {
//     userModel
//         .findUserById(user._id)
//         .then(
//             function(user){
//                 done(null, user);
//             },
//             function(err){
//                 done(err, null);
//             }
//         );
// }
//
//
// function googleStrategy(token, refreshToken, profile, done) {
//     userModel
//         .findUserByGoogleId(profile.id)
//         .then(
//             function(user) {
//                 if(user) {
//                     return done(null, user);
//                 } else {
//                     var email = profile.emails[0].value;
//                     var emailParts = email.split("@");
//                     var newGoogleUser = {
//                         username:  emailParts[0],
//                         firstName: profile.name.givenName,
//                         lastName:  profile.name.familyName,
//                         email:     email,
//                         google: {
//                             id:    profile.id,
//                             token: token
//                         }
//                     };
//                     return userModel.createUser(newGoogleUser);
//                 }
//             },
//             function(err) {
//                 if (err) { return done(err); }
//             }
//         )
//         .then(
//             function(user){
//                 return done(null, user);
//             },
//             function(err){
//                 if (err) { return done(err); }
//             }
//         );
// }
//
// function facebookStrategy(token, refreshToken, profile, done) {
//     userModel
//         .findUserByFacebookId(profile.id)
//         .then(
//             function(user) {
//                 if(user) {
//                     return done(null, user);
//                 } else {
//                     var email = profile.emails[0].value;
//                     var emailParts = email.split("@");
//                     var newGoogleUser  = {
//                         username:  emailParts[0],
//                         firstName: profile.name.givenName,
//                         lastName:  profile.name.familyName,
//                         email:     email,
//                         facebook: {
//                             id:    profile.id,
//                             token: token
//                         }
//                     };
//                     return userModel.createUser(newGoogleUser);
//                 }
//             },
//             function(err) {
//                 if (err) { return done(err); }
//             }
//         )
//         .then(
//             function(user){
//                 return done(null, user);
//             },
//             function(err){
//                 if (err) { return done(err); }
//             }
//         );
// }