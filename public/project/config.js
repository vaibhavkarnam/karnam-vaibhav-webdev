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
            .when('/login', {
                templateUrl: 'views/user/templates/login.view.client.html',
                controller: 'loginController',
                controllerAs: 'model'
            })
            .when('/register', {
                templateUrl: 'views/user/templates/register.view.client.html',
                controller: 'registerController',
                controllerAs: 'model'
            })
            .when('/profile/view', {
                templateUrl: 'views/user/profile.view.client.html',
                controller: 'registerController',
                controllerAs: 'model'
            })
            .when('/profile/edit', {
                templateUrl: 'views/user/profile-edit.view.client.html',
                controller: 'registerController',
                controllerAs: 'model'
            })
        .when('/searchresults/:zpid', {
                        templateUrl: 'views/searchresults.view.client.html',
                        controller: 'searchresultsController',
                        controllerAs: 'model'
                    })
.when('/searchresults/:zpid/details', {
    templateUrl: 'views/propertyDetails.view.client.html',
    controller: 'propertyDetailsController',
    controllerAs: 'model'
});
    }

})();