'use strict';

var photogallery = document.querySelector('.photogallery');
var photos = photogallery.querySelectorAll('img');
var galleryViewport = document.querySelector('.overlay-gallery');
var currentPhoto = galleryViewport.querySelector('.overlay-gallery-preview');
var currentPhotoNumber = galleryViewport.querySelector('.preview-number-current');
var photoNumberTotal = galleryViewport.querySelector('.preview-number-total');
var galleryToClose = galleryViewport.querySelector('.overlay-gallery-close');
var galleryControls = galleryViewport.querySelectorAll('.overlay-gallery-control');
var photosArray = [];
var photoSrcs = [];
var currentPhotoIndex;

photoNumberTotal.innerHTML = photos.length;

for(var i = 0; i < photos.length; i++) {
  photoSrcs[i] = photos[i].src;
}

var savePhotos = function(pics) {
  for(i = 0; i < pics.length; i++) {
    photosArray[i] = new Image();
    photosArray[i].src = pics[i];
    photosArray[i].onload = function() {
      photos[photosArray.indexOf(this)].addEventListener('click', function(evt) {
        showGallery();
        evt.preventDefault();
        currentPhotoIndex = pics.indexOf(this.src);
        currentPhoto.appendChild(photosArray[currentPhotoIndex]);
        currentPhotoNumber.innerHTML = currentPhotoIndex + 1;
      });
    };
  }
};

savePhotos(photoSrcs);

var showPrevPhoto = function() {
  if(currentPhotoIndex === 0) {
    currentPhotoIndex = 6;
  }
  var photoCurrent = currentPhoto.querySelector('img');
  currentPhoto.replaceChild(photosArray[currentPhotoIndex - 1], photoCurrent);
  currentPhotoIndex--;
  currentPhotoNumber.innerHTML = currentPhotoIndex + 1;
};

var showNextPhoto = function() {
  if(currentPhotoIndex === 5) {
    currentPhotoIndex = -1;
  }
  var photoCurrent = currentPhoto.querySelector('img');
  currentPhoto.replaceChild(photosArray[currentPhotoIndex + 1], photoCurrent);
  currentPhotoIndex++;
  currentPhotoNumber.innerHTML = currentPhotoIndex + 1;
};

var _onDocumentKeyDown = function(evt) {
  if(evt.keyCode === 27) {
    closeGallery();
  }
};

var showGallery = function() {
  galleryViewport.classList.remove('invisible');
  galleryControls[0].addEventListener('click', showPrevPhoto);
  galleryControls[1].addEventListener('click', showNextPhoto);
  window.addEventListener('keypress', _onDocumentKeyDown);
  galleryToClose.addEventListener('click', closeGallery);
};

var closeGallery = function() {
  galleryViewport.classList.add('invisible');
  var photoCurrent = currentPhoto.querySelector('img');
  currentPhoto.removeChild(photoCurrent);
  galleryControls[0].removeEventListener('click', showPrevPhoto);
  galleryControls[1].removeEventListener('click', showNextPhoto);
  window.removeEventListener('keypress', _onDocumentKeyDown);
  galleryToClose.removeEventListener('click', closeGallery);
};

module.exports = {
  showGallery: showGallery,
  savePhotos: savePhotos
};
