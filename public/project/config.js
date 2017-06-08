(function () {
    angular
        .module('WAMA')
        .config(configuration);

    function configuration($routeProvider) {

        $routeProvider
            .when('/', {
                templateUrl: 'views/search.view.client.html',
                controller: 'searchController',
                controllerAs: 'model'
            })
            .when('/searchresults/:zpid', {
                            templateUrl: 'views/searchresults.view.client.html',
                            controller: 'searchresultsController',
                            controllerAs: 'model'
                        });
    }

})();