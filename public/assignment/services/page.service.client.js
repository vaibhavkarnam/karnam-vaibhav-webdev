(function () {
angular
    .module('WAM')
    .service('PageService', PageService);

function PageService($http) {

    this.findPageById = findPageById;
    this.findPageByWebsiteId = findPageByWebsiteId;
    this.deletePage = deletePage;
    this.createPage = createPage;
    this.updatePage = updatePage;

    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
        { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
        { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" },
        { "_id": "546", "name": "Post 4", "websiteId": "567", "description": "Lorem" }
    ];


    function createPage(websiteId, page) {
        page._id = (new Date()).getTime()+"";
        var url = "/api/assignment/website/"+websiteId+"/page";
        return $http.post(url, page)
            .then(function (response) {
                return response.data;
            })

    }

    function deletePage(pageId) {
        var url = "/api/assignment/page/"+pageId;
        return $http.delete(url)
            .then(function (response) {
                return response.data;
            })

    }

    function findPageById(pageId) {

        var url = "/api/assignment/page/"+pageId;
        return $http.get(url)
            .then(function (response) {
                return response.data;
            });

    }

    function findPageByWebsiteId(websiteId) {

        var url = "/api/assignment/website/"+websiteId+"/page";
        return $http.get(url)
            .then(function (response) {
                return response.data;
            });


    }

    function updatePage(pageId, page) {

        var url = "/api/assignment/page/"+pageId;
        return $http.put(url, page)
            .then(function (response) {
                return response.data;
            })

    }
}
})();