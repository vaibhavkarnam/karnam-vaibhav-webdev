(function () {
    angular
        .module('WAM')
        .controller('website_newController', website_newController);

    function website_newController($routeParams, websiteService, $location){

        var model = this;

        model.userId = $routeParams['userId'];
        model.createWebsite = createWebsite;

        function init() {
            model.websites = websiteService.findAllWebsitesForUser(model.userId);
        }
        init();

        function createWebsite(website) {
            website.developerId = model.userId;
                websiteService.createWebsite(website);
                $location.url('/user/'+model.userId+'/website');

        }
    }
})();


