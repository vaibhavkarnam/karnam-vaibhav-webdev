(function () {
    angular
        .module('WAMA')
        .controller('searchresultsController', searchresultsController);



    function searchresultsController($routeParams, searchService, $location) {
        var model = this;
        model.zpid = $routeParams.zpid;


        init(
            function getHouse() {

            }
        )






    }

})();