(function () {
    angular
        .module('WAMA')
        .config(configuration);

    function configuration($routeProvider) {

        $routeProvider
            .when('/searchresults/:zpid', {
                            templateUrl: 'views/searchresults.view.client.html',
                            controller: 'searchresultsController',
                            controllerAs: 'model'
                        });
    }

})();