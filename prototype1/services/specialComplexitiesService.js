app.factory('specialComplexitiesService', ['passwordClassesService', 'contiguousCharsService', function (passwordClassesService, contiguousCharsService) {
    return function (password, passwordRules) {
        var complexEnough = false;
        switch (passwordRules.complexity) {
            //case 'spiegel':
            //    /* in case we replace '3class' with a more accurate complexity */
            //    break;
            case 'paypal':
                complexEnough = !/(.)\1{2}/.test(password) && contiguousCharsService(password, 3);
                break;
            case 'outbrain':
                complexEnough = !/(.)\1{2}/.test(password) && contiguousCharsService(password, 3);
                break;
            //case 'pornhub':
            //    complexEnough = /^[a-z]/.test(password);
            //    break;
            case 'bahn':
                var state = passwordClassesService(password);
                var lessThan3Chars = /^(\S)?(?:\s|\1)*(\S)?(?:\s|\1|\2)*(\S)?(?:\s|\1|\2|\3)*$/.test(password);
                complexEnough = (state.num || state.ascii || state.unicode) && !lessThan3Chars;
                break;
            case 'idealo':
                complexEnough = !/(.)\1{2}/.test(password);
                break;
            case 'lidl':
                complexEnough = new RegExp('[' + passwordRules.allowedSymbols + ']+').test(password);
                break;
            case 'mediamarkt':
                complexEnough = contiguousCharsService(password, 3) && !/(.)\1{3}/.test(password);
                break;
            default:
                console.error('Complexity not allowed :', passwordRules.complexity);
        }
        return complexEnough;
    };
}]);