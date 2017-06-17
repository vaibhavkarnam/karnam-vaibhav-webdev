(function () {
angular
    .module('WAM')
    .controller('loginController', loginController);

function loginController($location, userService) {

    var model = this;

    model.login = login;

    function login(username, password) {

        userService
            //.findUserbyCredentials(username, password)
            .login(username, password)
            .then(
                function (found) {

                    if(found != null ){
                        //model.message = "Welcome " + username;
                        $location.url('/user/profile');
                }

                },
                function (error) {

                    model.message = "Sorry " + username + " not found";
                });

    }
}


})();