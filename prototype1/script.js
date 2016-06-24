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
                        var max = new RegExp('^[^]{0,' + passwordRules.maximalLength + '}$');
                    }
                    var lcL = /[a-z]+/;
                    var upL = /[A-Z]+/;
                    var num = /[0-9]+/;
                    var ascii = /[\x21-\xFF]+/;
                    var unicode = /[^\x00-\xFF]+/;
                    if (passwordRules.allowedSymbols != "") {
                        var allowed = new RegExp('[' + passwordRules.allowedSymbols + ']+');
                    }
                    if (passwordRules.forbiddenSymbols != "") {
                        var restricted = new RegExp('[' + passwordRules.forbiddenSymbols + ']+');
                    }

                    var containsLcL = lcL.test(scope.password);
                    var containsUpL = lcL.test(scope.password);
                    var containsNum = num.test(scope.password);
                    var containsAscii = ascii.test(scope.password);
                    var containsUnicode = unicode.test(scope.password);
                    var containsAllowed = allowed.test(scope.password);
                    var containsRestricted = allowed.test(scope.password);

                    var count = 0;
                    if (containsLcL) { count++; };
                    if (containsUpL) { count++; };
                    if (containsNum) { count++; };
                    if (containsUnicode || containsAllowed) { count++; };

                    return min.test(scope.password)
                        && (!max || max.test(scope.password))
                        /*&& (!lcL || lcL.test(scope.password))
                        && (!upL || upL.test(scope.password))
                        && (!num || num.test(scope.password));*/
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
