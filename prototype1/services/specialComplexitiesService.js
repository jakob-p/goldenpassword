app.factory('specialComplexitiesService', ['contiguousCharsService', function (contiguousCharsService) {
    return function (password, passwordRules) {
        var complexEnough = false;
        switch (passwordRules.complexity) {
            case 'idealo':
                complexEnough = !/(.)\1{2}/.test(password);
                break;
            case 'lidl':
                complexEnough = new RegExp('[' + passwordRules.allowedSymbols + ']+').test(password);
                break;
            case 'paypal':
                complexEnough = !/(.)\1{2}/.test(password) && contiguousCharsService(password, 3);
                break;
        }
        return complexEnough;
    };
}]);