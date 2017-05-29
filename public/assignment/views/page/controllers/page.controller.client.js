
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
            model.pages = angular.copy(PageService.findPageByWebsiteId(model.websiteId));
        }
        init();

    }

    function EditPageController($routeParams, PageService, $location){

        var model = this;

        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams.websiteId;
        model.pageId = $routeParams.pageId;
        model.pageDelete = pageDelete;
        model.pageUpdate = pageUpdate;


        function init() {
            model.page = angular.copy(PageService.findPageById(model.pageId));
        }
        init();

        function pageUpdate(pageId, page) {
            PageService.updatePage(pageId, page);
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page');
        }

        function pageDelete(pageId) {
            PageService.deletePage(pageId);
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page');
        }

    }

    function NewPageController($routeParams, PageService, $location){

        var model = this;

        model.userId = $routeParams['userId'];
        model.websiteId=$routeParams.websiteId;
        model.createPage = createPage;

        function init() {
            model.page = angular.copy(PageService.findPageById(model.pageId));
        }
        init();

        function createPage(page) {
            PageService.createPage(model.websiteId, page);
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/');

        }
    }

})();


