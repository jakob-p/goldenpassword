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
                if (passwordRules.forbiddenSymbols != '') {
                    var forbidden = new RegExp('[' + passwordRules.forbiddenSymbols + ']+');
                }

                if (passwordRules.nonAlphanumeric == 0 && ascii.exec(scope.password)) {
                    res += ascii.exec(scope.password)[0];
                }
                if (passwordRules.unicodeCharacters == 0 && unicode.exec(scope.password)) {
                    res += unicode.exec(scope.password)[0];
                }
                if (passwordRules.allowedSymbols != '') {
                    var allowed = new RegExp('[^a-zA-Z0-9' + passwordRules.allowedSymbols + ']+');
                    if (allowed.exec(scope.password)) {
                        res += allowed.exec(scope.password)[0];
                    }
                }
                if (passwordRules.forbiddenSymbols != '') {
                    var forbidden = new RegExp('[' + passwordRules.forbiddenSymbols + ']+');
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
