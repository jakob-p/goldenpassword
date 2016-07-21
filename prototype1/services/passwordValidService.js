app.factory('passwordValidService', ['passwordRulesService', 'dictionaryService', '$rootScope', '$http', function (passwordRulesService, dictionaryService, $rootScope, $http) {

    $rootScope.forbiddenChars = [];
    for (var i = 0; i < 2; i++) {
        $http.get('http://randomword.setgetgo.com/get.php').then(function (response) {
            $rootScope.randomWords.push(response.data);
        });
    }

    return function (password, passwordRules, index) {
        var state = passwordRulesService(password, passwordRules);
        var valid = isValid(state, password);

        if (!valid) {
            var suggestion = '';
            if (password.length > 0) {
                suggestion = getSugestion(password, state, passwordRules);
            }

            if (isValid(passwordRulesService(suggestion, passwordRules), suggestion)) {
                $rootScope.suggestions[index] = suggestion;
                $rootScope.showSuggestions[index] = true;
            } else {
                $rootScope.showSuggestions[index] = false;
            }
        } else {
            $rootScope.showSuggestions[index] = false;
        }


        return valid;

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

        function getSugestion(password, state, passwordrules) {

            var suggestion = password;

            if (passwordrules.dictionaryCheck == 'yes' && dictionaryService(suggestion)) {
                suggestion = suggestion + $rootScope.randomWords[0];
            }

            if (passwordrules.complexity == '2class' || passwordrules.complexity == '3class' || passwordrules.complexity == 'lidl') {
                suggestion = addNumber(suggestion);
                suggestion = addCapitalizedWord(suggestion);
            }


            if (passwordrules.minimalLength > suggestion.length) {
                suggestion = addWord(suggestion);
            }

            if (passwordrules.minimalLength > suggestion.length) {
                suggestion = addCapitalizedWord(suggestion);
            }

            if (passwordrules.maximalLength != 0 && passwordrules.maximalLength < suggestion.length) {
                suggestion = suggestion.substring(0, passwordrules.maximalLength);
            }

            return suggestion;
        }

        function addWord(password) {
            return password + $rootScope.randomWords[0];
        }


        function addCapitalizedWord(password) {
            return password + capitalizeFirstLetter($rootScope.randomWords[1]);
            function capitalizeFirstLetter(string) {
                return string.charAt(0).toUpperCase() + string.slice(1);
            }
        }

        function addNumber(password) {
            var number = Math.floor(Math.random() * 9) + 1;
            return '' + number + password;
        }
    }
}]);