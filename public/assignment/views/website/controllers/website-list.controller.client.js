(function () {
    angular
        .module('WAM')
        .controller('website_listController', website_listController);

    function website_listController($routeParams, websiteService){

        var model = this;

        model.userId = $routeParams['userId'];

        function init() {
            model.websites = websiteService.findAllWebsitesForUser(model.userId);
        }
        init();

    }
})();


