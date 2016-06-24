'use strict';

var photogallery = document.querySelector('.photogallery');
var photos = photogallery.querySelectorAll('img');
var photoArr = [];
var currentPhoto = document.querySelector('.overlay-gallery-preview');
var currentPhotoNumber = document.querySelector('.preview-number-current');
var photoNumberTotal = document.querySelector('.preview-number-total');

var galleryViewport = document.querySelector('.overlay-gallery');
var galleryToClose = galleryViewport.querySelector('.overlay-gallery-close');
var photosArray = new Array(photos.length);

for(var i = 0; i < photos.length; i++) {
  photosArray[i] = new Image();
  photosArray[i].src = photos[i].src;
}

for(i = 0; i < photos.length; i++) {
  photoArr[i] = photos[i];
  photos[i].addEventListener('click', function(evt) {
    evt.preventDefault();
    galleryViewport.classList.remove('invisible');
    currentPhoto.appendChild(photosArray[photoArr.indexOf(this)]);
    currentPhotoNumber.innerHTML = photoArr.indexOf(this) + 1;
    photoNumberTotal.innerHTML = photos.length;
  });
}

var closeGallery = function() {
  galleryViewport.classList.add('invisible');
  var photoCurrent = currentPhoto.querySelector('img');
  currentPhoto.removeChild(photoCurrent);
};

galleryToClose.addEventListener('click', closeGallery);

window.addEventListener('keypress', function(evt) {
  if(evt.keyCode === 27) {
    closeGallery();
  }
});
