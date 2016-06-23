'use strict';

var load = require('./load.js');
var filters = require('./filters.js');
var getReviewElement = require('./getReviewElement.js');
var reviewFilters = document.querySelector('.reviews-filter');



var reviewsContainer = document.querySelector('.reviews-list');

var DEFAULT_FILTER = document.querySelector('input[name = "reviews"]:checked').id;
var reviewsMore = document.querySelector('.reviews-controls-more');
var PAGE_SIZE = 3;
var pageNumber = 0;

var isNextPageNotAvailable = function(reviewList, page, pageSize) {
  return page >= Math.ceil(reviewList.length / pageSize);
};

var buildReviewList = function(reviewList, page) {

  var from = page * PAGE_SIZE;
  var to = from + PAGE_SIZE;

  reviewList.slice(from, to).forEach(function(review) {
    getReviewElement.build(review, reviewsContainer);
  });
  reviewFilters.classList.remove('invisible');
};

var showCurrentPage = function() {
  pageNumber++;
  if(isNextPageNotAvailable(window.reviewsFiltered, pageNumber + 1, PAGE_SIZE)) {
    reviewsMore.classList.add('invisible');
  }
  buildReviewList(window.reviewsFiltered, pageNumber);
};

var buildFilteredReviews = function() {
  reviewsMore.classList.remove('invisible');
  load.getReviewList(function(data) {
    load.reviews = data;
    filters.getReviewsFiltered(DEFAULT_FILTER);
    buildReviewList(window.reviewsFiltered, pageNumber);
  });
  reviewsMore.addEventListener('click', showCurrentPage);

  reviewFilters.addEventListener('click', function(evt) {
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
  reviewFilters.classList.add('invisible');
  reviewsMore.classList.remove('invisible');
  pageNumber = 0;
  reviewsContainer.innerHTML = '';
  filters.getReviewsFiltered(filter);
  buildReviewList(window.filteredReviews, pageNumber);
};

buildFilteredReviews();
