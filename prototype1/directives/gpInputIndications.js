app.directive('gpInputIndications', ['passwordClassesService', function (passwordClassesService) {
    return {
        restrict: 'E',
        scope: {
            password: '='
        },
        link: function (scope, elmt, attrs) {
            scope.$watch('password', function (newValue, oldValue) {
                scope.state = passwordClassesService(scope.password);
            });
        },
        templateUrl: 'templates/gpInputIndications.html'
    };
}]);