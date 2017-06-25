(function () {
    angular
        .module("fyh")
        .controller("profileControllerVisit", profileControllerVisit)

    function profileControllerVisit($routeParams, $route, $rootScope, userService, $location, currentUser) {

        var model = this;
        model.currentUser = currentUser;
        var friendId = $routeParams.id;
        model.requestAccept = requestAccept;
        model.requestDeny = requestDeny;
        model.addfriend = addfriend;
        model.cancelRequest = cancelRequest;
        model.unfriend = unfriend;
        model.unregister = unregisterUser;
        model.logout = logout;
        model.deleteNote = deleteNote;
        model.addNote = addNote;
        model.findFriend = findFriend;
      //  model.searchAddress = searchAddress;

        function init() {
            userService
                .findUserById(friendId)
                .then(function (response) {
                    model.user = response;
                    if (currentUser) {
                        userService
                            .findUserById(currentUser._id)
                            .then(
                                function (response) {
                                    var refreshedUser = response;
                                    if (refreshedUser && (refreshedUser.friends.indexOf(model.user._id) > -1) && (model.user.friends.indexOf(currentUser._id) > -1)) {
                                        model.isFriends = true;
                                    }
                                    if (refreshedUser && (refreshedUser.friends.indexOf(model.user._id) > -1) && (model.user.friends.indexOf(currentUser._id) === -1)) {
                                        model.requestSent = true;
                                    }
                                    if (refreshedUser && (refreshedUser.friends.indexOf(model.user._id) === -1) && (model.user.friends.indexOf(currentUser._id) === -1)) {
                                        model.notFriends = true;
                                    }
                                    if (refreshedUser &&
                                        (refreshedUser.friends.indexOf(model.user._id) === -1) &&
                                        (model.user.friends.indexOf(currentUser._id) > -1) &&
                                        (refreshedUser.friendRequest.indexOf(model.user._id) > -1)) {
                                        model.accptFrend = true;
                                    }
                                }
                            );
                    } else {
                        model.isFriends = false;
                        model.requestSent = false;
                        model.notFriends = false;
                        model.accptFrend = false;
                    }
                    model.fRequests = [];
                    for (var i in model.user.friendRequest) {
                        fetchUserDetails(model.user.friendRequest[i]);
                    }
                    model.frnds = [];
                    for (var i in model.user.friends) {
                        fetchFriendsDetails(model.user.friends[i]);
                    }
                    model.nts = [];
                    for (var i in model.user.notes) {
                        fetchNoteDetails(model.user.notes[i]);
                    }
                });
        }

        init();

        function requestAccept() {
            console.log(friendId);
            console.log(currentUser._id);
            userService
                .removeFromFriendRequest(currentUser._id, friendId)
                .then(
                    function (response) {
                        userService
                            .addFriend(currentUser._id, friendId)
                            .then(
                                function (response) {
                                    $route.reload();
                                },
                                function (error) {
                                    $route.reload();
                                }
                            )
                    },
                    function (error) {
                        $route.reload();
                    }
                );
        }

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/login');
                });
        }

        function requestDeny() {
            userService
                .removeFromFriendRequest(currentUser._id, friendId)
                .then(
                    function (response) {
                        userService
                            .removeFriend(friendId, currentUser._id)
                            .then(
                                function (response) {
                                    $route.reload();
                                },
                                function (error) {
                                    $route.reload();
                                }
                            )
                    },
                    function (error) {
                        $route.reload();
                    }
                );
        }

        function fetchNoteDetails(note) {
            userService
                .findUserById(note.writtenBy)
                .then(
                    function (response) {
                        note.writerDetails = response;
                        model.nts.push(note);
                    }
                );
        }

        function fetchUserDetails(usrId) {
            userService
                .findUserById(usrId)
                .then(
                    function (response) {
                        model.fRequests.push(response);
                        return response;
                    },
                    function (error) {
                        return null;
                    }
                );
        }

        function fetchFriendsDetails(usrId) {
            userService
                .findUserById(usrId)
                .then(
                    function (response) {
                        model.frnds.push(response);
                        return response;
                    },
                    function (error) {
                        return null;
                    }
                );
        }

        function addfriend() {
            userService
                .addFriend(currentUser._id, friendId)
                .then(
                    function (response) {
                        userService
                            .addToFriendRequest(friendId, currentUser._id)
                            .then(
                                function (response) {
                                    $route.reload();
                                },
                                function (error) {
                                    $route.reload();
                                }
                            )
                    },
                    function (error) {
                        $route.reload();
                    }
                )
        }


        function cancelRequest() {
            userService
                .removeFromFriendRequest(friendId, currentUser._id)
                .then(
                    function (response) {
                        userService
                            .removeFriend(currentUser._id, friendId)
                            .then(
                                function (response) {
                                    $route.reload();
                                },
                                function (error) {
                                    $route.reload();
                                }
                            )
                    },
                    function (error) {
                        $route.reload();
                    }
                );
        }


        function unfriend() {
            userService
                .removeFriend(friendId, currentUser._id)
                .then(
                    function (response) {
                        userService
                            .removeFriend(currentUser._id, friendId)
                            .then(
                                function (response) {
                                    $route.reload();
                                },
                                function (error) {
                                    $route.reload();
                                }
                            )
                    },
                    function (error) {
                        $route.reload();
                    }
                );
        }




        function unregisterUser() {
            userService
                .deleteUser(id)
                .then(
                    function (response) {
                        $location.url("/main");
                        $rootScope.currentUser = null
                    },
                    function (error) {
                        model.error = "Unable to remove user"
                        $rootScope.currentUser = null
                    }
                );
        }


        function deleteNote(note) {
            userService
                .deleteNote(friendId, note)
                .then(
                    function (response) {
                        model.deleteNoteStatus = true;
                        $route.reload();
                    },
                    function (error) {
                        $route.reload();
                    }
                )
        }


        function addNote(noteValue) {
            var note = {
                value: noteValue,
                createdOn: Date.now(),
                writtenBy: currentUser
            }
            userService
                .addNote(friendId, note)
                .then(
                    function (response) {
                        model.addNoteStatus = true;
                        $route.reload();
                    }, function (error) {
                        $route.reload();
                    }
                )
        }

        function findFriend(friendName) {
            userService
                .findUserByUsername(friendName)
                .then(
                    function (response) {
                        model.friendSearch = response;
                    },
                    function (error) {
                        model.friendSearch = null;
                    }
                )
        }


    }
})();