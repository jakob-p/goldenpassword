app.directive('gpWebsiteGrid', function () {
    return {
        restrict: 'E',
        link: function (scope, elmt, attrs) {
            scope.shortUrl = function(url) {
                return url.replace(/^.*?:\/\/(www\.|)/, '');
            }
        },
        templateUrl: 'templates/gpWebsiteGrid.html'
    };
});