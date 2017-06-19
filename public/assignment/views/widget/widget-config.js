(function () {
    angular
        .module('WAM')
        .config(configuration);

    function configuration($routeProvider) {

        $routeProvider
            .when('/website/:websiteId/page/:pageId/widget', {
                templateUrl: 'views/widget/templates/widget-list.view.client.html',
                controller: 'WidgetListController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/website/:websiteId/page/:pageId/widget/new', {
                templateUrl: 'views/widget/templates/widget-chooser.view.client.html',
                controller: 'NewWidgetController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/website/:websiteId/page/:pageId/widget/:wgid', {
                templateUrl: 'views/widget/templates/widget-edit.view.client.html',
                controller: 'EditWidgetController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/website/:websiteId/page/:pageId/widget/:wgid/search', {
                templateUrl: 'views/widget/templates/widget-flickr-search.view.client.html',
                controller: 'FlickrImageSearchController',
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