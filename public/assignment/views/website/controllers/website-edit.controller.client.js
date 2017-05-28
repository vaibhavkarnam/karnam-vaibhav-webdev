(function () {
    angular
        .module('WAM')
        .controller('EditWebsiteController', EditWebsiteController);

    function EditWebsiteController($routeParams, websiteService, $location){

        var model = this;

        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.websiteDelete = websiteDelete;
        model.websiteUpdate = websiteUpdate;

        function init() {
            model.websites = websiteService.findAllWebsitesForUser(model.userId);
            model.website = websiteService.findWebsiteById(model.websiteId);
            model.newWebsite = angular.copy(model.website);
        }
        init();

        function websiteDelete(websiteId) {
            websiteService.deleteWebsite(websiteId);
            $location.url('/user/'+model.userId+'/website');
        }

        function websiteUpdate(websiteId, website) {
            websiteService.updateWebsite(websiteId, website);
            $location.url('/user/'+model.userId+'/website/');
        }
    }
})();


