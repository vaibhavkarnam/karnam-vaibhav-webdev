(function () {
    angular
        .module('WAM')
        .config(configuration);

    function configuration($routeProvider) {

        $routeProvider
            .when('/', {
                templateUrl: 'home.html'
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
            .when('/user/:userId', {
                templateUrl: 'views/user/templates/profile.view.client.html',
                controller: 'profileController',
                controllerAs: 'model'
            })
            .when('/user/:userId/website', {
                templateUrl: 'views/website/templates/website-list.view.client.html',
                controller: 'website_listController',
                controllerAs: 'model'
            })
            .when('/user/:userId/website/new', {
                templateUrl: 'views/website/templates/website-new.view.client.html',
                controller: 'website_newController',
                controllerAs: 'model'
            })
            .when('/user/:userId/website/:websiteId', {
                templateUrl: 'views/website/templates/website-edit.view.client.html',
                controller: 'website_editController',
                controllerAs: 'model'
            })
            .when('/user/:userId/website/:websiteId/page/:pageId/widget', {
                templateUrl: 'views/widget/templates/widget-list.view.client.html',
                controller: 'widget_listController',
                controllerAs: 'model'
            })
    }

})();