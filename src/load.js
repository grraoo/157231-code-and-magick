'use strict';


var reviewsBlock = document.querySelector('.reviews');
var REVIEWS_LOAD_URL = '//o0.github.io/assets/json/reviews.json';



module.exports = {
  getReviewList: function(callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', REVIEWS_LOAD_URL);
    xhr.onloadstart = function() {
      reviewsBlock.classList.add('reviews-list-loading');
    };
    xhr.onloadend = function() {
      reviewsBlock.classList.remove('reviews-list-loading');
    };
    xhr.timeout = 10000;
    xhr.ontimeout = function() {
      reviewsBlock.classList.add('reviews-load-failure');
      reviewsBlock.classList.remove('reviews-list-loading');
    };
    xhr.onerror = function() {
      reviewsBlock.classList.add('reviews-load-failure');
      reviewsBlock.classList.remove('reviews-list-loading');
    };

    xhr.onload = function(evt) {
      var loadedData = JSON.parse(evt.target.response);
      callback(loadedData);
    };
    xhr.send();
  }
};