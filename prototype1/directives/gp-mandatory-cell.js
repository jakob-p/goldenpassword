app.directive('gpMandatoryCell', function () {
    return {
        restrict: 'E',
        scope: {
            rowObject: '=',
            password: '='
        },
        link: function (scope, elmt, attrs) {
            function mandatoryState() {
                var passwordRules = scope.rowObject.passwordRules;
                var state = {};

                var min = new RegExp('[^]{' + passwordRules.minimalLength + ',}');
                if (passwordRules.maximalLength != 0) {
                    var max = new RegExp('^[^]{0,' + passwordRules.maximalLength + '}$');
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

                state.minL = min.test(scope.password);
                state.maxL = !max || max.test(scope.password);
                state.lcL = lcL.test(scope.password);
                state.upL = upL.test(scope.password);
                state.num = num.test(scope.password);
                state.ascii = ascii.test(scope.password);
                state.unicode = unicode.test(scope.password);

                if (passwordRules.complexity == 'basic') {
                    state.complexEnough = true;
                } else {
                    var count = 0;
                    if (state.lcL) { count++; }
                    if (state.upL) { count++; }
                    if (state.num) { count++; }
                    if (state.ascii || state.unicode) { count++; }

                    if (passwordRules.complexity == '2class') {
                        state.complexEnough = count > 1;
                    }
                    if (passwordRules.complexity == '3class') {
                        state.complexEnough = count > 2;
                    }
                    if (passwordRules.complexity == '4class') {
                        state.complexEnough = count > 3;
                    }
                }

                return state;
            };

            scope.$watch('password', function (newValue, oldValue) {
                scope.state = mandatoryState();
            });
        },
        templateUrl: 'templates/gp-mandatory-cell.html'
    };
});