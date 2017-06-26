(function () {
angular
    .module('fyh')
    .factory('userService', userService);

function userService($http) {

    var api ={
        createUser: createUser,
        findUserById: findUserById,
        findUserbyUsername: findUserbyUsername,
        findUserbyCredentials : findUserbyCredentials,
        updateUser: updateUser,
        deleteUser:deleteUser,
        login: login,
        logout: logout,
        loggedin:loggedin,
        register:register,
        checkAdmin: checkAdmin,
        findAllUsers: findAllUsers,
        addFavorite: addFavorite,
        removeFavorite: removeFavorite,
        addFriend: addFriend,
        removeFriend: removeFriend,
        addToFriendRequest: addToFriendRequest,
        removeFromFriendRequest: removeFromFriendRequest,
        deleteImage: deleteImage,
        addNote:addNote,
        deleteNote:deleteNote,
        getUsers:getUsers


};

    return api;

    function addNote(userId, note) {
        var body = {
            userId: userId,
            note: note
        };
        return $http.put("/api/project/addNote", body);
    }

    function getUsers() {
        return $http.get('/api/project/admin/users');
    }

    function deleteNote(userId, note) {
        var body = {
            userId: userId,
            note: note
        };
        return $http.put("/api/project/deleteNote", body);
    }

    function deleteImage(userId) {
        return $http.put("/api/project/deleteImage/" + userId);
    }

    function addToFriendRequest(userId, friendId) {
        var body = {
            userId: userId,
            friendId: friendId
        }
        return $http.put("/api/project/addToFriendRequest", body);
    }

    function removeFromFriendRequest(userId, friendId) {
        var body = {
            userId: userId,
            friendId: friendId
        }
        return $http.put("/api/project/removeFromFriendRequest", body);
    }

    function addFriend(userId, friendId) {
        var body = {
            userId: userId,
            friendId: friendId
        };
        return $http.put("/api/project/addFriend", body);
    }

    function removeFriend(userId, friendId) {
        var body = {
            userId: userId,
            friendId: friendId
        }
        return $http.put("/api/project/removeFriend", body);
    }

    function addFavorite(userId, venue) {
        var body = {
            userId: userId,
            venue: venue
        };
        return $http.put("/api/project/addFavorite", body);
    }

    function removeFavorite(userId, venueId) {
        var body = {
            userId: userId,
            venueId: venueId
        };
        return $http.put("/api/project/removeFavorite", body);
    }


    function register(userObj) {
        var url = "/api/register";
        return $http.post(url, userObj)
            .then(function (response) {
                return response.data;
            });
    }


    function logout() {
        var url = "/api/logout";
        return $http.post(url)
            .then(function (response) {
                return response.data;
            });
    }


       // console.log("client login");
    function login(username,password) {
        var url="/api/login";
        credentials={
            username:username,
            password:password
        };
        return $http.post(url,credentials)
            .then(function (response) {
                return response.data;
            });
    }



    function loggedin() {
        var url = "/api/loggedin";
        return $http.get(url)
            .then(function (response) {
                return response.data;
            });
    }

    function checkAdmin() {
        var url = "/api/admin";
        return $http.get(url)
            .then(function (response) {
                return response.data;
            });
    }

    function createUser(user) {

        var url = "/api/user";
       return $http.post(url, user)
           .then(function (response) {
               return response.data;
           });

    }

    function findUserbyUsername(username) {

        var url = "/api/user?username="+username;
        return $http.get(url)
            .then(function (response) {
                return response.data;
            });
    }

    function findUserById(userId) {
        var url = "/api/user/"+userId;
       return $http.get(url)
           .then(function (response) {
               return response.data;
           });
    }

    function findUserbyCredentials(username, password) {
        var url = "/api/user?username="+username+"&password="+password;
        return $http.get(url)
            .then(function (response) {
                return response.data;
            });
    }
    function findAllUsers() {
        var url = "/api/user";
        return $http.get(url)
            .then(function (response) {
                return response.data;
            });
    }


    function updateUser(userId, user) {
        var url = "/api/user/"+userId;
        return $http.put(url, user)
            .then(function (status) {
            //    console.log("accepted")
                return status;
            });

    }

    function deleteUser(userId) {

        var url = "/api/user/"+userId;
        return $http.delete(url)
            .then(function (response) {
                return response.data;
            });

    }
}

})();
