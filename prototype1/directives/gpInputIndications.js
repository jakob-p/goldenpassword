app.directive('gpInputIndications', ['passwordCheckService', function (passwordCheckService) {
    return {
        restrict: 'E',
        scope: {
            password: '='
        },
        link: function (scope, elmt, attrs) {
            scope.$watch('password', function (newValue, oldValue) {
                scope.state = passwordCheckService.classes(scope.password);
            });
        },
        templateUrl: 'templates/gpInputIndications.html'
    };
}]);