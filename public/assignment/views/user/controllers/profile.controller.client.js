(function () {
    angular
        .module('WAM')
        .controller('profileController', profileController);


    function profileController($location, $routeParams, userService) {

        var model = this;

         model.userId = $routeParams['userId'];

        model.user = userService.findUserbyId(model.userId);


    }


})();