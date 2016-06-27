'use sctrict';

var app = angular.module('goldenPasswordApp', [])
    .controller('fetchGridData', ['$scope', '$http', function ($scope, $http) {
        $scope.password = '';
        $http.get('passwordData.json').then(function (response) {
            $scope.gridData = response.data;
        });
    }]);