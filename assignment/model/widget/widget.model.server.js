var mongoose = require('mongoose');
var widgetSchema = require('./widget.schema.server');
var widgetModel = mongoose.model('GraduateWidgetModel', widgetSchema);
var pageModel = require('../page/page.model.server');

widgetModel.createWidget = createWidget;
widgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
widgetModel.findWidgetById = findWidgetById;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;
widgetModel.updateWidgetUrl = updateWidgetUrl;
widgetModel.widgetReorder = widgetReorder;

module.exports = widgetModel;

function createWidget(pageId, widget) {
    widget._page = pageId;
    // widget._order = findAllWidgetsForPage(pageId).data.length;
    console.log(widgetModel.findAllWidgetsForPage(pageId));
    return widgetModel
        .create(widget)
        .then(function (widget) {
            pageModel
                .addWidget(pageId, widget._id);
            return widget;
        });
}

function findAllWidgetsForPage(pageId) {
    return widgetModel
        .find({_page: pageId});
}

function findWidgetById(widgetId) {
    return widgetModel
        .findOne({_id: widgetId});
}

function updateWidget(widgetId, widget) {
    return widgetModel
        .update({_id: widgetId}, {$set: widget});
}

function deleteWidget(widgetId) {
    return widgetModel
        .remove({_id: widgetId});
}

function updateWidgetUrl(widgetId, url) {
    return widgetModel
        .findOne({_id: widgetId })
        .then(function (widget) {
                widget.url = url;
                return widget.save();
            }
        )
}


function widgetReorder(pageId, initialPos, finalPos) {
    return widgetModel.find({ _page: pageId })
        .sort({order: 1})
        .then(function (widgets) {
                for (var i in widgets) {
                    if (( i>= initialPos && i <= finalPos) ||
                        (i >= finalPos && i <= initialPos))
                    {
                        if (i == finalPos)
                            widgets[i].order = finalPos;
                        else if (initial > finalPos) {
                            widgets[i].order += i + 1;}
                        else
                            {
                            widgets[i].order = i - 1;
                        }
                    }
                    else
                        {
                        widgets[i].order = i;
                    }
                    widgets[i].save();
                }
                return;
            }
        )
}