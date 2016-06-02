var getMessage = function(a, b) {
    var message = '';
    var numberOfSteps = 0;
    var passedWay = 0;
    var jumpHeightInCentimeters = a * 100;
    if (typeof a == 'boolean') {
        if (a) {
            message = 'Я попал в ' + b;
        } else {
            message = 'Я никуда не попал';
        }
    } else if (a == parseFloat(a, 10)) {
        message = 'Я прыгнул на ' + jumpHeightInCentimeters + ' сантиметров';
    } else if (Array.isArray(a)) {
        if (Array.isArray(b)) {
            for (var i = 0; i < a.length; i++) {
                passedWay += a[i] * b[i];
            }
            message = 'Я прошёл ' + passedWay + ' метров';
        } else {
            for (var i = 0; i < a.length; i++) {
                numberOfSteps += a[i];
            }
            message = 'Я прошёл ' + numberOfSteps + ' шагов';
        }
    }
    return message;
};
