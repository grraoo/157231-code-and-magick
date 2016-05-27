var getMessage = function(a, b) {
    var message = '';
    if (typeof a == 'boolean') {
        if (a == true) {
            message = 'Я попал в ' + b;
        } else {
            message = 'Я никуда не попал';
        }
    } else if (typeof a == 'number') {
        message = 'Я прыгнул на ' + a * 100 + ' сантиметров';
    } else if ((Object.prototype.toString.call(a) == '[object Array]')) {
        if ((Object.prototype.toString.call(b) == '[object Array]')) {
            var length = 0;
            for (var i = 0; i < a.length; i++) {
                length = length + a[i] * b[i];
            }
            message = 'Я прошёл ' + length + ' метров';
        } else {
            var sum = 0;
            for (var i = 0; i < a.length; i++) {
                sum = sum + a[i];
            }
            message = 'Я прошёл ' + sum + ' шагов';
        }
    }
    return message;
}