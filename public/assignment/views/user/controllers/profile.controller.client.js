(function () {
    angular
        .module('WAM')
        .controller('profileController', profileController);


    function profileController($location, $routeParams, userService) {

        var model = this;
        model.updateUser = updateUser;

        model.userId = $routeParams['userId'];

        function init() {

            model.user = angular.copy(userService.findUserbyId(model.userId));
        }
        init();

        function updateUser(user) {
            userService.updateUser(model.userId, user);
        }


    }


})();