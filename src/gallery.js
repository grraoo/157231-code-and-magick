'use strict';

var Gallery = function() {

  var self = this;

  this.photogallery = document.querySelector('.photogallery');
  this.photos = this.photogallery.querySelectorAll('img');
  this.galleryViewport = document.querySelector('.overlay-gallery');
  this.currentPhoto = this.galleryViewport.querySelector('.overlay-gallery-preview');
  this.currentPhotoNumber = this.galleryViewport.querySelector('.preview-number-current');
  this.photoNumberTotal = this.galleryViewport.querySelector('.preview-number-total');
  this.galleryToClose = this.galleryViewport.querySelector('.overlay-gallery-close');
  this.galleryControls = this.galleryViewport.querySelectorAll('.overlay-gallery-control');
  this.photosArray = [];
  this.photoSrcs = [];
  this.currentPhotoIndex = 0;

  var hashValues = [
    '#photo/img/screenshots/1.png',
    '#photo/img/screenshots/2.png',
    '#photo/img/screenshots/3.png',
    '#photo/img/screenshots/4.png',
    '#photo/img/screenshots/5.png',
    '#photo/img/screenshots/6.png'
  ];


  this.photoNumberTotal.innerHTML = this.photos.length;

  for(var i = 0; i < this.photos.length; i++) {
    this.photoSrcs[i] = this.photos[i].src;
  }

  this.loadCounter = 0;

  this.showByHash = function() {
    if(window.location.hash.match(/#photo\/(\S+)/)) {
      self.showGallery(window.location.hash);
    }
  };

  this.savePhotos = function(pics) {
    for(i = 0; i < pics.length; i++) {
      self.photosArray[i] = new Image();
      self.photosArray[i].src = pics[i];
      self.photosArray[i].onload = function() {
        self.loadCounter++;
        if(self.loadCounter === 6) {
          window.addEventListener('hashchange', self.showByHash);
          window.onload = self.showByHash;
        }
        self.photos[self.photosArray.indexOf(this)].addEventListener('click', function(evt) {
          evt.preventDefault();
          self.currentPhotoIndex = pics.indexOf(this.src);
          window.location.hash = hashValues[self.currentPhotoIndex];
        });
      };
    }
  };

  this.savePhotos(self.photoSrcs);

  this.showPrevPhoto = function() {
    if(self.currentPhotoIndex === 0) {
      self.currentPhotoIndex = self.photos.length;
    }
    window.location.hash = hashValues[self.currentPhotoIndex - 1];
    self.currentPhotoIndex--;
  };

  this.showNextPhoto = function() {
    if(self.currentPhotoIndex === self.photos.length - 1) {
      self.currentPhotoIndex = -1;
    }
    window.location.hash = hashValues[self.currentPhotoIndex + 1];
    self.currentPhotoIndex++;
  };

  this._onDocumentKeyDown = function(evt) {
    if(evt.keyCode === 27) {
      self.closeGallery();
    }
  };

  this.showGallery = function(photoId) {

    if(typeof photoId === 'string') {
      photoId = hashValues.indexOf(photoId);
    }

    window.location.hash = hashValues[photoId];

    self.galleryViewport.classList.remove('invisible');
    if(self.currentPhoto.querySelector('img')) {
      self.currentPhoto.replaceChild(self.photosArray[photoId], self.currentPhoto.querySelector('img'));
    } else {
      self.currentPhoto.appendChild(self.photosArray[photoId]);
    }
    self.currentPhotoNumber.innerHTML = photoId + 1;
    self.galleryControls[0].addEventListener('click', self.showPrevPhoto);
    self.galleryControls[1].addEventListener('click', self.showNextPhoto);
    document.addEventListener('keydown', self._onDocumentKeyDown);
    self.galleryToClose.addEventListener('click', self.closeGallery);
  };

  this.closeGallery = function() {
    window.location.hash = '';
    self.galleryViewport.classList.add('invisible');
    if(self.currentPhoto.querySelector('img')) {
      self.currentPhoto.removeChild(self.currentPhoto.querySelector('img'));
    }
    self.galleryControls[0].removeEventListener('click', self.showPrevPhoto);
    self.galleryControls[1].removeEventListener('click', self.showNextPhoto);
    self.galleryToClose.removeEventListener('click', self.closeGallery);
    document.removeEventListener('keypress', self._onDocumentKeyDown);
  };

};
module.exports = new Gallery();
