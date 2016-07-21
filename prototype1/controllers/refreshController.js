app.controller('RefreshController', ['$scope','$rootScope','$q','$http', function ($scope,$rootScope,$q,$http) {

        $scope.refreshSuggestions = function () {

            var arr = [];
            for (var a = 0; a < 2; ++a) {
                arr.push($http.get('http://randomword.setgetgo.com/get.php'));
            }

            $q.all(arr).then(function (ret) {
                $rootScope.randomWords =[];
                $rootScope.randomWords.push(ret[0].data);
                $rootScope.randomWords.push(ret[1].data);
                $rootScope.$broadcast('words-refreshed');
            });


        }
    }]);