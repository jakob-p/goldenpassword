'use sctrict';

var app = angular.module('goldenPasswordApp', [])
    .controller('fetchGridData', ['$scope', '$http', function ($scope, $http) {
        $http.get('passwordData.json').then(function (response) {
            $scope.gridData = response.data;
            $scope.password = 'test';
        });
    }])
    .directive('gpWebsiteGrid', function () {
        return {
            restrict: 'E',
            templateUrl: 'gp-website-grid.html'
        };
    })
    .directive('gpValidCell', function () {
        return {
            restrict: 'E',
            scope: {
                rowObject: '=',
                password: '='
            },
            link: function (scope, elmt, attrs) {
                function validate(password) {
                    var passwordRules = scope.rowObject.passwordRules;

                    var min = new RegExp('[^]{' + passwordRules.minimalLength + ',}');
                    
                    if (passwordRules.maximalLength != 0) {
                        var max = new RegExp('^[^]{,' + passwordRules.maximalLength + '}$');
                    }

                    if (passwordRules.lowercaseLetters != 2) {
                        if (passwordRules.lowercaseLetters == 3) {
                            var lcL = new RegExp(/[a-z]+/);
                        } else {
                            console.error('value lowercaseLetters not expected/implemented');
                            console.error(scope.rowObject);
                        }
                    }

                    if (passwordRules.uppercaseLetters != 2) {
                        if (passwordRules.uppercaseLetters == 3) {
                            var upL = new RegExp(/[A-Z]+/);
                        } else {
                            console.error('value uppercaseLetters not expected/implemented');
                            console.error(scope.rowObject);
                        }
                    }

                    if (passwordRules.numerals != 2) {
                        if (passwordRules.numerals == 3) {
                            var num = new RegExp(/[0-9]+/);
                        } else {
                            console.error('value numerals not expected/implemented');
                            console.error(scope.rowObject);
                        }
                    }
                    return min.test(scope.password) 
                    && (!max || max.test(scope.password)) 
                    && (!lcL || lcL.test(scope.password)) 
                    && (!upL || upL.test(scope.password))
                    && (!num || num.test(scope.password));
                };

                scope.$watch('password', function (newValue, oldValue) {
                    scope.validRow = validate();
                });
            },
            templateUrl: 'gp-valid-cell.html'
        };
    })
    .directive('gpMandatoryCell', function () {
        return {
            restrict: 'E',
            templateUrl: 'gp-mandatory-cell.html'
        };
    });
