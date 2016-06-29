app.directive('gpSuggestionCell', ['passwordCheckService' , function (passwordCheckService) {
    return {
        restrict: 'E',
        scope: {
            rowObject: '=',
            password: '='
        },
        link: function (scope, elmt, attrs) {
            // logic to implement (call to services, ...)
        },
        templateUrl: 'templates/gpSuggestionCell.html'
    };
}]);