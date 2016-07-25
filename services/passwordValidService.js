app.factory('passwordValidService', ['passwordRulesService', 'dictionaryService', '$rootScope', 'suggestionService', function (passwordRulesService, dictionaryService, $rootScope, suggestionService) {

    $rootScope.validCount = 0;


    return function (password, passwordRules, index) {
        var state = passwordRulesService(password, passwordRules);
        var valid = isValid(state, password);

        setSuggestions();
        return valid;

        function setSuggestions() {
            if (password.length > 0) {
                var suggestion;
                suggestion = suggestionService.getSuggestions(password, state, passwordRules);

                if (isValid(passwordRulesService(suggestion, passwordRules), suggestion)) {
                    $rootScope.suggestions[index] = suggestion;
                    $rootScope.showSuggestions[index] = true;
                }

                else {
                    var counter = 0;
                    suggestion = suggestionService.getSuggestions(password, state, passwordRules);
                    while (!isValid(passwordRulesService(suggestion, passwordRules), suggestion)) {
                        suggestion = suggestionService.getSuggestions(password, state, passwordRules);
                        counter++;
                        if (counter > 8) break;
                    }
                    if (isValid(passwordRulesService(suggestion, passwordRules), suggestion)) {
                        $rootScope.suggestions[index] = suggestion;
                        $rootScope.showSuggestions[index] = true;
                    }
                    else {
                        suggestion = '';
                        suggestion = suggestionService.addWord(suggestion);
                        suggestion = suggestionService.getSuggestions(suggestion, state, passwordRules);
                        if (isValid(passwordRulesService(suggestion, passwordRules), suggestion)) {
                            $rootScope.suggestions[index] = suggestion;
                            $rootScope.showSuggestions[index] = true;
                        } else {
                            $rootScope.showSuggestions[index] = false;
                        }
                    }
                }
            }
        }


        function isValid(state, password) {
            var valid =
                state.minL
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
            return valid;
        }


    }
}]);