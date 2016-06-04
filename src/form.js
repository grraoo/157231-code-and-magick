'use strict';

(function() {
  var formContainer = document.querySelector('.overlay-container');
  var formOpenButton = document.querySelector('.reviews-controls-new');
  var formCloseButton = document.querySelector('.review-form-close');

  formOpenButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.remove('invisible');
  };

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.add('invisible');
  };
})();

var reviewMarks = document.querySelectorAll('input[name="review-mark"]');
var reviewFieldsLabel = document.querySelectorAll('.review-fields-label');
var reviewFields = document.querySelector('.review-fields');
var currentReviewMark = document.querySelector('input[name="review-mark"]:checked');
var reviewInput = [document.querySelector('#review-name'), document.querySelector('#review-text')];
var reviewSubmit = document.querySelector('.review-submit');


var noNeedName = function() {

  return (reviewInput[0].value !== '');
};

var noNeedText = function() {

  if (reviewInput[1].hasAttribute('required')) {

    return (reviewInput[1].value !== '');
  }

  return true;
};

var showHideReviewFields = function() {

  if (noNeedName() && noNeedText()) {
    reviewFields.classList.add('invisible');
    reviewSubmit.removeAttribute('disabled');
  } else {
    reviewFields.classList.remove('invisible');
    reviewSubmit.setAttribute('disabled', 'disabled');
  }
};

for (var i = 0; i < 5; i++) {
  reviewMarks[i].onchange = function() {
    currentReviewMark = document.querySelector('input[name="review-mark"]:checked');

    if (currentReviewMark.value < 3) {
      reviewInput[1].setAttribute('required', 'required');
      reviewFieldsLabel[1].classList.remove('invisible');
      reviewFields.classList.remove('invisible');
      showHideLabels();
    } else {
      reviewInput[1].removeAttribute('required');
      reviewFieldsLabel[1].classList.add('invisible');
      showHideReviewFields();
    }

    if (!noNeedName()) {
      reviewFields.classList.remove('invisible');
      reviewFieldsLabel[0].classList.remove('invisible');
    } else {
      reviewFieldsLabel[0].classList.add('invisible');
      showHideReviewFields();
    }
  };
}

if (currentReviewMark.value > 2) {
  reviewInput[1].removeAttribute('required');
  reviewFieldsLabel[1].classList.add('invisible');
  showHideReviewFields();
} else {
  reviewInput[1].setAttribute('required', 'required');
  reviewFieldsLabel[1].classList.remove('invisible');
  showHideReviewFields();
}

var showHideLabels = function() {

  if (!noNeedName()) {
    reviewFields.classList.remove('invisible');
    reviewFieldsLabel[0].classList.remove('invisible');
  } else {
    reviewFieldsLabel[0].classList.add('invisible');
    showHideReviewFields();
  }

  if (!noNeedText()) {
    reviewFields.classList.remove('invisible');
    reviewFieldsLabel[1].classList.remove('invisible');
  } else {
    reviewFieldsLabel[1].classList.add('invisible');
    showHideReviewFields();
  }
};

showHideLabels();

for (i = 0; i < 2; i++) {
  reviewInput[i].oninput = showHideLabels;
}
