(function () {
    angular
        .module('WAM')
        .service('PageService', PageService);

    function PageService() {

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
            page.websiteId = websiteId;
            pages.push(page);
        }

        function deletePage(pageId) {
            var page = findPageById(pageId);
            var index = pages.indexOf(page);
            pages.splice(index, 1);

        }

        function findPageById(pageId) {
            return pages.find(function (page) {
                return page._id === pageId;
            })
        }

        function findPageByWebsiteId(websiteId) {

            var results = [];

            for (var v in pages){
                if(pages[v].websiteId === websiteId) {
                    results.push(pages[v]);
                }
            }

            return results;

        }

        function updatePage(pageId, page) {
            var page_old = findPageById(pageId);
            page_old.name = page.name;
            page_old.websiteId = page.websiteId;
            page_old.description = page.description;

        }
    }
})();