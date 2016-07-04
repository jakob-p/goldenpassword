app.factory('dictionaryService', function () {
    var savedResults = {};
    var dictionaryCheck = function (password) {

        if (password != '' && savedResults[password] === undefined) {
            console.log(password);
            var check = zxcvbn(password);
            if (check.sequence.length < 2) {
                if (check.sequence[0].pattern == 'dictionary') {
                    savedResults[password] = true;
                }
                else {
                    savedResults[password] = false;
                }
            } else {
                savedResults[password] = false;
            }
        }
        return savedResults[password];
    }
    return dictionaryCheck;
});