'use sctrict';

var app = angular.module('goldenPasswordApp', ['ngclipboard'])
    .controller('fetchGridData', ['$scope', '$http', '$rootScope', function ($scope, $http, $rootScope) {
        $rootScope.showSuggestions = [];
        $rootScope.suggestions = [];
        $rootScope.randomWords = [];
        $scope.password = '';
        $scope.gridData = [];
        $http.get('passwordData.json').then(function (response) {
            $scope.gridData = response.data;
        });


    }]);
