(function () {
    angular
        .module('fyh')
        .controller('loginController', loginController);

    function loginController($location, userService) {

        var model = this;

        model.login = login;

        function login(username, password) {
            if(username === null || typeof username==='undefined'){
                model.error="username is required";
                return;
            }
            if(password === null || typeof password==='undefined'){
                model.error="password is required";
                return;
            }

            userService
            //.findUserbyCredentials(username, password)
                .login(username, password)
                .then(
                    function (found) {

                        if(found != null ){
                            //model.message = "Welcome " + username;
                            $location.url('/profile/edit');
                        }

                    },
                    function (error) {

                        model.message = "Sorry " + username + " not found";
                    });

        }
    }


})();