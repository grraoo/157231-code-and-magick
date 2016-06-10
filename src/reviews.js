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

reviewFilters.classList.add('invisible');

if ('content' in templateElement) {
  elementToClone = templateElement.content.querySelector('.review');
} else {
  elementToClone = templateElement.querySelector('.review');
}

window.getReviewElement = function(data, container) {
  var element = elementToClone.cloneNode(true);
  container.appendChild(element);

  var ratingStar = element.querySelector('.review-rating');
  ratingStar.style.width = data.rating * 30 + 'px';

  element.querySelector('.review-text').textContent = data.description;

  var userPhoto = new Image(124, 124);
  var imageLoadTimeout;

  userPhoto.onerror = function() {
    element.classList.add('review-load-failure');
  };

  userPhoto.onload = function() {
    clearTimeout(imageLoadTimeout);
  };

  userPhoto.src = data.author.picture;
  element.querySelector('.review-author').src = userPhoto.src;
  element.querySelector('.review-author').title = data.author.name;
  element.querySelector('.review-author').alt = data.author.name;

  imageLoadTimeout = setTimeout(function() {
    userPhoto.src = '';
    element.classList.add('review-load-failure');
  }, IMAGE_LOAD_TIMEOUT);

  return element;
};

window.buildReviewList = function() {
  reviews.forEach(function(review) {
    getReviewElement(review, reviewsContainer);
  });
  reviewFilters.classList.remove('invisible');
};
