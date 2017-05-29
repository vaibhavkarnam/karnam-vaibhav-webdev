(function () {
    angular
        .module('WAM')
        .service('WidgetService', WidgetService);

    function WidgetService() {


        this.findWidgetsByPageId = findWidgetsByPageId;
        this.deleteWidget = deleteWidget;
        this.updateWidget = updateWidget;
        this.findWidgetById = findWidgetById;
        this.createWidgetHeader = createWidgetHeader;
        this.createWidgetImage = createWidgetImage;
        this.createWidgetYoutube = createWidgetYoutube;

        var widgets = [
            { "_id": "123", "widgetType": "HEADING", "pageId": "546", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADING", "pageId": "546", "size": 4, "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "546", "width": "100%",
                "url": "http://lorempixel.com/400/200/"},
            { "_id": "456", "widgetType": "HTML", "pageId": "546", "text": "<p>Lorem ipsum</p>"},
            { "_id": "567", "widgetType": "HEADING", "pageId": "546", "size": 4, "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "546", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": "789", "widgetType": "HTML", "pageId": "546", "text": "<p>Lorem ipsum</p>"}
        ];


        function createWidgetHeader(pageId, widget) {
            widget = { "_id": "", "widgetType": "HEADING", "pageId": "", "size": "", "text": ""};
            widget._id = (new Date()).getTime() + "";
            widget.pageId = pageId;
            widgets.push(widget);
            return widget._id
        }

        function createWidgetImage(pageId, widget) {
            widget = { "_id": "", "widgetType": "IMAGE", "pageId": "", "width": "", "url": ""};
            widget._id = (new Date()).getTime() + "";
            widget.pageId = pageId;
            widgets.push(widget);
            return widget._id
        }

        function createWidgetYoutube(pageId, widget) {
            widget = { "_id": "", "widgetType": "YOUTUBE", "pageId": "", "width": "", "url": ""};
            widget._id = (new Date()).getTime() + "";
            widget.pageId = pageId;
            widgets.push(widget);
            return widget._id
        }


        function deleteWidget(widgetId) {
            var widget = findWidgetById(widgetId);
            var index = widgets.indexOf(widget);
            widgets.splice(index, 1);

        }

        function findWidgetById(widgetId) {
            return widgets.find(function (widget) {
                return widget._id === widgetId;
            })
        }

        function findWidgetsByPageId(pageId) {

            var results = [];

            for (var v in widgets){
                if(widgets[v].pageId === pageId) {
                    results.push(widgets[v]);
                }
            }

            return results;

        }


        function updateWidget(widgetId, widget) {
            var widget_old = findWidgetById(widgetId);
            if (widget_old.widgetType === "IMAGE")
            {
                widget_old.pageId = widget.pageId;
                widget_old.width = widget.width;
                widget_old.url = widget.url;
            }
            else if (widget_old.widgetType === "HEADING")
            {
                widget_old.pageId = widget.pageId;
                widget_old.size = widget.size;
                widget_old.text = widget.text;
            }
            else if (widget_old.widgetType === "HTML")
            {
                widget_old.pageId = widget.pageId;
                widget_old.text = widget.text;
            }
            else if (widget_old.widgetType === "YOUTUBE")
            {
                widget_old.pageId = widget.pageId;
                widget_old.width = widget.width;
                widget_old.url = widget.url;
            }
        }
    }
})();