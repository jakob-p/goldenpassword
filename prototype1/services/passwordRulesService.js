app.factory('passwordRulesService', ['passwordClassesService', 'specialComplexitiesService', function (passwordClassesService, specialComplexitiesService) {
    var rules = function (password, passwordRules) {
        var state = passwordClassesService(password);

        if (passwordRules.minimalLength != 0) {
            var min = new RegExp('[^]{' + passwordRules.minimalLength + ',}');
        }
        if (passwordRules.maximalLength != 0) {
            var max = new RegExp('^[^]{0,' + passwordRules.maximalLength + '}$');
        }

        if (passwordRules.allowedSymbols != '') {
            var onlyAllowed = new RegExp('^[a-zA-Z0-9' + passwordRules.allowedSymbols + ']+$');
        }
        if (passwordRules.forbiddenSymbols != '') {
            var forbidden = new RegExp('[' + passwordRules.forbiddenSymbols + ']+');
        }

        state.minL = !min || min.test(password);
        state.maxL = !max || max.test(password);
        state.onlyAllowed = !onlyAllowed || onlyAllowed.test(password);
        state.anyForbidden = !forbidden || !forbidden.test(password);

        if (passwordRules.complexity == 'basic') {
            state.complexEnough = true;
        } else {
            var count = 0;
            if (state.lcL) { count++; }
            if (state.upL) { count++; }
            if (state.num) { count++; }
            if (state.ascii) { count++; }
            if (state.unicode) { count++; }

            if (/^[1-9](?=class$)/.test(passwordRules.complexity)) { // match all "xclass" complexity
                state.complexEnough = count > (/^[1-9](?=class$)/.exec(passwordRules.complexity) - 1);
            }
            else {
                state.complexEnough = specialComplexitiesService(password, passwordRules);
            }
        }
        return state;
    };
    return rules;
}]);