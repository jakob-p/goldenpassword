app.factory('contiguousCharsService', function () {
    var sequences = []
    sequences[0] = '01234567890';
    sequences[1] = 'abcdefghijklmnopqrstuvwxyz';
    sequences[2] = 'qwertzuiopüasdfghjklöäyxcvbnm';
    sequences[3] = 'qwertyuiopasdfghjklzxcvbnm';
    sequences[4] = 'azertyuiopqsdfghjklmwxcvbn';

    /* true if there is no subsequence of sequences[i] in password, reading from left to right or right to left */
    var noContiguous = function (password, seqLength) {
        return !password || sequences.every(function (element) {
            for (var i = 0; i < element.length; i++) {
                for (var j = 0; j < password.length - seqLength + 1; j++) {
                    if (element.charAt(i) === password.charAt(j)) {
                        /* return false if there is element[i]=password[j] & ... & element[i+seqLength-1]=password[j+seqLength-1] */
                        if (i + seqLength - 1 < element.length && j + seqLength - 1 < password.length) {
                            var k = 1;
                            while (element.charAt(i + k) === password.charAt(j + k) && k < seqLength) {
                                k++;
                            }
                            if (k === seqLength) {
                                return false;
                            }
                        }
                        /* return false if there is element[i]=password[j] & ... & element[i-seqLength+1]=password[j-seqLength+1] */
                        if (i - seqLength + 1 >= 0) {
                            var k = 1;
                            while (element.charAt(i - k) === password.charAt(j + k) && k < seqLength) {
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