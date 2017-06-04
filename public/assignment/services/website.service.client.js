(function () {
    angular
        .module('WAM')
        .service('websiteService', websiteService);
    
    function websiteService($http) {

        this.findAllWebsitesForUser = findAllWebsitesForUser;
        this.findWebsiteById = findWebsiteById;
        this.deleteWebsite = deleteWebsite;
        this.createWebsite = createWebsite;
        this.updateWebsite = updateWebsite;


        function createWebsite(website) {
            var url = "/api/assignment/user/userId";
            return $http.post(url, website)
                .then(function (response) {
                    return response.data;
                })

            // website._id = (new Date()).getTime()+"";
            // websites.push(website);
        }

        function deleteWebsite(websiteId) {
            var url = "/api/assignment/user/userId/website/"+websiteId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                })


            // var website = findWebsiteById(websiteId);
            // var index = websites.indexOf(website);
            // websites.splice(index, 1);

        }

        function findWebsiteById(websiteId) {

            var url = "/api/assignment/user/userId/website/"+websiteId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });

            // return websites.find(function (website) {
            //     return website._id === websiteId;
            // })
        }

        function findAllWebsitesForUser(userId) {
            var url = "/api/assignment/user/"+userId+"/website";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });

            // var results = [];
            //
            // for (var v in websites){
            //     if(websites[v].developerId === userId) {
            //         websites[v].created = new Date();
            //         websites[v].accessed = new Date();
            //         results.push(websites[v]);
            //     }
            // }
            //
            // return results;
        }
        
        function updateWebsite(websiteId, website) {

            var url = "/api/assignment/user/userId/website/"+websiteId;
            return $http.put(url, website)
                .then(function (response) {
                    return response.data;
                })

            // var website_old = findWebsiteById(websiteId);
            // website_old.name = website.name;
            // website_old.developerId = website.developerId;
            // website_old.description = website.description;
            
        }
    }
})();