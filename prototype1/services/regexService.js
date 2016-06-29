app.factory('regexService', function () {
    var regex = {};

    regex.lcL = /[a-z]+/;
    regex.upL = /[A-Z]+/;
    regex.num = /[0-9]+/;
    regex.ascii = /[\x21-\x2F\x3A-\x40\x5B-\x60\x7B-\xFF]+/;
    regex.unicode = /[^\x00-\xFF]+/;

    return regex;
});