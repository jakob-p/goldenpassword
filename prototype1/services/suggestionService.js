app.factory('suggestionService', function (dictionaryService,$rootScope,$http) {

    $rootScope.forbiddenChars = [];


    for (var i = 0; i < 2; i++) {
        $http.get('http://randomword.setgetgo.com/get.php').then(function (response) {
            $rootScope.randomWords.push(response.data);
        });
    }

    function getSuggestions(password, state, passwordrules) {

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


    return {getSuggestions: getSuggestions}
});