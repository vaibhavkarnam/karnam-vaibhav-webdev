(function () {
angular
    .module('WAMA')
    .controller('loginController', loginController);

function loginController($location, userService) {

    var model = this;

    model.login = login;

    function login(username, password) {

        userService
            .findUserbyCredentials(username, password)
            .then(
                function (found) {

                    if(found != null ){
                        //model.message = "Welcome " + username;
                        $location.url('/user/' + found._id)
                }

                },
                function (error) {

                    model.message = "Sorry " + username + " not found";
                });

    }
}


})();