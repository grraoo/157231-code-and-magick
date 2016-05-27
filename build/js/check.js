var getMessage = function(a, b) {
	var message = ' ';
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

	else if ((typeof a == "object") && (a instanceof Array)) {

		if ((typeof b == "object") && (b instanceof Array)) {
		var length = 0;
		for(i=0;i < a.length;i++) {
	    length = length + a[i]*b[i];
		}
		message = 'Я прошёл ' + length + ' метров';	
		}
		
		else {

			var sum=0;
			for(i=0; i < a.length; i++) {
				
		    sum = sum+Math.abs(parseInt(a[i], 10));
			}
			message = 'Я прошёл ' + sum + ' шагов';
		}
	}

	return message;
}
