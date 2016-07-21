app.directive('gpValidCell', ['passwordValidService', function (passwordValidService) {
    return {
        restrict: 'E',
        scope: {
            rowObject: '=',
            password: '=',
            index: '='
        },
        link: function (scope, elmt, attrs) {

            scope.$watch('password', function (newValue, oldValue) {
                scope.validRow = passwordValidService(scope.password, scope.rowObject.passwordRules,scope.index);
            });

            scope.$on('words-refreshed', function(event, args) {
                scope.validRow = passwordValidService(scope.password, scope.rowObject.passwordRules,scope.index);
            });
        },
        templateUrl: 'templates/gpValidCell.html'
    };
}]);