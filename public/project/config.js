(function () {
    angular
        .module('fyh')
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
})
            .when('/user/profile/view', {
                templateUrl: 'views/user/profile.view.client.html',
                controller: 'profileController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            });
    }

    function checkLoggedIn(userService, $q, $location) {
        var deferred = $q.defer();

        userService
            .loggedin()
            .then(function (user) {
                if(user === '0') {
                    deferred.reject();
                    $location.url('/login');
                } else {
                    deferred.resolve(user);
                }
            });

        return deferred.promise;
    }



})();