(function () {
    angular
        .module('WAM')
        .controller('WebsiteListController', WebsiteListController)
        .controller('EditWebsiteController', EditWebsiteController)
        .controller('NewWebsiteController', NewWebsiteController);



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


    function WebsiteListController($routeParams, websiteService){

        var model = this;

        model.userId = $routeParams['userId'];

        function init() {
            model.websites = websiteService.findAllWebsitesForUser(model.userId);
        }
        init();

    }


    function NewWebsiteController($routeParams, websiteService, $location){

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

