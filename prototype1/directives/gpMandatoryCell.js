app.directive('gpMandatoryCell', ['passwordCheckService' , function (passwordCheckService) {
    return {
        restrict: 'E',
        scope: {
            rowObject: '=',
            password: '='
        },
        link: function (scope, elmt, attrs) {
            scope.$watch('password', function (newValue, oldValue) {
                scope.state = passwordCheckService(scope.password, scope.rowObject.passwordRules);
            });
        },
        templateUrl: 'templates/gpMandatoryCell.html'
    };
}]);