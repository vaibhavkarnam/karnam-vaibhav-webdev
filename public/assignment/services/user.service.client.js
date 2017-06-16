(function () {
angular
    .module('WAM')
    .factory('userService', userService);

function userService($http) {
    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder",  email: "alice@abc.com"},
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley", email: "bob@abc.com"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia", email: "charly@abc.com"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi", email: "jannuzi@abc.com" }
    ];

    var api ={
        createUser: createUser,
        findUserById: findUserById,
        findUserbyUsername: findUserbyUsername,
        findUserbyCredentials : findUserbyCredentials,
        updateUser: updateUser,
        deleteUser:deleteUser,
        login: login
    };

    return api;


    function login(username, password) {
        var url = "/api/assignment/graduate/login";
        var credentials = {
            username: username,
            password: password
        };
        return $http.post(url, credentials)
            .then(function (response) {
                return response.data;
            });
    }

    function createUser(user) {

        var url = "/api/assignment/user/";
       return $http.post(url, user)
           .then(function (response) {
               return response.data;
           })

    }

    function findUserbyUsername(username) {

        var url = "/api/assignment/user?username="+username;
        return $http.get(url)
            .then(function (response) {
                return response.data;
            })
    }

    function findUserById(userId) {
        var url = "/api/assignment/user/"+userId;
       return $http.get(url)
           .then(function (response) {
               return response.data;
           })
    }

    function findUserbyCredentials(username, password) {
        var url = "/api/assignment/user?username="+username+"&password="+password;
        return $http.get(url)
            .then(function (response) {
                return response.data;
            })
    }

    function updateUser(userId, user) {

        var url = "/api/assignment/user/"+userId;
        return $http.put(url, user)
            .then(function (response) {
                return response.data;
            })

    }

    function deleteUser(userId) {

        var url = "/api/assignment/user/"+userId;
        return $http.delete(url)
            .then(function (response) {
                return response.data;
            })

    }
}

})();
