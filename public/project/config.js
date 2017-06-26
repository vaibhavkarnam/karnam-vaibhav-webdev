(function () {
    angular
        .module('fyh')
        .config(configuration);

    function configuration($routeProvider) {

        $routeProvider
        .when('/', {
            templateUrl: 'views/home/templates/home.view.client.html',
            controller: 'searchControllerHome',
            controllerAs: 'model'
        })
            .when("/admin", {
                templateUrl: "views/admin/templates/admin-login.view.client.html",
                controller: "AdminController",
                controllerAs: "model"
            })
            .when("/admin/login", {
                templateUrl: "views/admin/templates/admin.view.client.html",
                controller: "AdminController",
                controllerAs: "model"
            })
            .otherwise({
                redirectTo: "/"
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
                templateUrl: 'views/user/templates/profile-edit.view.client.html',
                controller: 'profileController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/profile/view', {
                templateUrl: 'views/user/templates/profile-view.view.client.html',
                controller: 'profileController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/profile/friend/:id', {
                templateUrl: 'views/user/templates/profileVisit.view.client.html',
                controller: 'profileControllerVisit',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/searchresults/:zpid', {
                templateUrl: 'views/searchResults/templates/searchResults.view.client.html',
                controller: 'searchresultsController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/searchresultsguest/:zpid', {
                templateUrl: 'views/searchResults/templates/searchResultsGuest.view.client.html',
                controller: 'searchresultsGuestController',
                controllerAs: 'model'
            })
            .when('/searchResultsSeller/:zpid', {
                templateUrl: 'views/searchResults/templates/searchResultsSeller.view.client.html',
                controller: 'searchresultsSellerController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }

            })
                    .when('/searchresults/:zpid/details', {
                        templateUrl: 'views/propertyDetails.view.client.html',
                        controller: 'propertyDetailsController',
                        controllerAs: 'model'
                    });

    }

    function checkLoggedIn(userService, $q, $location) {
        var deferred = $q.defer();
        userService
            .loggedin()
            .then(function (user) {
                if(user === '0') {
                 //   console.log("unresolved");
                    deferred.reject();
                    $location.url('/login');
                } else {
                    deferred.resolve(user);
                }
            });

        return deferred.promise;
    }



})();