var getMessage = function(a, b) {
    var message = '';
    var i = 0;
    var numberOfSteps = 0;
    var passedWay = 0;
    var jumpHeigntInCentimetres = a*100;
    if (typeof a == 'boolean') {
        if (a) {
            message = 'Я попал в ' + b;
        } else {
            message = 'Я никуда не попал';
        }
    } else if (a == parseInt(a)) {
        message = 'Я прыгнул на ' + jumpHeigntInCentimetres + ' сантиметров';
    } else if (Object.prototype.toString.call(a) == '[object Array]') {
        if (Object.prototype.toString.call(b) == '[object Array]') {
            for (i = 0; i < a.length; i++) {
                passedWay += a[i] * b[i];
            }
            message = 'Я прошёл ' + passedWay + ' метров';
        } else {
            for (i = 0; i < a.length; i++) {
                numberOfSteps += a[i];
            }
            message = 'Я прошёл ' + numberOfSteps + ' шагов';
        }
    }
    return message;
};
