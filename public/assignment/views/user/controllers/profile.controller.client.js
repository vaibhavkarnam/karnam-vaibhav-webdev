(function () {
    angular
        .module('WAM')
        .controller('profileController', profileController);


    function profileController($location, $routeParams, userService) {

        var model = this;
        model.updateUser = updateUser;
        model.deleteUser = deleteUser;
        model.userId = $routeParams['userId'];

        function init() {

            userService
                .findUserById(model.userId)
                .then(renderUser, errorUser);
            function renderUser(user) {
                model.user = user;
            }

            function errorUser() {
                model.error = "User not available";
            }

            // model.user = angular.copy(userService.findUserbyId(model.userId));
        }
        init();

        function updateUser(user) {
            userService
                .updateUser(user._id, user)
                .then(function () {
                    model.message = "User updated successfully";
                })
        }

        function deleteUser(user) {
            userService
                .deleteUser(user._id)
                .then(function () {
                 $location.url('/')
                }, function () {
                    model.error = "unable to unregister you";
                })
        }


    }


})();