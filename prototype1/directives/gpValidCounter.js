app.directive('gpValidCounter', ['passwordValidService', function (passwordValidService) {
    return {
        restrict: 'E',
        scope: {
            data: '=',
            password: '='
        },
        link: function (scope, elmt, attrs) {
            scope.$watch('password', function (newValue, oldValue) {
                scope.validCount = 0;
                scope.invalideCount = 0;

                for( var i = 0; i < scope.data.passwordRuleObjects.lenght; i++) {
                    if (passwordValidService(scope.password, scope.data.passwordRuleObjects[i].passwordRules)) {
                        validCount++;
                    }
                    else {
                        invalideCount++;
                    }
                }
            });
        },
        templateUrl: 'templates/gpValidCounter.html'
    };
}]);