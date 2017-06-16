(function () {
    angular
        .module('WAMA')
        .controller('searchController', searchController);



    function searchController(searchService, $location) {
        var model = this;

        model.searchAddress = searchAddress;


     function searchAddress(street1, street2, street3, city, state) {
         console.log("controller");
         searchService
             .searchAddress(street1,street2,street3,city,state)
             .then(function(response) {
                //  data = response.data.replace("jsonFlickrApi(","");
                //  data = data.substring(0,data.length - 1);
                // data =

             //    console.log(response);

                 model.data = response.root.children[2].children[0].children[0];
                console.log(model.data);

                 model.zpid = response.root.children[2].children[0].children[0].children[0].content;


                     $location.url('/searchresults/'+model.zpid);

             });


     }





    }

})();