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

    }

    function createWidgetImage(pageId, widget) {

        widget = { "_id": "", "widgetType": "IMAGE", "pageId": "", "width": "100%", "url": "", "text": "", "name": "" };
        widget.pageId = pageId;
        widget._id = (new Date()).getTime()+"";
        var url = "/api/assignment/page/"+pageId+"/widget";
        return $http.post(url, widget)
            .then(function (response) {
                return response.data;
            })

    }

    function createWidgetYoutube(pageId, widget) {

        widget = { "_id": "", "widgetType": "YOUTUBE", "pageId": "", "width": "100%", "url": "", "text": "", "name": ""};
        widget.pageId = pageId;
        widget._id = (new Date()).getTime()+"";
        var url = "/api/assignment/page/"+pageId+"/widget";
        return $http.post(url, widget)
            .then(function (response) {
                return response.data;
            })

    }


    function deleteWidget(widgetId) {

        var url = "/api/assignment/widget/"+widgetId;
        return $http.delete(url)
            .then(function (response) {
                return response.data;
            })

    }

    function findWidgetById(widgetId) {
        var url = "/api/assignment/widget/"+widgetId;
        return $http.get(url)
            .then(function (response) {
                return response.data;
            })

    }

    function findWidgetsByPageId(pageId) {

        var url = "/api/assignment/page/"+pageId+"/widget";
        return $http.get(url)
            .then(function (response) {
                return response.data;
            })

    }


    function updateWidget(widgetId, widget) {

        var url = "/api/assignment/widget/"+widgetId;
        return $http.put(url, widget)
            .then(function (response) {
                return response.data;
            })

    }
}
})();