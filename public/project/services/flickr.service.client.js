(function () {
    angular
        .module('WAMA')
        .service('searchService', searchService);

    function searchService($http) {

        this.searchAddress = searchAddress;
        this.getHouse = getHouse;

       // var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

       var urlBase =  "http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=X1-ZWz1966qi8632j_1r7kw&address=STREET1+STREET2+STREET3&citystatezip=CITY%2C+STATE";

        function searchAddress(street1,street2,street3,city,state) {
            var url = urlBase
                .replace("STREET1", street1)
                .replace("STREET2", street2)
                .replace("STREET3", street3)
                .replace("CITY", city)
                .replace("STATE", state)
            return $http.get(url,
                {
                    transformResponse: function (cnv) {
                        var x2js = new X2JS();
                        var aftCnv = x2js.xml_str2json(cnv);
                        return aftCnv;
                    }
                });

        }


        function getHouse() {

        }
    }
})();