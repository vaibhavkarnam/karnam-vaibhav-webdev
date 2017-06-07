(function () {
    angular
        .module('WAM')
        .directive('wbdvsortable', wbdvsortable);

    function wbdvsortable () {

        function linkFunction(scope, element) {
            $(element).sortable({
                start: function(event, ui) {
                    this.Index = ui.item.index();
                },
                stop: function(event, ui) {
                    scope.callback({InitalPos: this.Index, FinalPos: ui.item.index()});
                }
            });
        }

        return {
            scope: { callback: '&' },
            link: linkFunction
        };
    }
})();