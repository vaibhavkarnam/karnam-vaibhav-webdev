(function () {
    angular
        .module('WAM')
        .factory('userService', userService);
    
    function userService() {
        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder",  email: "alice@abc.com"},
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley", email: "bob@abc.com"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia", email: "charly@abc.com"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi", email: "jannuzi@abc.com" }
        ];

        var api ={
            createUser: createUser,
            findUserbyId: findUserbyId,
            findUserbyUsername: findUserbyUsername,
            findUserbyCredentials : findUserbyCredentials,
            updateUser: updateUser,
            deleteUser:deleteUser
        };

        return api;
        
        function createUser(user) {
            user._id = (new Date()).getTime() + "";
            user.created = new Date();
            users.push(user);
            return user;
        }

        function findUserbyUsername(username) {
            var user = users.find(function (user) {
                return user.username === username;
            });
            if(typeof user === 'undefined'){
                return null;
            }
            return user;
        }

        function findUserbyId(userId) {
            for(var u in users){
                if(users[u]._id === userId)
                    return users[u];
            }
            return null;
        }

        function findUserbyCredentials(username, password) {
            var found = false;
            for(var u in users) {
                var user = users[u];
                if (user.username === username &&
                    user.password === password) {

                    return user;
                }

            }
            return null;
        }

        function updateUser(userId, user) {
            var user_old = findUserbyId(userId);
            user_old.username = user.username;
            user_old.password = user.password;
            user_old.firstName = user.firstName;
            user_old.lastName = user.lastName;
            user_old.email = user.email;
        }
        
        function deleteUser(userId) {
            var user_old = findUserbyId(userId);
            var index = users.indexOf(user_old);
            users.splice(index, 1);
        }
    }
    
})();
