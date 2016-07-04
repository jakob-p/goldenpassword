app.factory('passwordNallowedService', ['regexService', 'dictionaryService', function (regexService, dictionaryService) {
    var regex = regexService;
    var dictionary = dictionaryService;
    var nallowed = function (password, passwordRules) {

        console.log(passwordRules);

        var res = '';

        if (passwordRules.nonAlphanumeric == 0 && regex.ascii.exec(password)) {
            var asciiMatch = regex.ascii.exec(password)[0]
            res += asciiMatch;
        }
        if (passwordRules.unicodeCharacters == 0 && regex.unicode.exec(password)) {
            var unicodeMatch = regex.unicode.exec(password)[0];
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
            var forbiddenSymbols = passwordRules.forbiddenSymbols;
            if (passwordRules.nonAlphanumeric == 0) {
                // remove all ascii characters from forbiddenSymbols string to avoid duplicate in res
                var forbiddenSymbols = forbiddenSymbols.replace(regex.ascii, '');
            }
            if (passwordRules.unicodeCharacters == 0) {
                // remove all unicode characters from forbiddenSymbols string to avoid duplicate
                var forbiddenSymbols = forbiddenSymbols.replace(regex.unicode, '');
            }
            var forbidden = new RegExp('[' + forbiddenSymbols + ']+');
            if (forbidden.exec(password)) {
                res += forbidden.exec(password)[0];
            }
        }

        if (passwordRules.dictionaryCheck == 'yes') {
            if (dictionaryService(password)) {
                res += 'dictionary';
            }
        }
        return res;
    };

    return nallowed;
}]);