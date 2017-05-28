
(function () {
    angular
        .module('WAM')
        .controller('PageListController', PageListController)
        .controller('EditPageController', EditPageController)
        .controller('NewPageController', NewPageController);

    function PageListController($routeParams, PageService){

        var model = this;

        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];

        function init() {
            model.pages = PageService.findPageByWebsiteId(model.websiteId);
        }
        init();

    }

    function EditPageController($routeParams, PageService, $location){

        var model = this;

        model.userId = $routeParams['userId'];
        model.pageId = $routeParams.pageId;
        model.pageDelete = pageDelete;
        model.pageUpdate = pageUpdate;


        function init() {
            model.page = PageService.findPageById(model.pageId);
        }
        init();

        function pageUpdate(pageId) {
            PageService.updatePage(pageId);
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page');
        }

        function pageDelete(pageId) {
            PageService.deletePage(pageId);
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page');
        }

    }

    function NewPageController($routeParams, websiteService, $location){

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


