app.directive('gpNallowedCell', function () {
    return {
        restrict: 'E',
        scope: {
            rowObject: '=',
            password: '='
        },
        link: function (scope, elmt, attrs) {
            function nAllowedChars() {
                var passwordRules = scope.rowObject.passwordRules;
                var res = '';

                var ascii = /[\x21-\x2F\x3A-\x40\x5B-\x60\x7B-\xFF]+/;
                var unicode = /[^\x00-\xFF]+/;

                if (passwordRules.nonAlphanumeric == 0 && ascii.exec(scope.password)) {
                    var asciiMatch = ascii.exec(scope.password)[0]
                    res += asciiMatch;
                }
                if (passwordRules.unicodeCharacters == 0 && unicode.exec(scope.password)) {
                    var unicodeMatch = unicode.exec(scope.password)[0];
                    res += unicodeMatch;
                }

                if (passwordRules.allowedSymbols != '') {
                    var allowedSymbols = passwordRules.allowedSymbols;
                    if (asciiMatch) {
                        // add all ascii characters to allowedSymbols string to avoid duplicate in res
                        allowedSymbols += asciiMatch;
                    }
                    if (unicodeMatch) {
                        // add all unicode characters to allowedSymbols string to avoid duplicate in res
                        allowedSymbols += unicodeMatch;
                    }
                    var nallowed = new RegExp('[^a-zA-Z0-9' + allowedSymbols + ']+');
                    if (nallowed.exec(scope.password)) {
                        res += nallowed.exec(scope.password)[0];
                    }
                }

                if (passwordRules.forbiddenSymbols != '') {
                    if (passwordRules.nonAlphanumeric == 0) {
                        // remove all ascii characters from forbiddenSymbols string to avoid duplicate in res
                        var forbiddenSymbols = passwordRules.forbiddenSymbols.replace(ascii, '');
                    }
                    else if (passwordRules.unicodeCharacters == 0) {
                        // remove all unicode characters from forbiddenSymbols string to avoid duplicate
                        var forbiddenSymbols = passwordRules.forbiddenSymbols.replace(unicode, '');
                    }
                    else {
                        var forbiddenSymbols = passwordRules.forbiddenSymbols;
                    }
                    var forbidden = new RegExp('[' + forbiddenSymbols + ']+');
                    if (forbidden.exec(scope.password)) {
                        res += forbidden.exec(scope.password)[0];
                    }
                }

                return res;
            };

            scope.$watch('password', function (newValue, oldValue) {
                scope.nAllowedChars = nAllowedChars();
            });
        },
        templateUrl: 'templates/gpNallowedCell.html'
    };
});
