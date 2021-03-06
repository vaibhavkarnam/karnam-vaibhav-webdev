
(function () {
angular
    .module('WAM')
    .controller('PageListController', PageListController)
    .controller('EditPageController', EditPageController)
    .controller('NewPageController', NewPageController);

function PageListController($routeParams, PageService, currentUser){

    var model = this;

   //model.userId = $routeParams['userId'];
    model.userId=currentUser._id;
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

function EditPageController($routeParams, PageService, $location, currentUser){

    var model = this;

    //model.userId = $routeParams['userId'];
    model.userId=currentUser._id;
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
        if(typeof model.page==='undefined'){
            model.message="Page name cannot be left blank";
            return;
        }
        if(model.page.name===""||typeof model.page.name==='undefined'||model.page.name===null){
            model.message="Page name cannot be left blank";
            return;
        }
        PageService
            .updatePage(pageId, page)
            .then(function () {
                $location.url('/website/'+model.websiteId+'/page');
            })
    }

    function pageDelete(pageId) {
        PageService
            .deletePage(pageId)
            .then(function () {
                $location.url('/website/'+model.websiteId+'/page');
            })
    }
}

function NewPageController($routeParams, PageService, $location, currentUser){

    var model = this;

   // model.userId = $routeParams['userId'];
    model.userId=currentUser._id;
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
        if(typeof page==='undefined'){
            model.message="Page name cannot be left blank";
            return;
        }
        if(page.name===""|| typeof page.name==='undefined'|| page.name===null){
            model.message="Page name cannot be left blank";
            return;
        }
        PageService
            .createPage(model.websiteId, page)
            .then(function () {
                $location.url('/website/'+model.websiteId+'/page');
            })
    }
}

})();


