var message = ' ';
var a;
var b;


var getMessage = function(a, b) {
if(typeof(a)=='boolean') {
	if (a == true) {
		message = 'Я попал в ' + b;
	}
	else  {
		message = 'Я никуда не попал';
	}
}
else if (typeof(a) == 'number') {
	message = 'Я прыгнул на ' + a*100 + ' сантиметров';
}

else if (typeof(a) == 'array') {
	var sum = 0;
	for(i=0;i < a.length;i++) {
    sum = sum + a[i];
	}
	message = 'Я прошёл' + sum + ' шагов';
}

else if ((typeof(a) == 'array')||(typeof(b) == 'array')) {
	var length = 0;
	for(i=0;i < a.length;i++) {
    length = length + a[i]*b[i];
	}
	message = 'Я прошёл' + length + ' метров';	
}
return message;
}
