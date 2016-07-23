app.factory('suggestionService', function (dictionaryService, $rootScope, $http) {

    $rootScope.forbiddenChars = [];


    $http.get('https://crowdview.dk/auth/words?n=100').then(function (response) {
        $rootScope.randomWords = response.data;
    });

    function getSuggestions(password, state, passwordrules) {

        var suggestion = password;


        if (passwordrules.complexity == '2class') {
            if (passwordrules.numerals==3){
                suggestion = addNumber(suggestion);
            } else {
                suggestion = addCapitalizedWord(suggestion);

            }
        } else
        if (passwordrules.complexity == '2class' || passwordrules.complexity == '3class' || passwordrules.complexity == 'bahn' || passwordrules.complexity == 'outbrain') {
            suggestion = addNumber(suggestion);
            suggestion = addCapitalizedWord(suggestion);
        } else  if (passwordrules.complexity == 'lidl') {
            suggestion = addNumber(suggestion);
            suggestion = addRandomChar(suggestion, '@#$%ˆ&+=.:-!?');
            suggestion = addCapitalizedWord(suggestion);
        } else  {
            suggestion = addWord(suggestion);
        }



        if (passwordrules.maximalLength == 0 || passwordrules.maximalLength > (suggestion.length + 8)) {
            suggestion = addWord(suggestion);
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
        var random = getRandomInt(0, 49);
        return password + $rootScope.randomWords[random];
    }


    function addCapitalizedWord(password) {
        var random = getRandomInt(0, 49);
        return password + capitalizeFirstLetter($rootScope.randomWords[random]);
        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
    }

    function addNumber(password) {
        var number = Math.floor(Math.random() * 9) + 1;
        return '' + number + password;
    }

    function addRandomChar(password, allowedChars) {
        return allowedChars.charAt(Math.floor(Math.random() * allowedChars.length)) + password;
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }


    return {
        getSuggestions: getSuggestions,
        addWord: addWord
    }
});