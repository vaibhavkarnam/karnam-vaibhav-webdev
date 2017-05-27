(function () {
    angular
        .module('WAM')
        .controller('website_editController', website_editController);

    function website_editController($routeParams, websiteService, $location){

        var model = this;

        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams.websiteId;
        model.websiteDelete = websiteDelete;

        function init() {
            model.websites = websiteService.findAllWebsitesForUser(model.userId);
            model.website = websiteService.findWebsiteById(model.websiteId);
        }
        init();

        function websiteDelete(websiteId) {
            websiteService.deleteWebsite(websiteId);
            $location.url('/user/'+model.userId+'/website');
        }
    }
})();


