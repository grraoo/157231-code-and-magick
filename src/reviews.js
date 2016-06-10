'use strict';

var reviews = [];
window.__reviewsLoadCallback = function(data) {
  reviews = data;
};

var reviewFilters = document.querySelector('.reviews-filter');
var templateElement = document.querySelector('template');
var reviewsContainer = document.querySelector('.reviews-list');
var IMAGE_LOAD_TIMEOUT = 10000;
var elementToClone;
var mainJs;
var newScript;

reviewFilters.classList.add('invisible');

if ('content' in templateElement) {
  elementToClone = templateElement.content.querySelector('.review');
} else {
  elementToClone = templateElement.querySelector('.review');
}

var getReviewElement = function(data, container) {
  var element = elementToClone.cloneNode(true);
  container.appendChild(element);

  var ratingStar = element.querySelector('.review-rating');
  ratingStar.style.width = data.rating * 30 + 'px';

  element.querySelector('.review-text').textContent = data.description;

  var userPhoto = new Image(124, 124);
  var imageLoadTimeout;

  userPhoto.src = data.author.picture;
  element.querySelector('.review-author').src = userPhoto.src;
  element.querySelector('.review-author').title = data.author.name;
  element.querySelector('.review-author').alt = data.author.name;

  userPhoto.onerror = function() {
    element.classList.add('review-load-failure');
  };
  
  userPhoto.onload = function() {
    clearTimeout(imageLoadTimeout);
  };
  


  imageLoadTimeout = setTimeout(function() {
    userPhoto.src = '';
    element.classList.add('review-load-failure');
  }, IMAGE_LOAD_TIMEOUT);

  return element;
};

var buildReviewList = function() {
  reviews.forEach(function(review) {
    getReviewElement(review, reviewsContainer);
  });
  reviewFilters.classList.remove('invisible');
};

var getJsonpRequest = function(jsonpSource, jsonpFunction) {
  mainJs = document.querySelector('script[src="js/main.js"]');

  newScript = document.createElement('script');
  newScript.type = 'text/javascript';
  newScript.src = '//up.htmlacademy.ru/assets/js_intensive/jsonp/reviews.js';

  document.body.insertBefore(newScript, mainJs);

  newScript.onload = jsonpFunction;
};

getJsonpRequest('//up.htmlacademy.ru/assets/js_intensive/jsonp/reviews.js', buildReviewList);
