app.directive('gpValidCell', function () {
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
                    var max = new RegExp('^[^]{1,' + passwordRules.maximalLength + '}$');
                }
                var lcL = /[a-z]+/;
                var upL = /[A-Z]+/;
                var num = /[0-9]+/;
                var ascii = /[\x21-\x2F\x3A-\x40\x5B-\x60\x7B-\xFF]+/;
                var unicode = /[^\x00-\xFF]+/;
                if (passwordRules.allowedSymbols != '') {
                    var onlyAllowed = new RegExp('^[a-zA-Z0-9' + passwordRules.allowedSymbols + ']+$');
                }
                if (passwordRules.forbiddenSymbols != '') {
                    var forbidden = new RegExp('[' + passwordRules.forbiddenSymbols + ']+');
                }

                var respectMinL = min.test(scope.password);
                var respectMaxL = !max || max.test(scope.password);
                var containsLcL = lcL.test(scope.password);
                var containsUpL = upL.test(scope.password);
                var containsNum = num.test(scope.password);
                var containsAscii = ascii.test(scope.password);
                var containsUnicode = unicode.test(scope.password);
                var containsOnlyAllowed = !onlyAllowed || onlyAllowed.test(scope.password);
                var notContainsForbidden = !forbidden || !forbidden.test(scope.password);

                if (passwordRules.complexity == 'basic') {
                    var complexEnough = true;
                } else {
                    var count = 0;
                    if (containsLcL) { count++; };
                    if (containsUpL) { count++; };
                    if (containsNum) { count++; };
                    if (containsAscii || containsUnicode) { count++; };

                    if (passwordRules.complexity == '2class') {
                        var complexEnough = count > 1;
                    }
                    if (passwordRules.complexity == '3class') {
                        var complexEnough = count > 2;
                    }
                    if (passwordRules.complexity == '4class') {
                        var complexEnough = count > 3;
                    }
                }

                return respectMinL
                    && respectMaxL
                    && (passwordRules.lowercaseLetters == 2 || passwordRules.lowercaseLetters == 3 && containsLcL)
                    && (passwordRules.uppercaseLetters == 2 || passwordRules.uppercaseLetters == 3 && containsUpL)
                    && (passwordRules.numerals == 2 || passwordRules.numerals == 3 && containsNum)
                    && (passwordRules.nonAlphanumeric == 2
                        || passwordRules.nonAlphanumeric == 0 && !containsAscii
                        || passwordRules.nonAlphanumeric == 1 && containsOnlyAllowed && notContainsForbidden)
                    && (passwordRules.unicodeCharacters == 2
                        || passwordRules.unicodeCharacters == 0 && !containsUnicode
                        || passwordRules.unicodeCharacters == 1 && containsOnlyAllowed && notContainsForbidden)
                    && complexEnough;
            };

            scope.$watch('password', function (newValue, oldValue) {
                scope.validRow = validate();
            });
        },
        templateUrl: 'templates/gp-valid-cell.html'
    };
});