(function () {
    angular
        .module('WAM')
        .config(configuration);

    function configuration($routeProvider) {

        $routeProvider

            .when('/user/:userId/website/:websiteId/page', {
                templateUrl: 'views/page/templates/page-list.view.client.html',
                controller: 'PageListController',
                controllerAs: 'model'
            })
            .when('/user/:userId/website/:websiteId/page/new', {
                templateUrl: 'views/page/templates/page-new.view.client.html',
                controller: 'NewPageController',
                controllerAs: 'model'
            })
            .when('/user/:userId/website/:websiteId/page/:pageId', {
                templateUrl: 'views/page/templates/page-edit.view.client.html',
                controller: 'EditPageController',
                controllerAs: 'model'
            })

    }

})();