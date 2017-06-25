(function () {
    angular
        .module('fyh')
        .service('searchService', searchService)
        .service('resultsService', resultsService)
        .service('VenueService', VenueService)
        .service('resultsServiceSeller', resultsServiceSeller);


    function searchService($http) {


        var house = [
            {"zpid" : "2104272801", "street1":"198", "street2" : "Hillside", "street3":"Street", "city":"boston", "state":"ma"}
            ];


        this.searchAddress = searchAddress;

       // var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

       var url =  "/api/searchAddress/:street1/:street2/:street3/:city/:state";

        function searchAddress(street1,street2,street3,city,state) {

            console.log(street1);
            console.log(street2);
            console.log(street3);
            console.log(city);
            console.log(state);




            var url =  "/api/searchAddress/"+street1+"/"+street2+"/"+street3+"/"+city+"/"+state;


                return $http.get(url)
                    .then(function (response) {
                    //    console.log(response);
                        return response.data;
                    })

        }
    }

    function resultsService($http) {

        this.searchResults = searchResults;

        function searchResults(zpid) {

            var url =  "/api/results/"+zpid;
            return $http.get(url)
                .then(function (response) {
                    //    console.log(response);
                    return response.data;
                })

        }
    }


    function resultsServiceSeller($http) {

        this.searchResultsSeller = searchResultsSeller;

        function searchResultsSeller(zpid) {

            var url =  "/api/searchResults/"+zpid;
            return $http.get(url)
                .then(function (response) {
                    //    console.log(response);
                    return response.data;
                })

        }
    }

    function VenueService($http) {

        this.createVenue = createVenue,
            this.findVenueById = findVenueById,
            this.updateVenue = updateVenue,
            this.addComment = addComment,
            this.deleteComment = deleteComment,
            this.addFavoriteOf = addFavoriteOf,
            this.removeFavoriteOf = removeFavoriteOf,
            this.isFavoriteOf = isFavoriteOf,
            this.getAllVenue = getAllVenue,
            this.deleteVenue = deleteVenue;


        function deleteVenue(venueId) {
            console.log("venue Id");
            console.log(venueId);
            return $http.delete("/api/project/venue/" + venueId);
        }

        function getAllVenue() {
            return $http.get("/api/project/admin/venues");
        }

        function isFavoriteOf(venueId, userId) {
            return $http.get("/api/project/venue/" + venueId + "/isFavoriteOf/" + userId);
        }

        function removeFavoriteOf(venueId, userId) {
            var body = {
                userId: userId
            }
            return $http.put("/api/project/venue/" + venueId + "/removeFavorite", body);
        }

        function addFavoriteOf(venueId, userId) {
            var body = {
                userId: userId
            }
            return $http.put("/api/project/venue/" + venueId + "/addFavorite", body);
        }

        function deleteComment(venueId, comment) {
            return $http.put("/api/project/venue/" + venueId + "/deleteComment", comment);
        }

        function addComment(venueId, comment) {
            return $http.put("/api/project/venue/" + venueId + "/addComment", comment);
        }

        function updateVenue(venueId, venue) {
            return $http.put("/api/project/venue/" + venueId, venue);
        }

        function findVenueById(venueId) {
            return $http.get("/api/project/venue/" + venueId);
        }

        function createVenue(venue) {
            return $http.post("/api/project/venue", venue);
        }


    }


})();