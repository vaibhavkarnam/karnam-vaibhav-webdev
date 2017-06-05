(function () {
    angular
        .module('WAMA')
        .config(configuration);

    function configuration($routeProvider) {

        $routeProvider
            .when('/', {
                templateUrl: 'index.html',
                controller: 'searchController',
                controllerAs: 'model'
            });
    }

})();