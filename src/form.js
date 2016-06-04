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
var validationMessages = document.querySelectorAll('.validation-message');


var noNeedName = function() {

  return reviewInput[0].validity.valid;
};

var noNeedText = function() {

  return reviewInput[1].validity.valid;
};

var noNeedToFill = function() {

  return [noNeedName(), noNeedText()];
};

var allowForbidSubmit = function() {

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
      validationMessages[1].classList.remove('invisible');
      reviewFields.classList.remove('invisible');
      showHideLabels();
    } else {
      reviewInput[1].removeAttribute('required');
      reviewFieldsLabel[1].classList.add('invisible');
      validationMessages[1].classList.add('invisible');
      allowForbidSubmit();
    }

    if (noNeedName()) {
      reviewFieldsLabel[0].classList.add('invisible');
      validationMessages[0].classList.add('invisible');
      allowForbidSubmit();
    } else {
      reviewFields.classList.remove('invisible');
      reviewFieldsLabel[0].classList.remove('invisible');
      validationMessages[0].classList.remove('invisible');
    }
  };
}

if (currentReviewMark.value > 2) {
  reviewInput[1].removeAttribute('required');
  reviewFieldsLabel[1].classList.add('invisible');
  validationMessages[1].classList.add('invisible');
  allowForbidSubmit();
} else {
  reviewInput[1].setAttribute('required', 'required');
  reviewFieldsLabel[1].classList.remove('invisible');
  validationMessages[1].classList.remove('invisible');
  allowForbidSubmit();
}

var showHideLabels = function() {

  for (i = 0; i < 2; i++) {

    if (noNeedToFill()[i]) {
      reviewFieldsLabel[i].classList.add('invisible');
      validationMessages[i].classList.add('invisible');
      allowForbidSubmit();
    } else {
      reviewFields.classList.remove('invisible');
      reviewFieldsLabel[i].classList.remove('invisible');
      validationMessages[i].classList.remove('invisible');
    }
  }
};

showHideLabels();

for (i = 0; i < 2; i++) {
  reviewInput[i].oninput = showHideLabels;
}
