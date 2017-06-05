(function () {
    angular
        .module('WAMA')
        .controller('searchController', searchController);



    function searchController(searchService) {
        var model = this;

        model.searchAddress = searchAddress;


     function searchAddress(street1, street2, street3, city, state) {
         console.log("controller");
         searchService
             .searchAddress(street1,street2,street3,city,state)
             .then(function(response) {
                console.log(response.data);
                //  data = response.data.replace("jsonFlickrApi(","");
                //  data = data.substring(0,data.length - 1);
                // data =
                 model.data = response.data;

             });


     }





    }

})();