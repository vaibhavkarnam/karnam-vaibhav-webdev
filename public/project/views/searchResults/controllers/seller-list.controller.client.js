(function () {
angular
    .module('fyh')
    .controller('sellerController', sellerController);


function sellerController($routeParams, $route, $location, currentUser, userService, searchService) {

    var model = this;
    model.currentUser = currentUser;
    model.logout = logout;
   // console.log(model.currentUser.roles.indexOf('SELLER'));

    function init() {
        userService
            .findUserBySellerId()
            .then(function (response) {
                model.sellers = response;
            });
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

}

})();