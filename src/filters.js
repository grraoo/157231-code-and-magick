'use strict';

var load = require('./load.js');

var MS_IN_FOUR_DAYS = 60 * 60 * 24 * 1000 * 4;

var ReviewsFiltered = {
  allReviews: [],
  recentReviews: [],
  goodReviews: [],
  badReviews: [],
  popularReviews: []
};

var defaultLabelTExt = ['Все', 'Недавние', 'Хорошие', 'Плохие', 'Популярные'];
var filterLabels = document.querySelectorAll('.reviews-filter-item');


var validateFilters = function() {
  for (var i = 0; i < filterLabels.length; i++) {
    filterLabels[i].innerHTML = defaultLabelTExt[i];
  }

  var reviewsToFilter = load.reviews.slice(0);
  ReviewsFiltered.allReviews = load.reviews.slice(0);
  ReviewsFiltered.recentReviews = reviewsToFilter.filter(function(review) {
    return (Date.now() - Date.parse(review.date) <= MS_IN_FOUR_DAYS) && (Date.now() >= Date.parse(review.date));
  }).sort(function(a, b) {
    return Date.parse(b.date) - Date.parse(a.date);
  });
  ReviewsFiltered.goodReviews = reviewsToFilter.filter(function(review) {
    return review.rating >= 3;
  }).sort(function(a, b) {
    return b.rating - a.rating;
  });
  ReviewsFiltered.badReviews = reviewsToFilter.filter(function(review) {
    return review.rating < 3;
  }).sort(function(a, b) {
    return a.rating - b.rating;
  });
  ReviewsFiltered.popularReviews = reviewsToFilter.sort(function(a, b) {
    return b.review_usefulness - a.review_usefulness;
  });

  var reviewsAll = load.reviews.slice(0);
  var filterContent = [reviewsAll.length, ReviewsFiltered.recentReviews.length, ReviewsFiltered.goodReviews.length, ReviewsFiltered.badReviews.length, ReviewsFiltered.popularReviews.length];

  for (i = 0; i < filterLabels.length; i++) {
    var sup = document.createElement('sup');
    sup.innerHTML = '(' + filterContent[i] + ')';
    sup.classList.add('reviewsNumber');
    filterLabels[i].appendChild(sup);
  }

  for (i = 0; i < filterContent.length; i++) {
    if (!filterContent[i]) {
      filterLabels[i].classList.add('disabled-label');
    }
  }
};

module.exports = {
  validateFilters: validateFilters,
  ReviewsFiltered: ReviewsFiltered
};
