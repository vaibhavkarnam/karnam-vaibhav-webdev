(function () {
    angular
        .module('fyh')
        .controller('searchControllerHome', searchControllerHome);



    function searchControllerHome(searchService, $location) {
        var model = this;

        model.searchAddress = searchAddress;

        function searchAddress(address) {
            if(address === null || typeof address==='undefined'){
                model.error="address is required";
                return;
            }
        //console.log(address);
        var street = address.split(",")[0];
        var street1 =street.split(" ")[0];
        var street2 =street.split(" ")[1];
        var street3 =street.split(" ")[2];
        var city = address.split(",")[1];
       // console.log(city);
        var citynew = city.split(" ")[1];
        var stateold = address.split(",")[2];
        var state = stateold.split(" ")[1];
        searchService
            .searchAddress(street1,street2,street3,citynew,state)
             .then(function(response) {
                //  data = response.data.replace("jsonFlickrApi(","");
                //  data = data.substring(0,data.length - 1);
                // data =

             //   console.log(response);

               //  model.data = response.root.children[2].children[0].children[0];
               // console.log(model.data);
                // console.log(response.root);
                 model.data = response.root.children;
                 console.log(model.data);

                 if(model.data.length > 2) {
                     model.Street = response.root.children[2].children[0].children[0].children[2].children[0].content;
                     model.zipcode = response.root.children[2].children[0].children[0].children[2].children[1].content;
                     model.city = response.root.children[2].children[0].children[0].children[2].children[2].content;

                     model.state = response.root.children[2].children[0].children[0].children[2].children[3].content;

                     model.zpid = response.root.children[2].children[0].children[0].children[0].content;
                     //console.log(model.zpid);

                     model.details = response.root.children[2].children[0].children[0].children[1].children[0].content;
                     model.map = response.root.children[2].children[0].children[0].children[1].children[1].content;
                     model.comparables = response.root.children[2].children[0].children[0].children[1].children[2].content;


                     model.rentestimate = response.root.children[2].children[0].children[0].children[3].children[0].content;
                     model.updated = response.root.children[2].children[0].children[0].children[3].children[1].content;


                     $location.url('/searchresultsguest/' + model.zpid);
                 }

                 else
                 {
                     model.error = "Could not find details for this house." +
                         "Please enter a different address";
                 }


             });


     }





    }

})();