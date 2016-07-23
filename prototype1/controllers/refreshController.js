app.controller('RefreshController', ['$scope','$rootScope','$q','$http', function ($scope,$rootScope,$q,$http) {
    $http.defaults.useXDomain = true;

        $scope.refreshSuggestions = function () {


            $http.get('https://crowdview.dk/auth/words?n=200').then(function (response) {
                $rootScope.randomWords=response.data;
                console.log($rootScope.randomWords,' length ',$rootScope.randomWords.length)
                $rootScope.$broadcast('words-refreshed');
            });


        }
    }]);