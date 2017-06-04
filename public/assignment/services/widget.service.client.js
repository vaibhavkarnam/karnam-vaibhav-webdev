(function () {
    angular
        .module('WAM')
        .service('WidgetService', WidgetService);

    function WidgetService($http) {


        this.findWidgetsByPageId = findWidgetsByPageId;
        this.deleteWidget = deleteWidget;

        this.updateWidget = updateWidget;
        this.findWidgetById = findWidgetById;
        this.createWidgetHeader = createWidgetHeader;
        this.createWidgetImage = createWidgetImage;
        this.createWidgetYoutube = createWidgetYoutube;



        function createWidgetHeader(pageId, widget) {
            widget = { "_id": "", "widgetType": "HEADING", "pageId": "", "size": "", "text": "", "name": ""};
            widget.pageId = pageId;
            widget._id = (new Date()).getTime()+"";
            var url = "/api/assignment/page/"+pageId+"/widget";
            return $http.post(url, widget)
                .then(function (response) {
                    return response.data;
                })

            // widget = { "_id": "", "widgetType": "HEADING", "pageId": "", "size": "", "text": "", "name": ""};
            // widget._id = (new Date()).getTime() + "";
            // widget.pageId = pageId;
            // widgets.push(widget);
            // return widget._id
        }

        function createWidgetImage(pageId, widget) {

            widget = { "_id": "", "widgetType": "IMAGE", "pageId": "", "width": "", "url": "", "text": "", "name": "" };
            widget.pageId = pageId;
            widget._id = (new Date()).getTime()+"";
            var url = "/api/assignment/page/"+pageId+"/widget";
            return $http.post(url, widget)
                .then(function (response) {
                    return response.data;
                })

            // widget = { "_id": "", "widgetType": "IMAGE", "pageId": "", "width": "", "url": "", "text": "", "name": "" };
            // widget._id = (new Date()).getTime() + "";
            // widget.pageId = pageId;
            // widgets.push(widget);
            // return widget._id
        }

        function createWidgetYoutube(pageId, widget) {

            widget = { "_id": "", "widgetType": "YOUTUBE", "pageId": "", "width": "", "url": "", "text": "", "name": ""};
            widget.pageId = pageId;
            widget._id = (new Date()).getTime()+"";
            var url = "/api/assignment/page/"+pageId+"/widget";
            return $http.post(url, widget)
                .then(function (response) {
                    return response.data;
                })

            // widget = { "_id": "", "widgetType": "YOUTUBE", "pageId": "", "width": "", "url": "", "text": "", "name": ""};
            // widget._id = (new Date()).getTime() + "";
            // widget.pageId = pageId;
            // widgets.push(widget);
            // return widget._id
        }


        function deleteWidget(widgetId) {

            var url = "/api/assignment/widget/"+widgetId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                })

            // var widget = findWidgetById(widgetId);
            // var index = widgets.indexOf(widget);
            // widgets.splice(index, 1);

        }

        function findWidgetById(widgetId) {
            var url = "/api/assignment/widget/"+widgetId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
            // return widgets.find(function (widget) {
            //     return widget._id === widgetId;
            // })
        }

        function findWidgetsByPageId(pageId) {

            var url = "/api/assignment/page/"+pageId+"/widget";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })


            // var results = [];
            //
            // for (var v in widgets){
            //     if(widgets[v].pageId === pageId) {
            //         results.push(widgets[v]);
            //     }
            // }
            //
            // return results;

        }


        function updateWidget(widgetId, widget) {

            var url = "/api/assignment/widget/"+widgetId;
            return $http.put(url, widget)
                .then(function (response) {
                    return response.data;
                })

            // var widget_old = findWidgetById(widgetId);
            // if (widget_old.widgetType === "IMAGE")
            // {
            //     widget_old.pageId = widget.pageId;
            //     widget_old.width = widget.width;
            //     widget_old.url = widget.url;
            // }
            // else if (widget_old.widgetType === "HEADING")
            // {
            //     widget_old.pageId = widget.pageId;
            //     widget_old.size = widget.size;
            //     widget_old.text = widget.text;
            // }
            // else if (widget_old.widgetType === "HTML")
            // {
            //     widget_old.pageId = widget.pageId;
            //     widget_old.text = widget.text;
            // }
            // else if (widget_old.widgetType === "YOUTUBE")
            // {
            //     widget_old.pageId = widget.pageId;
            //     widget_old.width = widget.width;
            //     widget_old.url = widget.url;
            // }
        }
    }
})();