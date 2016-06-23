'use strict';

var load = require('./load.js');
var getReviewElement = require('./getReviewElement.js');
var filters = require('./filters.js');

var DEFAULT_FILTER = document.querySelector('input[name = "reviews"]:checked').id;
window.reviews = [];
window.reviewsMore = document.querySelector('.reviews-controls-more');
var reviewsMore = window.reviewsMore;
var PAGE_SIZE = 3;
window.pageNumber = 0;

var isNextPageNotAvailable = function(reviewList, page, pageSize) {
  return page >= Math.ceil(reviewList.length / pageSize);
};

window.buildReviewList = function(reviewList, page) {

  var from = page * PAGE_SIZE;
  var to = from + PAGE_SIZE;

  reviewList.slice(from, to).forEach(function(review) {
    getReviewElement.build(review, window.reviewsContainer);
  });
  window.reviewFilters.classList.remove('invisible');
};

var showCurrentPage = function() {
  window.pageNumber++;
  if(isNextPageNotAvailable(window.reviewsFiltered, window.pageNumber + 1, PAGE_SIZE)) {
    reviewsMore.classList.add('invisible');
  }
  window.buildReviewList(window.reviewsFiltered, window.pageNumber);
};

var buildFilteredReviews = function() {
  reviewsMore.classList.remove('invisible');
  load.getReviewList(function(data) {
    window.reviews = data;
    filters.getReviewsFiltered(DEFAULT_FILTER);
  });
  reviewsMore.addEventListener('click', showCurrentPage);

  window.reviewFilters.addEventListener('click', function(evt) {
    var clickTarget = evt.target;
    if(evt.target.tagName.toLowerCase() === 'sup') {
      clickTarget = evt.target.parentElement;
    }
    if(clickTarget.classList.contains('reviews-filter-item')) {
      enableFilter(clickTarget.getAttribute('for'));
    }
  });
};

var enableFilter = function(filter) {
  window.reviewsMore.classList.remove('invisible');
  window.pageNumber = 0;
  filters.getReviewsFiltered(filter);
};

buildFilteredReviews();
