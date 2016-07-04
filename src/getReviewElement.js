'use strict';

var templateElement = document.querySelector('template');
var IMAGE_LOAD_TIMEOUT = 10000;
var elementToClone;

var Review = function(data, container) {
  this.data = data;
  this.element = getReviewElement(this.data, container);

  this.element.quiz = this.element.querySelector('.review-quiz');

  this.element.quiz.addEventListener('click', this.onQuizClick.bind(this.element.quiz));
};

Review.prototype.onQuizClick = function(evt) {

  if(evt.target.classList.contains('review-quiz-answer')){

    if (evt.target.parentNode.querySelector('.review-quiz-answer-active')) {
      evt.target.parentNode.querySelector('.review-quiz-answer-active').classList.remove('review-quiz-answer-active');
    }
    evt.target.classList.add('review-quiz-answer-active');
  }
};

Review.prototype.remove = function() {
  this.element.quizYes.removeEventListener('click', this.onQuizClick);
  this.element.quizNo.removeEventListener('click', this.onQuizClick);
  this.element.parentNode.removeChild(this.element);
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
