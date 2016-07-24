app.directive('gpMandatoryCell', ['passwordRulesService' , function (passwordRulesService) {
    return {
        restrict: 'E',
        scope: {
            rowObject: '=',
            password: '='
        },
        link: function (scope, elmt, attrs) {
            scope.$watch('password', function (newValue, oldValue) {
                scope.state = passwordRulesService(scope.password, scope.rowObject.passwordRules);
            });
        },
        templateUrl: 'templates/gpMandatoryCell.html'
    };
}]);