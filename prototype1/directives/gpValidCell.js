app.directive('gpValidCell', ['passwordValidService', function (passwordValidService) {
    return {
        restrict: 'E',
        scope: {
            rowObject: '=',
            password: '='
        },
        link: function (scope, elmt, attrs) {
            scope.$watch('password', function (newValue, oldValue) {
                scope.validRow = passwordValidService(scope.password, scope.rowObject.passwordRules);
            });
        },
        templateUrl: 'templates/gpValidCell.html'
    };
}]);