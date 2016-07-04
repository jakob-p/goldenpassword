app.factory('dictionaryService', function () {
    var savedResults = {};
    var dictionaryCheck = function (password) {

        if (password != '' && savedResults[password]===undefined) {
            console.log(password);
            var check = zxcvbn(password);
            for (var i = 0; i < check.sequence.length; i++) {
                if (check.sequence[i].pattern == 'dictionary') {
                    savedResults[password] = true;
                    break;
                }
                else {
                    savedResults[password] = false;
                }
            }
        }
        return savedResults[password];
    }
    return dictionaryCheck;
});