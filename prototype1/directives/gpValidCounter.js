app.directive('gpValidCounter', ['passwordValidService', function (passwordValidService) {
    return {
        restrict: 'E',
        scope: {
            password: '='
        },
        link: function (scope, elmt, attrs) {
            scope.$watch('password', function (newValue, oldValue) {
                scope.validCount = 0;
                scope.invalideCount = 0;

                for( var i = 0; i < scope.$parent.gridData.passwordRuleObjects.length; i++) {
                    if (passwordValidService(scope.password, 
                        scope.$parent.gridData.passwordRuleObjects[i].passwordRules)) {
                        scope.validCount++;
                    }
                    else {
                        scope.invalideCount++;
                    }
                }
                
            });    
        },
        templateUrl: 'templates/gpValidCounter.html'
    };
}]);