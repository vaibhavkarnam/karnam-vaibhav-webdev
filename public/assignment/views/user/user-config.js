// (function () {
//     angular
//         .module('WAM')
//         .config(configuration);
//
//     function configuration($routeProvider) {
//
//         $routeProvider
//             .when('/login', {
//                 templateUrl: 'views/user/templates/login.view.client.html',
//                 controller: 'loginController',
//                 controllerAs: 'model'
//             })
//             .when('/default', {
//                 templateUrl: 'views/user/templates/login.view.client.html',
//                 controller: 'loginController',
//                 controllerAs: 'model'
//             })
//             .when('/register', {
//                 templateUrl: 'views/user/templates/register.view.client.html',
//                 controller: 'registerController',
//                 controllerAs: 'model'
//             })
//             .when('/user/profile', {
//                 templateUrl: 'views/user/templates/profile.view.client.html',
//                 controller: 'profileController',
//                 controllerAs: 'model',
//                 resolve: {
//                     currentUser: checkLoggedIn
//                 }
//             })
//     }
//
//     function checkLoggedIn(userService, $q, $location) {
//         var deferred = $q.defer();
//
//         userService
//             .loggedin()
//             .then(function (user) {
//                 if(user === '0') {
//                     deferred.reject();
//                     $location.url('/login');
//                 } else {
//                     deferred.resolve(user);
//                 }
//             });
//
//         return deferred.promise;
//     }
// })();