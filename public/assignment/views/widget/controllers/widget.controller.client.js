(function () {
    angular
        .module('WAM')
        .controller('WidgetListController', WidgetListController)
        .controller('EditWidgetController', EditWidgetController)
        .controller('NewWidgetController', NewWidgetController);


    function WidgetListController($routeParams, $sce, WidgetService) {
        var model = this;

        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams.websiteId;
        model.pageId = $routeParams.pageId;
        model.trust = trust;
        model.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
        model.widgetUrl = widgetUrl;


        function init() {
            model.widgets = WidgetService.findWidgetsByPageId(model.pageId);
        }
        init();

        function widgetUrl(widget) {
            var url = 'views/widget/templates/widget-'+widget.widgetType.toLowerCase()+'.view.client.html';
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
            model.widget = WidgetService.findWidgetById(model.widgetId);
        }

        init();

        function widgetUpdate(widget) {
            WidgetService.updateWidget(model.widgetId, widget);
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
        }

        function widgetDelete(widgetId) {
            WidgetService.deleteWidget(widgetId);
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
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
            model.createWidgetHeader = createWidgetHeader;
            model.createWidgetImage = createWidgetImage;
            model.createWidgetYoutube = createWidgetYoutube;

            function init() {
                model.widget = WidgetService.findWidgetById(model.widgetId);
            }

            init();
            function createWidgetHeader(widget) {
                var widget_id = WidgetService.createWidgetHeader(model.pageId, widget);
                $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget/'+widget_id);
            }

            function createWidgetImage(widget) {
                var widget_id = WidgetService.createWidgetImage(model.pageId, widget);
                $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget/'+widget_id);
            }

            function createWidgetYoutube(widget) {
                var widget_id =  WidgetService.createWidgetYoutube(model.pageId, widget);
                $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget/'+widget_id);
            }
        }


})();