app.directive('gpValidCounter', ['passwordValidService','$rootScope', function (passwordValidService,$rootScope) {
    return {
        restrict: 'E',
        scope: {
            password: '='
        },
        link: function (scope, elmt, attrs) {
            scope.$watch('password', function (newValue, oldValue) {
                $rootScope.validCount = 0;
                $rootScope.invalideCount = 0;

                for( var i = 0; i < scope.$parent.gridData.passwordRuleObjects.length; i++) {
                    if (passwordValidService(scope.password, 
                        scope.$parent.gridData.passwordRuleObjects[i].passwordRules)) {
                        $rootScope.validCount++;

                    }
                    else {
                        $rootScope.invalideCount++;
                    }
                }
                
            });    
        },
        templateUrl: 'templates/gpValidCounter.html'
    };
}]);