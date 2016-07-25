app.controller('RefreshController', ['$scope','$rootScope','$q','$http', function ($scope,$rootScope,$q,$http) {

    $scope.language = 'de';

    $scope.setLang = function(lang){
        $scope.language = lang;
    }

        $scope.refreshSuggestions = function () {


            $http.get('https://crowdview.dk/auth/words?lang='+$scope.language+'&n=100').then(function (response) {
                $rootScope.randomWords=response.data;
                $rootScope.$broadcast('words-refreshed');
            });


        }
    }]);