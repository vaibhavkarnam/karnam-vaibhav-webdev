(function () {
    angular
        .module('WAM')
        .controller('WebsiteListController', WebsiteListController);

    function WebsiteListController($routeParams, websiteService){

        var model = this;

        model.userId = $routeParams['userId'];

        function init() {
            model.websites = websiteService.findAllWebsitesForUser(model.userId);
        }
        init();

    }
})();


