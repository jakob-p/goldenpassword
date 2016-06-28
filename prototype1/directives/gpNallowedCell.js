app.directive('gpNallowedCell', ['passwordCheckService', function (passwordCheckService) {
    return {
        restrict: 'E',
        scope: {
            rowObject: '=',
            password: '='
        },
        link: function (scope, elmt, attrs) {
            scope.$watch('password', function (newValue, oldValue) {
                scope.nAllowedChars = passwordCheckService.nallowed(scope.password, scope.rowObject.passwordRules);
            });
        },
        templateUrl: 'templates/gpNallowedCell.html'
    };
}]);
