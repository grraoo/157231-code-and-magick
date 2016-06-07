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

var form = document.querySelector('.review-form');
var reviewMarks = document.querySelectorAll('input[name="review-mark"]');
var reviewFieldsLabel = document.querySelectorAll('.review-fields-label');
var reviewFields = document.querySelector('.review-fields');
var currentReviewMark;
var reviewInput = [document.querySelector('#review-name'), document.querySelector('#review-text')];
var reviewSubmit = document.querySelector('.review-submit');
var validationMessageBox = document.querySelectorAll('.validation-message');

var cookies = require('browser-cookies');
var MS_IN_DAY = 60 * 60 * 24 * 1000;
var BIRTH_DAY_NUMBER = 271 * MS_IN_DAY;
var TIME_AFTER_BIRTHDAY = 94 * MS_IN_DAY;
var dayNumberMs;
var cookiesLiveTime;
var date = new Date();
var expDate;

form.onsubmit = function() {
  dayNumberMs = (date % (365.25 * MS_IN_DAY));
  if (dayNumberMs < BIRTH_DAY_NUMBER) {
    cookiesLiveTime = dayNumberMs + TIME_AFTER_BIRTHDAY;
  } else {
    cookiesLiveTime = dayNumberMs - BIRTH_DAY_NUMBER;
  }
  expDate = new Date(+date + cookiesLiveTime);
  cookies.set('username', reviewInput[0].value, {expires: expDate});
};

reviewInput[0].value = cookies.get('username');

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

var showHideLabels = function() {
  for (i = 0; i < 2; i++) {
    if (noNeedToFill()[i]) {
      reviewFieldsLabel[i].classList.add('invisible');
      validationMessageBox[i].innerHTML = '';
    } else {
      reviewFieldsLabel[i].classList.remove('invisible');
      validationMessageBox[i].innerHTML = reviewInput[i].validationMessage;
    }
    allowForbidSubmit();
  }
};

var setRequiredText = function() {
  currentReviewMark = document.querySelector('input[name="review-mark"]:checked');

  if (currentReviewMark.value > 2) {
    reviewInput[1].removeAttribute('required');
  } else {
    reviewInput[1].setAttribute('required', 'required');
  }
  showHideLabels();
};

setRequiredText();

for (var i = 0; i < 5; i++) {
  reviewMarks[i].onchange = setRequiredText;
}

for (i = 0; i < 2; i++) {
  reviewInput[i].oninput = showHideLabels;
}
