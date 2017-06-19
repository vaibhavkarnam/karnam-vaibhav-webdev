(function () {
angular
    .module('WAM')
    .controller('WebsiteListController', WebsiteListController)
    .controller('EditWebsiteController', EditWebsiteController)
    .controller('NewWebsiteController', NewWebsiteController);



function EditWebsiteController($routeParams, currentUser,  websiteService, $location){

    var model = this;

    model.userId = currentUser._id;
    // model.userId = $routeParams['userId'];
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
             .deleteWebsite(model.userId, websiteId)
             .then(function () {
                 $location.url('/website');
             });
     }

     function websiteUpdate(websiteId, website) {
         if(model.website.name===""||model.website.name===null ||typeof model.website.name==="undefined"){
             model.message="Website name cannot be left blank";
             return;
         }
         websiteService
             .updateWebsite(websiteId, website)
             .then(function () {
                 $location.url('/website');
             });

     }
}


function WebsiteListController($routeParams, currentUser, websiteService){

    var model = this;

   // model.userId = $routeParams['userId'];
    model.userId = currentUser._id;
    function init() {

        websiteService
            .findAllWebsitesForUser(model.userId)
            .then(function (websites) {
                model.websites = websites;
                console.log(model.websites)
            });

    }
    init();

}


function NewWebsiteController($routeParams, currentUser, websiteService, $location){

    var model = this;

    model.userId = currentUser._id;
  //  model.userId = $routeParams['userId'];
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
         //website.developerId = model.userId;
         //website._id = (new Date()).getTime()+"";
        if(website.name ==="" || website.name===null||typeof website==='undefined'){
            model.message="Name cannot be empty";
            return;
        }
        websiteService
            .createWebsite(model.userId, website)
            .then(function () {
                $location.url('/website');
            });
    }
}

})();


