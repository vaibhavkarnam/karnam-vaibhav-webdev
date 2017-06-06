(function () {
    angular
        .module('WAM')
        .controller('flickrController', flickrController)



    function flickrController($routeParams, $sce, flickrService, WidgetService, $location) {
        var model = this;

        model.searchPhotos = searchPhotos;
        model.selectPhoto = selectPhoto;

         model.userId = $routeParams['userId'];
         model.websiteId = $routeParams.websiteId;
         model.pageId = $routeParams.pageId;
        // model.trust = trust;
        // model.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
         //model.widgetUrl = widgetUrl;
         model.widgetId = $routeParams.widgetId;


     function searchPhotos(searchTerm) {

         console.log(searchTerm);
         flickrService
             .searchPhotos(searchTerm)
             .then(function(response) {
                // console.log(response.data);
                 data = response.data.replace("jsonFlickrApi(","");
                 data = data.substring(0,data.length - 1);
                 data = JSON.parse(data);
                 model.photos = data.photos;
             });


     }


        function selectPhoto(photo) {
            var url = "https://farm"+photo.farm+".staticflickr.com/"+photo.server;
            url +="/"+photo.id+"_"+photo.secret+"_b.jpg";
            WidgetService
                .updateWidget(model.websiteId, model.pageId, model.widgetId, {url: url})
                .then(function () {
                    $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
                });
        }


    }

})();