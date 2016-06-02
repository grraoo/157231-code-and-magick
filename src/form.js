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
var reviewText = document.querySelector('#review-text');

for (var i = 0; i < 5; i++) {
  reviewMarks[i].onchange = function() {
    var currentReviewMark = document.querySelector('input[name="review-mark"]:checked');
    if (currentReviewMark.value < 3) {
      reviewText.setAttribute('required', 'required');
    } else {
      reviewText.removeAttribute('required');
    }
  };
}
