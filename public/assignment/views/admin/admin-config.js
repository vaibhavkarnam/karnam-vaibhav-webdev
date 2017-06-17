(function () {
    angular
        .module('WAM')
        .config(configuration);

    function configuration($routeProvider) {

        $routeProvider
            .when('/admin/users', {
                templateUrl: 'views/admin/admin-users.view.client.html',
                controller: 'adminController',
                controllerAs: 'model'
            });
    }
})();