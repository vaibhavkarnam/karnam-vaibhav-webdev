(function () {
angular
    .module('fyh')
    .controller('profileController', profileController);


function profileController($routeParams, $route, $location, currentUser, userService, searchService) {

    var model = this;
    model.currentUser = currentUser;
    model.addNote = addNote;
    model.deleteNote = deleteNote;
    model.deleteImage = deleteImage;
    model.requestAccept = requestAccept;
    model.requestDeny = requestDeny;
    model.findFriend = findFriend;
    model.updateUser = updateUser;
    model.deleteUser = deleteUser;
    model.logout = logout;
    model.searchAddress = searchAddress;
    //model.userId = $routeParams['userId'];
    model.userId = currentUser._id;
    model.searchAddressZestimate =searchAddressZestimate;

   // console.log(model.currentUser.roles.indexOf('SELLER'));

    function init() {
        //renderUser(currentUser);
        userService
            .findUserById(model.userId)
            .then(function (response) {
                model.user = response;
              //  console.log(model.user);
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

              //  console.log(model.fRequests);
            });

        // model.user = angular.copy(userService.findUserbyId(model.userId));
    }

    init();

    function logout() {
        userService
            .logout()
            .then(function () {
                $location.url('/login');
            });
    }

    function updateUser() {
        userService
            .updateUser(model.user._id, model.user)
            .then( function () {
                    model.message = "Updated successfully";
                    $location.url('/profile/view')
                },
                function (error) {
                    model.error = "Unable to update user"
                }
            );
    }

    function deleteUser(user) {
        userService
            .deleteUser(user._id)
            .then(function () {
                $location.url('/')
            }, function () {
                model.error = "unable to unregister you";
            });
    }

    function renderUser(user) {
        model.user = user;
    }

    function userError(error) {
        model.error = "User not found";
    }


    function deleteNote(note) {
        userService
            .deleteNote(model.userId, note)
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

    function deleteImage() {

            userService
                .deleteImage(model.user._id)
                .then(
                    function (response) {
                        model.deleteImagestatus = true;
                        $route.reload();
                    },
                    function (error) {
                        model.imgDeleteError = "Unable to delete the image";
                        $route.reload();
                    })

    }

    function addNote(noteValue) {
        if(noteValue === "null" || typeof noteValue === 'undefined'){
            model.noteErr = "please enter text to post";
            return;
        }
        var note = {
            value: noteValue,
            createdOn: Date.now(),
            writtenBy: model.userId
        }
        userService
            .addNote(model.userId, note)
            .then(
                function (response) {
                    model.addNoteStatus = true;
                    $route.reload();
                }, function (error) {
                    $route.reload();
                }
            )
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


    function requestAccept(friendId) {
      //  console.log(model.userId);
     //   console.log(friendId);
        userService
            .removeFromFriendRequest(model.userId, friendId)
            .then(
                function (response) {
                 //   console.log(response);
                    userService
                        .addFriend(model.userId, friendId)
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


    function requestDeny(friendId) {
        userService
            .removeFromFriendRequest(model.userId, friendId)
            .then(
                function (response) {
                    userService
                        .removeFriend(friendId, model.userId)
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


    model.searchPlaces = function (searchString, searchLocation) {
        if (searchString == null || searchString.trim === "" || searchString == undefined
            || searchLocation == null || searchLocation.trim === "" || searchLocation == undefined) {
            model.error = "Please enter a valid location and a search query"
        } else {
            $location.url("/searchResult/" + searchString + "/" + searchLocation);
        }
    };



    function findFriend(friendName) {
        userService
            .findUserbyUsername(friendName)
            .then(
                function (response) {
                    model.friendSearch = response;
                //    console.log(response);
                },
                function (error) {
                    model.friendSearch = null;
                    model.frndError = "Counld not find user!";
                }
            )
    }

    function searchAddress(address) {
        if(address === null || typeof address==='undefined'){
            model.error="address is required";
            return;
        }
       // console.log(address);
        var street = address.split(",")[0];
        var street1 =street.split(" ")[0];
        var street2 =street.split(" ")[1];
        var street3 =street.split(" ")[2];
        var city = address.split(",")[1];
        var citynew = city.split(" ")[1];
        var stateold = address.split(",")[2];
        var state = stateold.split(" ")[1];
        searchService
            .searchAddress(street1,street2,street3,citynew,state)
            .then(function(response) {
                //  data = response.data.replace("jsonFlickrApi(","");
                //  data = data.substring(0,data.length - 1);
                // data =

                //    console.log(response);

                model.data = response.root.children;

                if(model.data.length > 2){
                    model.Street =  response.root.children[2].children[0].children[0].children[2].children[0].content;
                    model.zipcode =  response.root.children[2].children[0].children[0].children[2].children[1].content;
                    model.city =  response.root.children[2].children[0].children[0].children[2].children[2].content;

                    model.state =  response.root.children[2].children[0].children[0].children[2].children[3].content;

                    model.zpid = response.root.children[2].children[0].children[0].children[0].content;
              //      console.log(model.zpid);

                    model.details =  response.root.children[2].children[0].children[0].children[1].children[0].content;
                    model.map =  response.root.children[2].children[0].children[0].children[1].children[1].content;
                    model.comparables =  response.root.children[2].children[0].children[0].children[1].children[2].content;


                    model.rentestimate =  response.root.children[2].children[0].children[0].children[3].children[0].content;
                    model.updated =  response.root.children[2].children[0].children[0].children[3].children[1].content;




                    $location.url('/searchresults/'+model.zpid);

                }
                // console.log(model.data);
                else
                {
                    model.error = "Could not find details for this house." +
                        "Please enter a different address";
                }


            });


    }



    function searchAddressZestimate(address) {
        if(address === null || typeof address==='undefined'){
            model.error="address is required";
            return;
        }
     //   console.log(address);
       var street = address.split(",")[0];
       var street1 =street.split(" ")[0];
        var street2 =street.split(" ")[1];
        var street3 =street.split(" ")[2];
        var city = address.split(",")[1];
        var citynew = city.split(" ")[1];
        var stateold = address.split(",")[2];
        var state = stateold.split(" ")[1];
        searchService
            .searchAddress(street1,street2,street3,citynew,state)
            .then(function(response) {
                //  data = response.data.replace("jsonFlickrApi(","");
                //  data = data.substring(0,data.length - 1);
                // data =

              //      console.log(response);

            //    model.data = response.root.children[2].children[0].children[0];
           //     console.log(model.data);

                model.data = response.root.children;

                if(model.data.length > 2){

                model.Street =  response.root.children[2].children[0].children[0].children[2].children[0].content;
                model.zipcode =  response.root.children[2].children[0].children[0].children[2].children[1].content;
                model.city =  response.root.children[2].children[0].children[0].children[2].children[2].content;

                model.state =  response.root.children[2].children[0].children[0].children[2].children[3].content;

                model.zpid = response.root.children[2].children[0].children[0].children[0].content;
             //   console.log(model.zpid);

                model.details =  response.root.children[2].children[0].children[0].children[1].children[0].content;
                model.map =  response.root.children[2].children[0].children[0].children[1].children[1].content;
                model.comparables =  response.root.children[2].children[0].children[0].children[1].children[2].content;


                model.rentestimate =  response.root.children[2].children[0].children[0].children[3].children[0].content;
                model.updated =  response.root.children[2].children[0].children[0].children[3].children[1].content;





                $location.url('/searchResultsSeller/'+model.zpid);

                }
                // console.log(model.data);
                else
                {
                    model.error = "Could not find details for this house." +
                        "Please enter a different address";
                }

            });


    }

}

})();