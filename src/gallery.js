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
        evt.preventDefault();
        currentPhotoIndex = pics.indexOf(this.src);
        showGallery(currentPhotoIndex);
      });
    };
  }
};

savePhotos(photoSrcs);

var showPrevPhoto = function() {
  if(currentPhotoIndex === 0) {
    currentPhotoIndex = 6;
  }
  showGallery(currentPhotoIndex - 1);
  currentPhotoIndex--;
};

var showNextPhoto = function() {
  if(currentPhotoIndex === 5) {
    currentPhotoIndex = -1;
  }
  showGallery(currentPhotoIndex + 1);
  currentPhotoIndex++;
};

var _onDocumentKeyDown = function(evt) {
  if(evt.keyCode === 27) {
    closeGallery();
  }
};

var showGallery = function(index) {
  closeGallery();
  galleryViewport.classList.remove('invisible');
  if(currentPhoto.querySelector('img')) {
    currentPhoto.replaceChild(photosArray[index], currentPhoto.querySelector('img'));
  } else {
    currentPhoto.appendChild(photosArray[index]);
  }
  currentPhotoNumber.innerHTML = index + 1;
  galleryControls[0].addEventListener('click', showPrevPhoto);
  galleryControls[1].addEventListener('click', showNextPhoto);
  document.addEventListener('keydown', _onDocumentKeyDown);
  galleryToClose.addEventListener('click', closeGallery);
};

var closeGallery = function() {
  galleryViewport.classList.add('invisible');
  if(currentPhoto.querySelector('img')) {
    currentPhoto.removeChild(currentPhoto.querySelector('img'));
  }
  galleryControls[0].removeEventListener('click', showPrevPhoto);
  galleryControls[1].removeEventListener('click', showNextPhoto);
  galleryToClose.removeEventListener('click', closeGallery);
  document.removeEventListener('keypress', _onDocumentKeyDown);
};

module.exports = {
  showGallery: showGallery,
  savePhotos: savePhotos
};
