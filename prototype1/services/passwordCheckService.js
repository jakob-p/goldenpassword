app.factory('passwordCheckService', function () {
        return function (password, passwordRules) {
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

            state.minL = min.test(password);
            state.maxL = !max || max.test(password);
            state.lcL = lcL.test(password);
            state.upL = upL.test(password);
            state.num = num.test(password);
            state.ascii = ascii.test(password);
            state.unicode = unicode.test(password);
            state.onlyAllowed = !onlyAllowed || onlyAllowed.test(password);
            state.anyForbidden = !forbidden || !forbidden.test(password);

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
    });