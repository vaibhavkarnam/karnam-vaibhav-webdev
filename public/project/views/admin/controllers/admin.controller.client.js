(function () {
    angular
        .module("fyh")
        .controller("AdminController", AdminController);

    function AdminController($location, searchService, $route, VenueService, userService) {
        var model = this;
        model.deleteUser = deleteUser;
        model.deleteVenue = deleteVenue;
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

            VenueService
                .getAllVenue()
                .then(
                    function (response) {
                      //  console.log(response.data)
                        if (response.data) {
                            model.ven = response.data;
                            model.venues = [];
                            for (var i in model.ven) {
                            //    console.log(model.ven[i].venueId);
                                getVenueDetails(model.ven[i].venueId);
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
            if (adminUsername === "admin" && adminPassword === "admin") {
                $location.url("/admin/login");
            } else {
                model.error = "Invalid Credentials";
            }
        }

        function getVenueDetails(venueId) {
            VenueService
                .findVenueById(venueId)
                .then(
                    function (response) {
                        console.log(response);
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


        function deleteVenue(venueId) {
            var confirmation = confirm("Are you sure to delete this venue ?");
            if (confirmation) {
                VenueService
                    .deleteVenue(venueId)
                    .then(
                        function (res) {
                            $route.reload();
                            model.deleteVenueStatus = true;
                        },
                        function (error) {
                            $route.reload();
                            model.deleteVenueStatus = false;
                        }
                    );
            }
        }


    }

})();