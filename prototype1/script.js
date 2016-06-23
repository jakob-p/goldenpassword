'use sctrict';

var app = angular.module('goldenPasswordApp', []);

app.controller('')

app.controller('fetchGridData', ['$scope', '$http', function($scope, $http) {
    $http.get('passwordData.json').then(function(response) {
        $scope.gridData = response.data;
    });
}]);

app.directive('gpWebsiteGrid', function() {
    return {
        restrict: 'E',
        templateUrl: 'gp-website-grid.html'
    };
});
