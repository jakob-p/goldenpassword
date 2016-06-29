app.factory('contiguousCharsService', function () {
    var sequences = []
    sequences[0] = '01234567890';
    sequences[1] = 'abcdefghijklmnopqrstuvwxyz';
    sequences[2] = 'qwertzuiopüasdfghjklöäyxcvbnm';
    sequences[3] = 'qwertyuiopasdfghjklzxcvbnm';
    sequences[4] = 'azertyuiopqsdfghjklmwxcvbn';

    /* true if there is no subsequence of sequences[i] in password, reading from left to right or right to left */
    var noContiguous = function (password, seqLength) {
        return sequences.every(function (element) {
            for (var i = 0; i < password.length; i++) {
                for (var j = 0; j < element.length; j++) {
                    if (password.charAt(i) === element.charAt(j)) {
                        /* return false if there is password[i]=element[j] & ... & password[i+seqLength-1]=element[j+seqLength-1] */
                        if (i + seqLength - 1 < password.length && j + seqLength - 1 < element.length) {
                            var k = 1;
                            while (password.charAt(i + k) === element.charAt(j + k) && k < seqLength) {
                                k++;
                            }
                            if (k === seqLength) {
                                return false;
                            }
                        }
                        /* return false if there is password[i]=element[j] & ... & password[i-seqLength+1]=element[j-seqLength+1] */
                        if (i - seqLength + 1 >= 0 && j - seqLength + 1 >= 0) {
                            var k = 1;
                            while (password.charAt(i - k) === element.charAt(j - k) && k < seqLength) {
                                k++;
                            }
                            if (k === seqLength) {
                                return false;
                            }
                        }
                    }
                }
            }
            return true;
        });
    };

    return noContiguous;
});