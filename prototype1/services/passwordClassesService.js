app.factory('passwordClassesService',  ['regexService', function (regexService) {
    var regex = regexService;
    var classes = function (password) {
        var state = {};

        state.lcL = regex.lcL.test(password);
        state.upL = regex.upL.test(password);
        state.num = regex.num.test(password);
        state.ascii = regex.ascii.test(password);
        state.unicode = regex.unicode.test(password);

        return state;
    };
    return classes;
}]);