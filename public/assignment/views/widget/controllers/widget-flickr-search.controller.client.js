(function () {
angular
    .module('WAM')
    .controller('FlickrImageSearchController', FlickrImageSearchController)



function FlickrImageSearchController($routeParams, $sce, flickrService, WidgetService, $location, currentUser) {
    var model = this;

    model.searchPhotos = searchPhotos;
    model.selectPhoto = selectPhoto;

    // model.userId = $routeParams['userId'];
    model.userId=currentUser._id;
     model.websiteId = $routeParams.websiteId;
     model.pageId = $routeParams.pageId;
    // model.trust = trust;
    // model.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
     //model.widgetUrl = widgetUrl;
     model.widgetId = $routeParams.wgid;

function init() {
    WidgetService
        .findWidgetById(model.widgetId)
        .then(function (widget) {
            model.widget = widget;
        })
}
init();
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
     console.log(photo);
        var url = "https://farm"+photo.farm+".staticflickr.com/"+photo.server;
        url +="/"+photo.id+"_"+photo.secret+"_b.jpg";
        model.widget.url = url;
        WidgetService
            .updateWidget(model.widgetId, model.widget)
            .then(function () {
                $location.url('/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
            });
    }


}

})();