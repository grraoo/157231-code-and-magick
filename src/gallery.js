'use strict';

var Gallery = function() {

  var that = this;

  this.photogallery = document.querySelector('.photogallery');
  this.photos = this.photogallery.querySelectorAll('img');
  this.galleryViewport = document.querySelector('.overlay-gallery');
  this.currentPhoto = that.galleryViewport.querySelector('.overlay-gallery-preview');
  this.currentPhotoNumber = that.galleryViewport.querySelector('.preview-number-current');
  this.photoNumberTotal = that.galleryViewport.querySelector('.preview-number-total');
  this.galleryToClose = that.galleryViewport.querySelector('.overlay-gallery-close');
  this.galleryControls = that.galleryViewport.querySelectorAll('.overlay-gallery-control');
  this.photosArray = [];
  this.photoSrcs = [];
  this.currentPhotoIndex = 0;

  this.photoNumberTotal.innerHTML = this.photos.length;

  for(var i = 0; i < that.photos.length; i++) {
    that.photoSrcs[i] = that.photos[i].src;
  }

  this.savePhotos = function(pics) {
    for(i = 0; i < pics.length; i++) {
      that.photosArray[i] = new Image();
      that.photosArray[i].src = pics[i];
      that.photosArray[i].onload = function() {
        that.photos[that.photosArray.indexOf(this)].addEventListener('click', function(evt) {
          evt.preventDefault();
          that.currentPhotoIndex = pics.indexOf(this.src);
          that.showGallery(that.currentPhotoIndex);
        });
      };
    }
  };

  this.savePhotos(that.photoSrcs);

  this.showPrevPhoto = function() {
    if(that.currentPhotoIndex === 0) {
      that.currentPhotoIndex = that.photos.length;
    }
    that.showGallery(that.currentPhotoIndex - 1);
    that.currentPhotoIndex--;
  };

  this.showNextPhoto = function() {
    if(that.currentPhotoIndex === that.photos.length - 1) {
      that.currentPhotoIndex = -1;
    }
    that.showGallery(that.currentPhotoIndex + 1);
    that.currentPhotoIndex++;
  };

  this._onDocumentKeyDown = function(evt) {
    if(evt.keyCode === 27) {
      that.closeGallery();
    }
  };

  this.showGallery = function(index) {
    that.closeGallery();
    that.galleryViewport.classList.remove('invisible');
    if(that.currentPhoto.querySelector('img')) {
      that.currentPhoto.replaceChild(that.photosArray[index], that.currentPhoto.querySelector('img'));
    } else {
      that.currentPhoto.appendChild(that.photosArray[index]);
    }
    that.currentPhotoNumber.innerHTML = index + 1;
    that.galleryControls[0].addEventListener('click', that.showPrevPhoto);
    that.galleryControls[1].addEventListener('click', that.showNextPhoto);
    document.addEventListener('keydown', that._onDocumentKeyDown);
    that.galleryToClose.addEventListener('click', that.closeGallery);
  };

  this.closeGallery = function() {
    that.galleryViewport.classList.add('invisible');
    if(that.currentPhoto.querySelector('img')) {
      that.currentPhoto.removeChild(that.currentPhoto.querySelector('img'));
    }
    that.galleryControls[0].removeEventListener('click', that.showPrevPhoto);
    that.galleryControls[1].removeEventListener('click', that.showNextPhoto);
    that.galleryToClose.removeEventListener('click', that.closeGallery);
    document.removeEventListener('keypress', that._onDocumentKeyDown);
  };
};

module.exports = new Gallery();
