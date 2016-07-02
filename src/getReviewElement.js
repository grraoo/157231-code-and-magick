'use strict';

var templateElement = document.querySelector('template');
var IMAGE_LOAD_TIMEOUT = 10000;
var elementToClone;

var Review = function(data, container) {
  this.data = data;
  this.element = getReviewElement(this.data, container);

  var that = this;

  this.element.quizYes = this.element.querySelector('.review-quiz-answer-yes');
  this.element.quizNo = this.element.querySelector('.review-quiz-answer-no');

  var onQuizClick = function() {
    if (that.element.querySelector('.review-quiz-answer-active')) {
      that.element.querySelector('.review-quiz-answer-active').classList.remove('review-quiz-answer-active');
    }
    this.classList.add('review-quiz-answer-active');
  };

  this.element.quizYes.addEventListener('click', onQuizClick);
  this.element.quizNo.addEventListener('click', onQuizClick);

  this.remove = function() {
    this.element.quizYes.removeEventListener('click', onQuizClick);
    this.element.quizNo.removeEventListener('click', onQuizClick);
    this.element.parentNode.removeChild(this.element);
  };
};

if ('content' in templateElement) {
  elementToClone = templateElement.content.querySelector('.review');
} else {
  elementToClone = templateElement.querySelector('.review');
}

var getReviewElement = function(data, container) {
  var element = elementToClone.cloneNode(true);

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

  container.appendChild(element);
  return element;
};

module.exports = Review;
