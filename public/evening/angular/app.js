/**
 * Created by vaibhav on 12-05-2017.
 */
(function () {
    angular
        .module("BlogApp", [])
        .controller("BlogPostController", BlogPostController)

    function BlogPostController($scope, $http) {
        $scope.hello = 'hello world!!!'
        $scope.post = {title:"Title from controller", body:"body from controller"}
        $scope.posts = [];

        function init () {
            findBlogPosts();
        }

        init();
        function findBlogPosts() {
            $http.get('/api/post')
                .then(function (response) {
                    $scope.posts = response.data;
                });
        }
        //event handlers
        $scope.addPost = addPost;
        $scope.deletePosts = deletePosts;
        $scope.selectPost = selectPost;
        $scope.updatePosts = updatePosts;

        function updatePosts (post) {
            $scope.posts[$scope.index] = angular.copy(post);


        }

        function selectPost (index) {
            $scope.post = angular.copy($scope.posts[index]);
            $scope.index = index;
        }

            function addPost (post) {
                var newPost;
                newPost = {
                    title: post.title,
                    body: post.body,
                    date: new Date()
                };
                $scope.posts.push(newPost);
                console.log($scope.posts);

            }

            function deletePosts (index) {
                // $scope.posts.splice(index, 1)
                $http
                    .delete('/api/post/' + index)
                    .then(findBlogPosts);
            }


    }

})();
