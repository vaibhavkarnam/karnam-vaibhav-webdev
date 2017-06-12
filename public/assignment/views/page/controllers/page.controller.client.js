
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

        PageService
            .findPageByWebsiteId(model.websiteId)
            .then(function (pages) {
                model.pages = pages;
            });
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
        PageService
            .findPageByWebsiteId(model.websiteId)
            .then(function (pages) {
                model.pages = pages;
            })
        PageService
            .findPageById(model.pageId)
            .then(function (page) {
                model.page = page;
            })
    }
    init();

    function pageUpdate(pageId, page) {
        PageService
            .updatePage(pageId, page)
            .then(function () {
                $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page');
            })
    }

    function pageDelete(pageId) {
        PageService
            .deletePage(pageId)
            .then(function () {
                $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page');
            })
    }
}

function NewPageController($routeParams, PageService, $location){

    var model = this;

    model.userId = $routeParams['userId'];
    model.websiteId=$routeParams.websiteId;
    model.createPage = createPage;

    function init() {
        PageService
            .findPageByWebsiteId(model.websiteId)
            .then(function (pages) {
                model.pages = pages;
            })
    }
    init();

    function createPage(page) {
       // page._id = (new Date()).getTime()+"";
       // page.websiteId = model.websiteId;
        PageService
            .createPage(model.websiteId, page)
            .then(function () {
                $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page');
            })
    }
}

})();


