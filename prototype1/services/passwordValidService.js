app.factory('passwordValidService', ['passwordRulesService', 'dictionaryService', function (passwordRulesService, dictionaryService) {
    return function (password, passwordRules) {
        var state = passwordRulesService(password, passwordRules);
        return state.minL
            && state.maxL
            && (passwordRules.lowercaseLetters == 2 || passwordRules.lowercaseLetters == 3 && state.lcL)
            && (passwordRules.uppercaseLetters == 2 || passwordRules.uppercaseLetters == 3 && state.upL)
            && (passwordRules.numerals == 2 || passwordRules.numerals == 3 && state.num)
            && (passwordRules.nonAlphanumeric == 2
                || passwordRules.nonAlphanumeric == 0 && !state.ascii
                || passwordRules.nonAlphanumeric == 1 && state.onlyAllowed && state.anyForbidden)
            && (passwordRules.unicodeCharacters == 2
                || passwordRules.unicodeCharacters == 0 && !state.unicode
                || passwordRules.unicodeCharacters == 1 && state.onlyAllowed && state.anyForbidden)
            && state.onlyAllowed
            && state.anyForbidden
            && state.complexEnough
            && (passwordRules.dictionaryCheck == 'no'
                || passwordRules.dictionaryCheck == 'yes' && !dictionaryService(password));
    }
}]);