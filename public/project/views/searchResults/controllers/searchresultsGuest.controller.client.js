(function () {
    angular
        .module('fyh')
        .controller('searchresultsGuestController', searchresultsGuestController);



    function searchresultsGuestController($routeParams, $route, resultsService, $location, HouseService) {
        var model = this;
        model.searchProperty = searchProperty;
        model.venueId = $routeParams.zpid;
        model.logout = logout;


        function init() {
            resultsService
                .searchResults(model.venueId)
                .then(function (response) {
                    if(response.root.children.length <= 2){
                        model.error="Cannot find details for this property. Please Contact the owner for more details";
                        return;
                    }
                    model.src= response.root.children[2].children;
                    for (var i=0;i<=model.src.length;i++)
                    {
                        if(model.src[i].name === "address")
                        {
                            model.Street =  model.src[i].children[0].content;
                            model.zipcode =  model.src[i].children[1].content;
                             model.city =  model.src[i].children[2].content;
                             model.state =  model.src[i].children[3].content;
                        }

                        else if(model.src[i].name === "links"){
                            model.homedetails =  model.src[i].children[0].content;
                             model.photogallery =  model.src[i].children[1].content;
                             model.homeinfo =  model.src[i].children[2].content;
                        }

                        else if(model.src[i].name === "editedFacts") {
                            for (var j = 0; j < model.src[i].children.length; j++) {
                                if (model.src[i].children[j].name === "bedrooms") {
                                    model.bedrooms = model.src[i].children[j].content;
                                }
                                else if (model.src[i].children[j].name === "bathrooms") {
                                    model.bathrooms = model.src[i].children[j].content;
                                }
                                else if (model.src[i].children[j].name === "finishedSqFt") {
                                    model.finishedSqFt = model.src[i].children[j].content;
                                }
                                else if (model.src[i].children[j].name === "yearBuilt") {
                                    model.yearBuilt = model.src[i].children[j].content;
                                }
                                else if (model.src[i].children[j].name === "numFloors") {
                                    model.numFloors = model.src[i].children[j].content;
                                }
                                else if (model.src[i].children[j].name === "basement") {
                                    model.basement = model.src[i].children[j].content;
                                }
                                else if (model.src[i].children[j].name === "view") {
                                    model.view = model.src[i].children[j].content;
                                }
                                else if (model.src[i].children[j].name === "parkingType") {
                                    model.parking = model.src[i].children[j].content;
                                }
                                else if (model.src[i].children[j].name === "heatingSources") {
                                    model.heating = model.src[i].children[j].content;
                                }
                                else if (model.src[i].children[j].name === "heatingSystem") {
                                    model.heatingsys = model.src[i].children[j].content;
                                }
                                else if (model.src[i].children[j].name === "rooms") {
                                    model.rooms = model.src[i].children[j].content;
                                }
                            }
                        }
                        else if(model.src[i].name === "neighborhood"){
                                model.neighborhood =  model.src[i].content;
                            }

                        else if(model.src[i].name === "elementarySchool"){
                            model.elementarySchool =  model.src[i].content;
                        }
                        else if(model.src[i].name === "homeDescription"){
                            model.description =  model.src[i].content;
                        }
                        else if(model.src[i].name === "appliances"){
                            model.appliances =  model.src[i].content;
                        }
                        }
        });

            HouseService
                .findHouseById(model.venueId)
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
                  //  console.log(response);

                    model.name = response.zestimate.response.address.street;

                 //   console.log(model.name);
                    model.zipcode = response.zestimate.response.address.zipcode

                    $location.url('/searchresultsguest/'+model.venueId);
                })
        }


        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/login');
                });
        }


        
    }

})();