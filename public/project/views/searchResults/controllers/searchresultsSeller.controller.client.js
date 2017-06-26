(function () {
    angular
        .module('fyh')
        .controller('searchresultsSellerController', searchresultsSellerController);



    function searchresultsSellerController($routeParams, $route, resultsServiceSeller, resultsService, searchService, $location, currentUser, VenueService, userService) {
        var model = this;
        model.searchProperty = searchProperty;
        model.venueId = $routeParams.zpid;
        model.user = currentUser;
        model.removeFavorite = removeFavorite;
        model.addFavorite = addFavorite;
        model.addComment = addComment;
        model.deleteComment = deleteComment;
        model.unregister = unregisterUser;
        model.logout = logout;
        model.getUserDetails = getUserDetails;
        model.fetchUserDetails = fetchUserDetails;


        function init() {
            resultsServiceSeller
                .searchResultsSeller(model.venueId)
                .then(function (response) {
                    if(response.root.children.length <= 2){
                        model.error="Cannot find details for this property. Please Contact the owner for more details";
                        return;
                    }
                    model.src= response.root.children[2].children;
                   // console.log()
                     for (var i=0;i<=model.src.length;i++)
                     {
                         if(model.src[i].name === "address")
                         {
                             model.Street =  model.src[i].children[0].content;
                             model.zipcode =  model.src[i].children[1].content;
                              model.city =  model.src[i].children[2].content;
                              model.state =  model.src[i].children[3].content;
                         }
                    //
                         else if(model.src[i].name === "links"){
                             model.homedetails =  model.src[i].children[0].content;
                              model.photogallery =  model.src[i].children[1].content;
                              model.homeinfo =  model.src[i].children[2].content;
                         }

                         else if(model.src[i].name === "zestimate"){
                             model.amount =  model.src[i].children[0].content;
                             model.valuationChange =  model.src[i].children[3].content;
                             model.low =  model.src[i].children[4].children[0].content;
                             model.high =  model.src[i].children[4].children[1].content;
                         }
                    //
                    //     else if(model.src[i].name === "editedFacts") {
                    //         for (var j = 0; j < model.src[i].children.length; j++) {
                    //             if (model.src[i].children[j].name === "bedrooms") {
                    //                 model.bedrooms = model.src[i].children[j].content;
                    //             }
                    //             else if (model.src[i].children[j].name === "bathrooms") {
                    //                 model.bathrooms = model.src[i].children[j].content;
                    //             }
                    //             else if (model.src[i].children[j].name === "finishedSqFt") {
                    //                 model.finishedSqFt = model.src[i].children[j].content;
                    //             }
                    //             else if (model.src[i].children[j].name === "yearBuilt") {
                    //                 model.yearBuilt = model.src[i].children[j].content;
                    //             }
                    //             else if (model.src[i].children[j].name === "numFloors") {
                    //                 model.numFloors = model.src[i].children[j].content;
                    //             }
                    //             else if (model.src[i].children[j].name === "basement") {
                    //                 model.basement = model.src[i].children[j].content;
                    //             }
                    //             else if (model.src[i].children[j].name === "view") {
                    //                 model.view = model.src[i].children[j].content;
                    //             }
                    //             else if (model.src[i].children[j].name === "parkingType") {
                    //                 model.parking = model.src[i].children[j].content;
                    //             }
                    //             else if (model.src[i].children[j].name === "heatingSources") {
                    //                 model.heating = model.src[i].children[j].content;
                    //             }
                    //             else if (model.src[i].children[j].name === "heatingSystem") {
                    //                 model.heatingsys = model.src[i].children[j].content;
                    //             }
                    //             else if (model.src[i].children[j].name === "rooms") {
                    //                 model.rooms = model.src[i].children[j].content;
                    //             }
                    //         }
                    //     }
                    //     else if(model.src[i].name === "neighborhood"){
                    //             model.neighborhood =  model.src[i].content;
                    //         }
                    //
                    //     else if(model.src[i].name === "elementarySchool"){
                    //         model.elementarySchool =  model.src[i].content;
                    //     }
                    //     else if(model.src[i].name === "homeDescription"){
                    //         model.description =  model.src[i].content;
                    //     }
                    //     else if(model.src[i].name === "appliances"){
                    //         model.appliances =  model.src[i].content;
                     //    }
                         }

        });

            VenueService
                .findVenueById(model.venueId)
                .then(
                    function (response) {
                        var venue = response.data;
                        if (venue && model.user) {
                            if (venue.favoriteOf.indexOf(model.user._id) > -1) {
                                model.isFavorite = true;
                                model.isNotFavorite = false;
                            } else {
                                model.isFavorite = false;
                                model.isNotFavorite = true;
                            }
                        } else {
                            model.isFavorite = false;
                            model.isNotFavorite = true;
                        }
                        model.cmters = [];
                        if (venue) {
                            for (var i in venue.comments) {
                                var cmt = venue.comments[i];
                                fetchUserDetails(cmt);
                            }
                        }
                    },
                    function (error) {
                        model.cmters = [];
                    }
                );
}

        init();

        function searchProperty(venueId) {
            resultsService
                .searchResults(venueId)
                .then(function (response) {
                   // console.log(response);

                    model.name = response.zestimate.response.address.street;

                   // console.log(model.name);
                    model.zipcode = response.zestimate.response.address.zipcode

                    $location.url('/searchresults/'+model.venueId);
                })
        }




        function fetchUserDetails(cmt) {
            userService
                .findUserById(cmt.commentedBy)
                .then(
                    function (response) {
                        var updatedComment = {
                            _id: cmt._id,
                            commentedOn: cmt.commentedOn,
                            commentedUser: response,
                            value: cmt.value
                        };
                        model.cmters.push(updatedComment);
                        return response;
                    },
                    function (error) {
                        return null;
                    }
                );
            
        } 
        
        function removeFavorite() {
            userService
                .removeFavorite(currentUser._id, model.venueId)
                .then(
                    function (response) {
                        return VenueService
                            .removeFavoriteOf(model.venueId, currentUser._id);
                    },
                    function (error) {
                        model.removeFavoriteStatus = false;
                        $route.reload();
                        $location.url("/searchresults/" + model.venueId);
                    }
                )
                .then(
                    function (response) {
                        model.removeFavoriteStatus = true;
                        $route.reload();
                        $location.url("/searchresults/" + model.venueId);
                    },
                    function (error) {
                        model.removeFavoriteStatus = false;
                        $route.reload();
                        $location.url("/searchresults/" + model.venueId);
                    }
                );
        }


        function addFavorite() {
            if (currentUser) {
                var venue = {
                    venueId: model.venueId,
                    venueImage: model.imgURL,
                    venueName: model.Street,
                };
                userService
                    .addFavorite(currentUser._id, venue)
                    .then(
                        function (response) {
                            return VenueService
                                .addFavoriteOf(model.venueId, currentUser._id);
                        },
                        function (error) {
                            model.addFavoriteStatus = false;
                            $route.reload();
                            $location.url("/serachresults/" + model.venueId);
                        }
                    )
                    .then(
                        function (response) {
                            model.addFavoriteStatus = true;
                            $route.reload();
                            $location.url("/searchresults/" + model.venueId);
                        },
                        function (error) {
                            model.addFavoriteStatus = false;
                            $route.reload();
                            $location.url("/searchresults/" + model.venueId);
                        }
                    );
            } else {
                $location.url("/login?venueId=" + model.venueId);
            }
        }

        function addComment(commentValue) {
            if (currentUser) {
                var comment = {
                    value: commentValue,
                    commentedBy: currentUser._id,
                    commentedOn: Date.now()
                };
                VenueService
                    .addComment(model.venueId, comment)
                    .then(
                        function (response) {
                            model.addCommentStatus = true;
                            $route.reload();
                            $location.url("/searchresults/" + model.venueId);
                        },
                        function (error) {
                            model.addCommentStatus = false;
                            $route.reload();
                            $location.url("/searchresults/" + model.venueId);
                        }
                    );
            } else {
                $location.url("/login?venueId=" + model.venueId);
            }
        }


        function deleteComment(comment) {
            VenueService
                .deleteComment(model.venueId, comment)
                .then(
                    function (response) {
                        model.deleteCommentStatus = true;
                        $route.reload();
                        $location.url("/searchresults/" + model.venueId);
                    },
                    function (error) {
                        model.deleteCommentStatus = false;
                        $route.reload();
                        $location.url("/searchresults/" + model.venueId);
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

        function unregisterUser() {
            userService
                .deleteUser(model.user._id)
                .then(
                    function (response) {
                        $location.url("/main");
                        currentUser = null;
                    },
                    function (error) {
                        model.error = "Unable to remove user";
                        currentUser = null
                    }
                );
        }


        function getUserDetails(commentedById) {
            userService
                .findUserById(commentedById)
                .then(
                    function (response) {
                        model.commentedByUser = response;
                    },
                    function (error) {
                        model.commentedByUser = null;
                    }
                );
        }

        

        
    }

})();