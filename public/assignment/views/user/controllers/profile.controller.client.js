(function () {
angular
    .module('WAM')
    .controller('profileController', profileController);


function profileController($location, currentUser, userService) {

    var model = this;
    model.updateUser = updateUser;
    model.deleteUser = deleteUser;
    model.logout = logout;
    //model.userId = $routeParams['userId'];
    model.userId = currentUser._id

    function init() {

        // userService
        //     .findUserById(model.userId)
        //     .then(renderUser, errorUser);
        // function renderUser(user) {
        //     model.user = user;
        // }
        renderUser(currentUser);
         function errorUser() {
             model.error = "User not available";
        }

        // model.user = angular.copy(userService.findUserbyId(model.userId));
    }
    init();

    function logout() {
        userService
            .logout()
            .then(function () {
                $location.url('/login');
            });
    }

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

    function renderUser (user) {
        model.user = user;
    }

    function userError(error) {
        model.error = "User not found";
    }


}


})();