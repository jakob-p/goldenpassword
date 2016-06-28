'use sctrict';

var app = angular.module('goldenPasswordApp', [])
    .controller('fetchGridData', ['$scope', '$http', function ($scope, $http) {
        $scope.password = '';
        $scope.gridData = [];
        $http.get('passwordData.json').then(function (response) {
            $scope.gridData = response.data;
        });
    }]);