app.directive('gpSuggestionCell', function ($rootScope) {
    return {
        restrict: 'E',
        scope: {
            rowObject: '=',
            index: '=',
            password: '='
        },
        link: function (scope, elmt, attrs) {
            // logic to implement (call to services, ...)
        },
        templateUrl: 'templates/gpSuggestionCell.html'
    };
});