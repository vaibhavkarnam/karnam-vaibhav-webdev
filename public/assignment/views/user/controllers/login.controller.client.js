(function () {
    angular
        .module('WAM')
        .controller('loginController', loginController);


    function loginController($location, userService) {

        var model = this;

        model.login = login;

        function login(username, password) {
            var found = userService.findUserbyCredentials(username, password);

            if(found != null ){
                //model.message = "Welcome " + username;
                $location.url('/user/' + found._id)
            }
            else {
                model.message = "Sorry " + username + " not found";
            }
        }
    }


})();