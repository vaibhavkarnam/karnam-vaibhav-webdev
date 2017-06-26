(function () {
    angular
        .module('fyh')
        .service('searchService', searchService)
        .service('resultsService', resultsService)
        .service('HouseService', HouseService)
        .service('resultsServiceSeller', resultsServiceSeller);


    function searchService($http) {


        var house = [
            {"zpid" : "2104272801", "street1":"198", "street2" : "Hillside", "street3":"Street", "city":"boston", "state":"ma"}
            ];


        this.searchAddress = searchAddress;

       var url =  "/api/searchAddress/:street1/:street2/:street3/:city/:state";

        function searchAddress(street1,street2,street3,city,state) {

          //  console.log(street1);
          //  console.log(street2);
          //  console.log(street3);
          //  console.log(city);
          //  console.log(state);




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

    function HouseService($http) {

        this.createHouse = createHouse,
            this.findHouseById = findHouseById,
            this.updateHouse = updateHouse,
            this.addComment = addComment,
            this.deleteComment = deleteComment,
            this.addFavoriteOf = addFavoriteOf,
            this.removeFavoriteOf = removeFavoriteOf,
            this.isFavoriteOf = isFavoriteOf,
            this.getAllHouse = getAllHouse,
            this.deleteHouse = deleteHouse;


        function deleteHouse(venueId) {
            //console.log("venue Id");
          //  console.log(venueId);
            return $http.delete("/api/project/house/" + venueId);
        }

        function getAllHouse() {
            return $http.get("/api/project/admin/houses");
        }

        function isFavoriteOf(venueId, userId) {
            return $http.get("/api/project/house/" + venueId + "/isFavoriteOf/" + userId);
        }

        function removeFavoriteOf(venueId, userId) {
            var body = {
                userId: userId
            }
            return $http.put("/api/project/house/" + venueId + "/removeFavorite", body);
        }

        function addFavoriteOf(venueId, userId) {
            var body = {
                userId: userId
            }
            return $http.put("/api/project/house/" + venueId + "/addFavorite", body);
        }

        function deleteComment(venueId, comment) {
            return $http.put("/api/project/house/" + venueId + "/deleteComment", comment);
        }

        function addComment(venueId, comment) {
            return $http.put("/api/project/house/" + venueId + "/addComment", comment);
        }

        function updateHouse(venueId, venue) {
            return $http.put("/api/project/house/" + venueId, venue);
        }

        function findHouseById(venueId) {
            return $http.get("/api/project/house/" + venueId);
        }

        function createHouse(venue) {
            return $http.post("/api/project/house", venue);
        }


    }


})();