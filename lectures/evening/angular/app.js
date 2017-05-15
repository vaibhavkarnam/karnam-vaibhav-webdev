/**
 * Created by vaibhav on 15-05-2017.
 */
module.exports = function (app) {
    //console.log('Hello from server side')
    app.get('/api/post', findAllPosts);
    app.get('/api/post/:index', findOnePost);
    app.delete('/api/post/:index', deleteOnePost);
    app.put('/api/post/:index', updateOnePost);

    var posts = [
        {title: 'title 123', body: 'body 123'},
        {title: 'title 234', body: 'body 234'},
        {title: 'title 345', body: 'body 345'},
        {title: 'title 456', body: 'body 456'}
    ];


    function deleteOnePost (req, res) {

        var index = req.params.index;
        posts.splice(index, 1);
        res.json(posts);


    }

    function updateOnePost (req, res) {

    }

    function findAllPosts (req, res) {
        res.json(posts)
    }

    function findOnePost (req, res) {
        var index = req.params['index'];
        res.json(posts[index]);
    }
};

