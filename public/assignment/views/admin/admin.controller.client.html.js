(function () {
    angular
        .module('WAM')
        .controller('adminController', adminController);


    function adminController(userService) {

        var model = this;

        function init() {

             userService
                 .findAllUsers()
                 .then(function (users) {
                     model.users = users;
                 })
            //     .findUserById(model.userId)
            //     .then(renderUser, errorUser);
            // function renderUser(user) {
            //     model.user = user;
            // }

            // model.user = angular.copy(userService.findUserbyId(model.userId));
        }
        init();



    }


})();