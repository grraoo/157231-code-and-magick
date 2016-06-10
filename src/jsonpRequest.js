var getJsonpRequest = function(jsonpSource, jsonpFunction) {
  window.mainJs = document.querySelector('script[src="js/main.js"]');

  window.newScript = document.createElement('script');
  newScript.type = 'text/javascript';
  newScript.src = '//up.htmlacademy.ru/assets/js_intensive/jsonp/reviews.js';

  document.body.insertBefore(window.newScript, window.mainJs);

  newScript.onload = jsonpFunction;
};

getJsonpRequest('//up.htmlacademy.ru/assets/js_intensive/jsonp/reviews.js', window.buildReviewList);
