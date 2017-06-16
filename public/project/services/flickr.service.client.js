(function () {
    angular
        .module('WAMA')
        .service('searchService', searchService)
        .service('resultsService', resultsService);

    function searchService($http) {


        var house = [
            {"zpid" : "2104272801", "street1":"198", "street2" : "Hillside", "street3":"Street", "city":"boston", "state":"ma"}
            ];


        this.searchAddress = searchAddress;

       // var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

       var url =  "/api/searchAddress/:street1/:street2/:street3/:city/:state";

        function searchAddress(street1,street2,street3,city,state) {

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

        var urlBase = "http://www.zillow.com/webservice/GetZestimate.htm?zws-id=X1-ZWz1966qi8632j_1r7kw&zpid=ZPID"

        function searchResults(zpid) {
            var url = urlBase
                .replace("ZPID", zpid)
            return $http.get(url,
                {
                    transformResponse: function (cnv) {
                        var x2js = new X2JS();
                        var aftCnv = x2js.xml_str2json(cnv);
                        return aftCnv;
                    }
                });

        }


    }

})();