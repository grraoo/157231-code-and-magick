'use strict';

var load = require('./load.js');

var MS_IN_FOUR_DAYS = 60 * 60 * 24 * 1000 * 4;
var allReviews = [];
var reviewsFiltered = [];
var recentReviews = [];
var goodReviews = [];
var badReviews = [];
var popularReviews = [];
var FilterNames = {
  'ALL': 'reviews-all',
  'RECENT': 'reviews-recent',
  'GOOD': 'reviews-good',
  'BAD': 'reviews-bad',
  'POPULAR': 'reviews-popular'
};
var defaultLabelTExt = ['Все', 'Недавние', 'Хорошие', 'Плохие', 'Популярные'];
var filterLabels = document.querySelectorAll('.reviews-filter-item');


var validateFilters = function() {
  for (var i = 0; i < filterLabels.length; i++) {
    filterLabels[i].innerHTML = defaultLabelTExt[i];
  }
  var reviewsToFilter = load.reviews.slice(0);
  allReviews = load.reviews.slice(0);
  recentReviews = reviewsToFilter.filter(function(review) {
    return (Date.now() - Date.parse(review.date) <= MS_IN_FOUR_DAYS) && (Date.now() >= Date.parse(review.date));
  }).sort(function(a, b) {
    return Date.parse(b.date) - Date.parse(a.date);
  });
  goodReviews = reviewsToFilter.filter(function(review) {
    return review.rating >= 3;
  }).sort(function(a, b) {
    return b.rating - a.rating;
  });
  badReviews = reviewsToFilter.filter(function(review) {
    return review.rating < 3;
  }).sort(function(a, b) {
    return a.rating - b.rating;
  });
  popularReviews = reviewsToFilter.sort(function(a, b) {
    return b.review_usefulness - a.review_usefulness;
  });
};

module.exports = {
  getReviewsFiltered: function(filter) {
    validateFilters();
    var reviewsAll = load.reviews.slice(0);
    var filterContent = [reviewsAll.length, recentReviews.length, goodReviews.length, badReviews.length, popularReviews.length];
    for (var i = 0; i < filterContent.length; i++) {
      if (!filterContent[i]) {
        filterLabels[i].classList.add('disabled-label');
      }
    }

    for (i = 0; i < filterLabels.length; i++) {
      var sup = document.createElement('sup');
      sup.innerHTML = '(' + filterContent[i] + ')';
      sup.classList.add('reviewsNumber');
      filterLabels[i].appendChild(sup);
    }

    switch (filter) {
      case FilterNames.ALL:
        reviewsFiltered = allReviews;
        break;
      case FilterNames.RECENT:
        reviewsFiltered = recentReviews;
        break;
      case FilterNames.GOOD:
        reviewsFiltered = goodReviews;
        break;
      case FilterNames.BAD:
        reviewsFiltered = badReviews;
        break;
      case FilterNames.POPULAR:
        reviewsFiltered = popularReviews;
        break;
    }
    window.reviewsFiltered = reviewsFiltered;
  }
};
