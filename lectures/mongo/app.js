var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/webdev');
mongoose.Promise = require('q').Promise;

var blogPostSchema = mongoose.Schema({
    title: String,
    body: String,
    postDate: {type: Date, default: Date.now},
    thumbsUp: Number

}, {collection: 'blogpost'});


var blogModel = mongoose.model("blogPost", blogPostSchema);

function createBlogPost(blogPost) {
    blogModel
        .create(blogPost)
        .then(function (doc) {
            console.log(doc);
        }, function (err) {
            console.log(err);
        });

}

createBlogPost({title: 'blog567', body: 'body567'});

db.disconnect();