(function () {
    angular
        .module('fyh')
        .controller('registerController', registerController);


    function registerController($location, userService) {

        var model = this;

        model.register = register;

        function register(username, password, password2, role) {

            if(username === null || username === '' || typeof username === 'undefined'){

                model.error ='username is required';
                return;
            }

            if(password === null || typeof password==='undefined'||
                password2 === null || typeof password2==='undefined'){
                model.error="password fields are required";
                return;
            }

            if(password !== password2 || password === null || typeof password === 'undefined'){

                model.error = "passwords must match";
                return;
            }
            userService
                .findUserbyUsername(username)
                .then(function () {
                    model.error = "Sorry that username is taken";
                },function () {
                    var newUser = {
                        username: username,
                        password: password,
                        roles: role
                    };
                    return userService
                        .register(newUser);})
                .then(function (user) {
                    $location.url('/profile/view');
                });

        }
    }


})();