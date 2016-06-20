'use strict';

var templateElement = document.querySelector('template');
var reviewsContainer = document.querySelector('.reviews-list');
var IMAGE_LOAD_TIMEOUT = 10000;
var elementToClone;

var reviewsBlock = document.querySelector('.reviews');
var reviewFilters = document.querySelector('.reviews-filter');
var FilterNames = {
  'ALL': 'reviews-all',
  'RECENT': 'reviews-recent',
  'GOOD': 'reviews-good',
  'BAD': 'reviews-bad',
  'POPULAR': 'reviews-popular'
};
var defaultLabelTExt = ['Все', 'Недавние', 'Хорошие', 'Плохие', 'Популярные'];
var filterLabels = reviewFilters.querySelectorAll('label');

var MS_IN_FOUR_DAYS = 60 * 60 * 24 * 1000 * 4;
var DEFAULT_FILTER = document.querySelector('input[name = "reviews"]:checked').id;
var REVIEWS_LOAD_URL = '//o0.github.io/assets/json/reviews.json';

var reviews = [];
var allReviews = [];
var reviewsFiltered;
var recentReviews = [];
var goodReviews = [];
var badReviews = [];
var popularReviews = [];

var reviewsMore = document.querySelector('.reviews-controls-more');
var PAGE_SIZE = 3;
var pageNumber = 0;
var isNextPageNotAvailable = function(reviewList, page, pageSize) {
  return page >= Math.ceil(reviewList.length / pageSize);
};


reviewFilters.classList.add('invisible');

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

var buildReviewList = function(reviewList, page) {

  var from = page * PAGE_SIZE;
  var to = from + PAGE_SIZE;

  reviewList.slice(from, to).forEach(function(review) {
    getReviewElement(review, reviewsContainer);
  });
  reviewFilters.classList.remove('invisible');
};

var getReviewList = function(callback) {
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
};

var showCurrentPage = function() {
  pageNumber++;
  if(isNextPageNotAvailable(reviewsFiltered, pageNumber + 1, PAGE_SIZE)) {
    reviewsMore.classList.add('invisible');
  }
  buildReviewList(reviewsFiltered, pageNumber);
};

var validateFilters = function() {
  for (var i = 0; i < filterLabels.length; i++) {
    filterLabels[i].innerHTML = defaultLabelTExt[i];
  }
  var reviewsToFilter = reviews.slice(0);
  allReviews = reviews.slice(0);
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

var getReviewsFiltered = function(filter) {
  validateFilters();
  var reviewsAll = reviews.slice(0);
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

  var currentFilter = filter;
  reviewsContainer.innerHTML = '';

  switch (currentFilter) {
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

  buildReviewList(reviewsFiltered, pageNumber);
};

var enableFilter = function(filter) {
  reviewsMore.classList.remove('invisible');
  pageNumber = 0;
  getReviewsFiltered(filter);
};

var buildFilteredReviews = function() {
  reviewsMore.classList.remove('invisible');
  getReviewList(function(data) {
    reviews = data;
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

buildFilteredReviews();
