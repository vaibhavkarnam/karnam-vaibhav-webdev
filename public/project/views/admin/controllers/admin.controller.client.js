(function () {
    angular
        .module("fyh")
        .controller("AdminController", AdminController);

    function AdminController($location, searchService, $route, HouseService, userService) {
        var model = this;
        model.deleteUser = deleteUser;
        model.deleteHouse = deleteHouse;
        model.adminLogin = adminLogin;
        model.register = register;
        model.updateUser = updateUser;
        model.logout = logout;
        function updateUser(user) {
            userService
                .updateUser(user._id, user)
                .then(
                    function (response) {
                        model.success = "Updated successfully";
                        $route.reload();
                    },
                    function (error) {
                        model.error = "Unable to update user"
                    }
                );
        }

        function register(user) {
            userService
                .register(user)
                .then(
                    function (response) {
                        var user = response;
                        if (user) {
                            model.success = "Registered successfully";
                            $route.reload();
                        }
                    },
                    function (err) {
                        model.error = err.data;
                    }
                );

        }

        function init() {
            userService
                .getUsers()
                .then(
                    function (response) {
                        if (response.data) {
                            model.users = response.data;
                        } else {
                            model.users = [];
                        }
                    },
                    function (error) {
                        model.users = [];
                    }
                );

            HouseService
                .getAllHouse()
                .then(
                    function (response) {
                      //  console.log(response.data)
                        if (response.data) {
                            model.ven = response.data;
                            model.venues = [];
                            for (var i in model.ven) {
                            //    console.log(model.ven[i].venueId);
                                getHouseDetails(model.ven[i].venueId);
                            }
                        } else {
                            model.venues = [];
                        }
                    },
                    function (error) {
                        model.venues = [];
                    }
                )
        }

        init();

        function adminLogin(adminUsername, adminPassword) {
            if(adminUsername === null || typeof adminUsername==='undefined'){
                model.error="username is required";
                return;
            }
            if(adminPassword === null || typeof adminPassword==='undefined'){
                model.error="password is required";
                return;
            }
            if (adminUsername === "admin" && adminPassword === "admin") {
                $location.url("/admin/login");
            } else {
                model.error = "Invalid Credentials";
            }
        }

        function getHouseDetails(venueId) {
            HouseService
                .findHouseById(venueId)
                .then(
                    function (response) {
                     //   console.log(response);
                        var venueDetails = response.data;
                        model.venues.push(venueDetails);
                    }
                )
        }

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/login');
                });
        }

        function deleteUser(user) {
            var confirmation = confirm("Are you sure to delete this user ?");
            if (confirmation) {
                userService
                    .deleteUser(user._id)
                    .then(
                        function (res) {
                            $route.reload();
                            model.deleteUserStatus = true;
                        },
                        function (error) {
                            $route.reload();
                            model.deleteUserStatus = false;
                        }
                    );
            }
        }


        function deleteHouse(venueId) {
            var confirmation = confirm("Are you sure to delete this venue ?");
            if (confirmation) {
                HouseService
                    .deleteHouse(venueId)
                    .then(
                        function (res) {
                            $route.reload();
                            model.deleteHouseStatus = true;
                        },
                        function (error) {
                            $route.reload();
                            model.deleteHouseStatus = false;
                        }
                    );
            }
        }


    }

})();