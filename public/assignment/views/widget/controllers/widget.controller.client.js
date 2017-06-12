(function () {
angular
    .module('WAM')
    .controller('WidgetListController', WidgetListController)
    .controller('EditWidgetController', EditWidgetController)
    .controller('NewWidgetController', NewWidgetController)


function WidgetListController($routeParams, $sce, WidgetService) {
    var model = this;

    model.userId = $routeParams['userId'];
    model.websiteId = $routeParams.websiteId;
    model.pageId = $routeParams.pageId;
    model.trust = trust;
    model.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
    model.widgetUrl = widgetUrl;
    model.SortWidgets = SortWidgets;


    function init() {

        WidgetService
            .findWidgetsByPageId(model.pageId)
            .then(function (widgets) {
                model.widgets = widgets.data;
            });

    }
    init();


    function SortWidgets (initalPos, finalPos) {
        WidgetService
            .WidgetsOrder(model.pageId, initalPos, finalPos);
    }

    function widgetUrl(widget) {
        console.log(widget);
        var url = 'views/widget/templates/widget-'+widget.type.toLowerCase()+'.view.client.html';
        return url;
    }

    function getYouTubeEmbedUrl(linkUrl) {
        var embedUrl = "https://www.youtube.com/embed/";
        var linkUrlParts = linkUrl.split('/');
        embedUrl += linkUrlParts[linkUrlParts.length - 1];
        return $sce.trustAsResourceUrl(embedUrl);
    }

    function trust(html) {
        return $sce.trustAsHtml(html);

    }

}

function EditWidgetController($routeParams, $sce, WidgetService, $location) {
    var model = this;

    model.userId = $routeParams['userId'];
    model.websiteId = $routeParams.websiteId;



    model.pageId = $routeParams.pageId;
    model.widgetId = $routeParams.wgid;
    model.widgetUpdate = widgetUpdate;
    model.widgetDelete = widgetDelete;

    function init() {

        WidgetService
            .findWidgetById(model.widgetId)
            .then(function (widget) {
                console.log(widget);
                model.widget = widget.data;
            });
    }

    init();

    function widgetUpdate(widget) {
        WidgetService
            .updateWidget(model.widgetId, widget)
            .then(function (response) {
                $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
            });

    }

    function widgetDelete(widgetId) {
        WidgetService
            .deleteWidget(widgetId)
            .then(function (response) {
                $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
            });

    }

    function widgetUrl(widget) {

        var url = 'views/widget/editors/widget-'+ widget.widgetType.toLowerCase()+'.view.client.html';
        return url;
    }

    function getYouTubeEmbedUrl(linkUrl) {
        var embedUrl = "https://www.youtube.com/embed/";
        var linkUrlParts = linkUrl.split('/');
        embedUrl += linkUrlParts[linkUrlParts.length - 1];
        return $sce.trustAsResourceUrl(embedUrl);
    }

    function trust(html) {
        return $sce.trustAsHtml(html);

    }
}


    function NewWidgetController($routeParams, $sce, WidgetService, $location) {
        var model = this;

        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams.websiteId;
        model.pageId = $routeParams.pageId;
        model.widgetId = $routeParams.wgid;
        model.createWidget = createWidget;
        // model.createWidgetImage = createWidgetImage;
        // model.createWidgetYoutube = createWidgetYoutube;

        function init() {
            getWidgets();
        }

        init();


        function getWidgets () {
            WidgetService
                .getWidgets()
                .then(function (response) {
                        model.widgetType = response.data;
                    }
                );
        }

        function createWidget(widget) {

            WidgetService
                .createWidget(model.pageId, {type: widget})
                .then(function (response) {
                    console.log("widget created");
                    var widget = response.data;
                   // var widget_id = widgetId;
                    $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget/'+widget._id);
                });

        }




        // function createWidgetImage(widget) {
        //
        //     WidgetService
        //         .createWidgetImage(model.pageId, widget)
        //         .then(function (widgetId) {
        //             var widget_id = widgetId;
        //             $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget/'+widget_id);
        //         });
        //
        // }
        //
        // function createWidgetYoutube(widget) {
        //
        //     WidgetService
        //         .createWidgetYoutube(model.pageId, widget)
        //         .then(function (widgetId) {
        //             var widget_id = widgetId;
        //             $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget/'+widget_id);
        //         });
        // }
    }


})();