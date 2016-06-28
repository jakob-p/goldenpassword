app.factory('passwordCheckService', function () {
    var passwordCheck = {};

    var lcL = /[a-z]+/;
    var upL = /[A-Z]+/;
    var num = /[0-9]+/;
    var ascii = /[\x21-\x2F\x3A-\x40\x5B-\x60\x7B-\xFF]+/;
    var unicode = /[^\x00-\xFF]+/;

    passwordCheck.classes = function (password) {
        var state = {};

        state.lcL = lcL.test(password);
        state.upL = upL.test(password);
        state.num = num.test(password);
        state.ascii = ascii.test(password);
        state.unicode = unicode.test(password);

        return state;
    };

    passwordCheck.rules = function (password, passwordRules) {
        var state = passwordCheck.classes(password);

        if (passwordRules.minimalLength != 0) {
            var min = new RegExp('[^]{' + passwordRules.minimalLength + ',}');
        }
        if (passwordRules.maximalLength != 0) {
            var max = new RegExp('^[^]{0,' + passwordRules.maximalLength + '}$');
        }

        if (passwordRules.allowedSymbols != '') {
            var onlyAllowed = new RegExp('^[a-zA-Z0-9' + passwordRules.allowedSymbols + ']+$');
        }
        if (passwordRules.forbiddenSymbols != '') {
            var forbidden = new RegExp('[' + passwordRules.forbiddenSymbols + ']+');
        }

        state.minL = !min || min.test(password);
        state.maxL = !max || max.test(password);
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

    passwordCheck.nallowed = function (password, passwordRules) {
        var res = '';

        if (passwordRules.nonAlphanumeric == 0 && ascii.exec(password)) {
            var asciiMatch = ascii.exec(password)[0]
            res += asciiMatch;
        }
        if (passwordRules.unicodeCharacters == 0 && unicode.exec(password)) {
            var unicodeMatch = unicode.exec(password)[0];
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
            if (nallowed.exec(password)) {
                res += nallowed.exec(password)[0];
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
            if (forbidden.exec(password)) {
                res += forbidden.exec(password)[0];
            }
        }

        return res;
    };

    return passwordCheck;
});