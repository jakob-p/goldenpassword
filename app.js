(function(angular) {
  'use strict';

angular.module('ngPatternExample', [])
    .controller('ExampleController', ['$scope', '$http', function($scope, $http) {
      $http.get("/json/testPasswordData.json").then(function (response) {
        $scope.passwordData = response.data;
      });

      $scope.regex = '\\d+';
    }]);

})(window.angular);