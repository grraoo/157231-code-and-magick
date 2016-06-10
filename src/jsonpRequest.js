'use strict';

var getJsonpRequest = function(jsonpSource, jsonpFunction) {
  window.mainJs = document.querySelector('script[src="js/main.js"]');

  window.newScript = document.createElement('script');
  window.newScript.type = 'text/javascript';
  window.newScript.src = '//up.htmlacademy.ru/assets/js_intensive/jsonp/reviews.js';

  document.body.insertBefore(window.newScript, window.mainJs);

  window.newScript.onload = jsonpFunction;
};

getJsonpRequest('//up.htmlacademy.ru/assets/js_intensive/jsonp/reviews.js', window.buildReviewList);
