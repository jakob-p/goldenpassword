app.directive('gpNallowedCell', ['passwordNallowedService', function (passwordNallowedService) {
    return {
        restrict: 'E',
        scope: {
            rowObject: '=',
            password: '='
        },
        link: function (scope, elmt, attrs) {
            scope.$watch('password', function (newValue, oldValue) {
                scope.nAllowedChars = passwordNallowedService(scope.password, scope.rowObject.passwordRules);
            });
        },
        templateUrl: 'templates/gpNallowedCell.html'
    };
}]);
