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
        websiteService
            .findAllWebsitesForUser(model.userId)
            .then(function (websites) {
                model.websites = websites;
            });
        websiteService
            .findWebsiteById(model.websiteId)
            .then(function (website) {
                model.website = website;
            });

    }
    init();

     function websiteDelete(websiteId) {
         websiteService
             .deleteWebsite(websiteId)
             .then(function () {
                 $location.url('/user/'+model.userId+'/website');
             });
     }

     function websiteUpdate(websiteId, website) {
         websiteService
             .updateWebsite(websiteId, website)
             .then(function () {
                 $location.url('/user/'+model.userId+'/website/');
             });

     }
}


function WebsiteListController($routeParams, websiteService){

    var model = this;

    model.userId = $routeParams['userId'];

    function init() {

        websiteService
            .findAllWebsitesForUser(model.userId)
            .then(function (websites) {
                model.websites = websites;
            });

    }
    init();

}


function NewWebsiteController($routeParams, websiteService, $location){

    var model = this;

    model.userId = $routeParams['userId'];
    model.createWebsite = createWebsite;

    function init() {
        websiteService
            .findAllWebsitesForUser(model.userId)
            .then(function (websites) {
                model.websites = websites;
            });

    }
    init();

    function createWebsite(website) {
        website.developerId = model.userId;
        website._id = (new Date()).getTime()+"";
        websiteService
            .createWebsite(website)
            .then(function () {
                $location.url('/user/'+model.userId+'/website');
            });
    }
}

})();


