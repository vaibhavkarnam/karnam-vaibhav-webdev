(function () {
angular
    .module('WAM')
    .service('WidgetService', WidgetService);

function WidgetService($http) {


    this.findWidgetsByPageId = findWidgetsByPageId;
    this.deleteWidget = deleteWidget;
    this.updateWidget = updateWidget;
    this.findWidgetById = findWidgetById;
    this.createWidget = createWidget;
    //this.createWidgetImage = createWidgetImage;
    //this.createWidgetYoutube = createWidgetYoutube;
    this.WidgetsOrder = WidgetsOrder;
    this.getWidgets = getWidgets;


    // function getWidgetHeader () {
    //     widgetService.getWidget()
    //         .then(function (response) {
    //                 model.widgetTypes = response.data;
    //             }
    //         );
    // }
    //
    // function getWidgetImage () {
    //     widgetService.getWidget()
    //         .then(function (response) {
    //                 model.widgetTypes = response.data;
    //             }
    //         );
    // }
    //
    // function getWidgetYoutube () {
    //     widgetService.getWidget()
    //         .then(function (response) {
    //                 model.widgetTypes = response.data;
    //             }
    //         );
    // }
    //

    function getWidgets() {
        var url = '/api/getWidget';
        return $http.get(url);
    }

    function createWidget(pageId, widget) {
        // widget = { "_id": "","index":0, "widgetType": "HEADING", "pageId": "", "size": "", "text": "", "name": ""};
        // widget.pageId = pageId;
        // widget._id = (new Date()).getTime()+"";
       // var widget = getWidgetHeader();
        var url = "/api/assignment/page/"+pageId+"/widget";
        return $http.post(url, widget);
            // .then(function (response) {
            //     return response.data;
            // });
    }

    // function createWidgetImage(pageId) {
    //
    //     //widget = { "_id": "", "index":0, "widgetType": "IMAGE", "pageId": "", "width": "100%", "url": "", "text": "", "name": "" };
    //     // widget.pageId = pageId;
    //     // widget._id = (new Date()).getTime()+"";
    //     //var widget = getWidgetImage();
    //     var url = "/api/assignment/page/"+pageId+"/widget";
    //     return $http.post(url, widget)
    //         .then(function (response) {
    //             return response.data;
    //         })
    //
    // }

    // function createWidgetYoutube(pageId) {
    //
    //     //widget = { "_id": "", "index":0,  "widgetType": "YOUTUBE", "pageId": "", "width": "100%", "url": "", "text": "", "name": ""};
    //     // widget.pageId = pageId;
    //     // widget._id = (new Date()).getTime()+"";
    //     //var widget = getWidgetYoutube();
    //     var url = "/api/assignment/page/"+pageId+"/widget";
    //     return $http.post(url, widget)
    //         .then(function (response) {
    //             return response.data;
    //         })
    //
    // }


    function deleteWidget(pageId, widgetId) {

        var url = "/api/assignment/page/"+pageId+"/widget/"+widgetId;
        return $http.delete(url);
            // .then(function (response) {
            //     return response.data;
            // })

    }

    function findWidgetById(widgetId) {
        var url = "/api/assignment/widget/"+widgetId;
        return $http.get(url);
            // .then(function (response) {
            //     return response.data;
            // })

    }

    function findWidgetsByPageId(pageId) {

        var url = "/api/assignment/page/"+pageId+"/widget";
        return $http.get(url);
            // .then(function (response) {
            //     return response.data;
            // })

    }


    function updateWidget(widgetId, widget) {

        var url = "/api/assignment/widget/"+widgetId;
        return $http.put(url, widget);
            // .then(function (response) {
            //     return response.data;
            // })

    }

    function WidgetsOrder(pageId, index1, index2) {
        var url = "/api/page/"+pageId+"/widget?initial="+index1+"&final="+index2;
        return $http.put(url);
    }

}
})();