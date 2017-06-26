(function () {
    angular
        .module('fyh')
        .controller('propertyDetailsController', propertyDetailsController);



    function propertyDetailsController($routeParams, resultsService, $location) {
        var model = this;
        model.searchProperty = searchProperty;
        model.zpid = $routeParams.zpid;


        function init() {
            resultsService
                .searchResults(model.zpid)
                .then(function (response) {
                    model.details = response.data;
                })

        }

        init();

        function searchProperty(zpid) {
            resultsService
                .searchResults(zpid)
                .then(function (response) {
                    console.log(response.data);

                    model.name = response.data.zestimate.response.address.street;

                    console.log(model.name);
                    model.zipcode = response.data.zestimate.response.address.zipcode;
                })
        }
    }

})();