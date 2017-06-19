// (function () {
// angular
//     .module('WAM')
//     .factory('userService', userService);
//
// function userService($http) {
//
//
//     var api ={
//         createUser: createUser,
//         findUserById: findUserById,
//         findUserbyUsername: findUserbyUsername,
//         findUserbyCredentials : findUserbyCredentials,
//         updateUser: updateUser,
//         deleteUser:deleteUser,
//         login: login,
//         logout: logout,
//         loggedin:loggedin,
//         register:register,
//         checkAdmin: checkAdmin,
//         findAllUsers: findAllUsers
//     };
//
//     return api;
//
//     function register(userObj) {
//         var url = "/api/assignment/graduate/register";
//         return $http.post(url, userObj)
//             .then(function (response) {
//                 return response.data;
//             });
//     }
//
//
//     function logout() {
//         var url = "/api/assignment/graduate/logout";
//         return $http.post(url)
//             .then(function (response) {
//                 return response.data;
//             });
//     }
//
//     function login(username, password) {
//         var url = "/api/assignment/graduate/login";
//         var credentials = {
//             username: username,
//             password: password
//         };
//         return $http.post(url, credentials)
//             .then(function (response) {
//                 return response.data;
//             });
//     }
//
//
//     function loggedin() {
//         var url = "/api/assignment/graduate/loggedin";
//         return $http.get(url)
//             .then(function (response) {
//                 return response.data;
//             });
//     }
//
//     function checkAdmin() {
//         var url = "/api/assignment/graduate/admin";
//         return $http.get(url)
//             .then(function (response) {
//                 return response.data;
//             });
//     }
//
//     function createUser(user) {
//
//         var url = "/api/fyh/user/";
//        return $http.post(url, user)
//            .then(function (response) {
//                return response.data;
//            })
//
//     }
//
//     function findUserbyUsername(username) {
//
//         var url = "/api/fyh/user?username="+username;
//         return $http.get(url)
//             .then(function (response) {
//                 return response.data;
//             })
//     }
//
//     function findUserById(userId) {
//         var url = "/api/fyh/user/"+userId;
//        return $http.get(url)
//            .then(function (response) {
//                return response.data;
//            })
//     }
//
//     function findUserbyCredentials(username, password) {
//         var url = "/api/fyh/user?username="+username+"&password="+password;
//         return $http.get(url)
//             .then(function (response) {
//                 return response.data;
//             })
//     }
//
//     function updateUser(userId, user) {
//
//         var url = "/api/fyh/user/"+userId;
//         return $http.put(url, user)
//             .then(function (response) {
//                 return response.data;
//             })
//
//     }
//
//     function deleteUser(userId) {
//
//         var url = "/api/fyh/user/"+userId;
//         return $http.delete(url)
//             .then(function (response) {
//                 return response.data;
//             })
//
//     }
// }
//
// })();
