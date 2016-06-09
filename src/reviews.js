'use strict';

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

var getReviewElement = function(data, container) {
  var element = elementToClone.cloneNode(true);
  container.appendChild(element);

  var ratingStar = element.querySelector('.review-rating');

  if (data.rating > 1) {
    ratingStar.style.display = 'inline-block';
    for (var i = 0; i < data.rating - 1; i++) {
      element.insertBefore(ratingStar.cloneNode(), ratingStar);
    }
  }

  element.querySelector('.review-text').textContent = data.description;

  var userPhoto = new Image(124, 124);
  var imageLoadTimeout;

  userPhoto.onload = function() {
    clearTimeout(imageLoadTimeout);
  };

  userPhoto.onerror = function() {
    element.classList.add('review-load-failure');
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

window.reviews.forEach(function(review) {
  getReviewElement(review, reviewsContainer);
});

reviewFilters.classList.remove('invisible');
