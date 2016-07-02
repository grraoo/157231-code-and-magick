'use strict';

var load = require('./load.js');
var filters = require('./filters.js');
var Review = require('./getReviewElement.js');

var reviewFilters = document.querySelector('.reviews-filter');

var FilterNames = {
  'ALL': 'reviews-all',
  'RECENT': 'reviews-recent',
  'GOOD': 'reviews-good',
  'BAD': 'reviews-bad',
  'POPULAR': 'reviews-popular'
};

var reviewsFiltered = [];
var reviewsContainer = document.querySelector('.reviews-list');
var reviewsToRemove = [];

var DEFAULT_FILTER = document.querySelector('input[name = "reviews"]:checked').id;
var reviewsMore = document.querySelector('.reviews-controls-more');
var PAGE_SIZE = 3;
var pageNumber = 0;

var isNextPageNotAvailable = function(reviewList, page, pageSize) {
  return page >= Math.ceil(reviewList.length / pageSize);
};

var buildReviewList = function(reviewList, page) {
  if(isNextPageNotAvailable(reviewsFiltered, pageNumber + 1, PAGE_SIZE)) {
    reviewsMore.classList.add('invisible');
  }

  var from = page * PAGE_SIZE;
  var to = from + PAGE_SIZE;

  reviewList.slice(from, to).forEach(function(review) {
    review = new Review(review, reviewsContainer);
    reviewsToRemove.push(review);
  });

  reviewFilters.classList.remove('invisible');
};

var showCurrentPage = function() {
  pageNumber++;
  buildReviewList(reviewsFiltered, pageNumber);
};

var getReviewsFiltered = function(filter) {
  filters.validateFilters(load.reviews);

  switch (filter) {
    case FilterNames.ALL:
      reviewsFiltered = filters.ReviewsFiltered.allReviews;
      break;
    case FilterNames.RECENT:
      reviewsFiltered = filters.ReviewsFiltered.recentReviews;
      break;
    case FilterNames.GOOD:
      reviewsFiltered = filters.ReviewsFiltered.goodReviews;
      break;
    case FilterNames.BAD:
      reviewsFiltered = filters.ReviewsFiltered.badReviews;
      break;
    case FilterNames.POPULAR:
      reviewsFiltered = filters.ReviewsFiltered.popularReviews;
      break;
  }
  buildReviewList(reviewsFiltered, pageNumber);
};

var buildFilteredReviews = function() {
  reviewsMore.classList.remove('invisible');
  load.getReviewList(function(data) {
    load.reviews = data;
    getReviewsFiltered(DEFAULT_FILTER);
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
  reviewsMore.classList.remove('invisible');
  pageNumber = 0;
  reviewsToRemove.forEach(function(review) {
    review.remove();
  });
  reviewsToRemove = [];
  getReviewsFiltered(filter);
};

buildFilteredReviews();
