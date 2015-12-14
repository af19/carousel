// $("img").on("swipe",function(){
//   $(this).hide();
// });
$(document).ready(function() {

  // Image collection.
  var carouselImages = [
    "src/img/img1.jpg",

  ];

  var totalCarouselImages = carouselImages.length;

  /**
  * Images are added to the carousel here.
  * Three images (active, right and left) are added, relative to the index of   * the currently active image.
  *
  * @param {Integer} activeImgIndex
  * @return {String} imgElements
  */
  function carouselInnerHTML(activeImgIndex) {

    var imgActiveSrc = carouselImages[activeImgIndex];
    var imgRightSrc;
    var imgLeftSrc;
    var imgElements;

    // If at start, set the last image in the collection as the left image.
    if (activeImgIndex === 0) {
      imgLeftSrc = carouselImages[totalCarouselImages - 1];
    } else {
      imgLeftSrc = carouselImages[activeImgIndex - 1];
    }

    // If at end, set the first image in the collection as the right image.
    if (activeImgIndex === totalCarouselImages - 1) {
      imgRightSrc = carouselImages[0];
    } else {
      imgRightSrc = carouselImages[activeImgIndex + 1];
    }

    imgElements = '<img src="' + imgLeftSrc + '" class="img-left">';
    imgElements += '<img src="' + imgActiveSrc + '" class="img-active"';
    imgElements += 'data-active-index="' + activeImgIndex + '">'
    imgElements += '<img src="' + imgRightSrc + '" class="img-right">';

    return imgElements;
  }

  // Start carousel on page load.
  $('.carousel').html( carouselInnerHTML(0) );

  function nextThree(advanceDirection) {

    var currentActiveIndex = $('.img-active').data('active-index');
    var nextIndex;

    if (advanceDirection === 'right') {
      nextIndex = currentActiveIndex === totalCarouselImages - 1 ? 0 : currentActiveIndex + 1;
    }

    if (advanceDirection === 'left') {
      nextIndex = currentActiveIndex === 0 ? totalCarouselImages - 1 : currentActiveIndex - 1;
    }

    return nextIndex;
  }

  function advanceRight() {
    $('.advance-right').unbind('click');
    $('.img-active').addClass('slide-out-left');
    $('.img-right').addClass('slide-in-left');

    $('.slide-out-left').on('animationend', function() {
      $('.carousel').html( carouselInnerHTML( nextThree('right') ) );
      $('.advance-right').bind('click', advanceRight);
    });
  }

  function advanceLeft() {
    $('.advance-left').unbind('click');
    $('.img-active').addClass('slide-out-right');
    $('.img-left').addClass('slide-in-right');

    $('.slide-out-right').on('animationend', function() {
      $('.carousel').html( carouselInnerHTML( nextThree('left') ) );
      $('.advance-left').bind('click', advanceLeft);
    });
  }

  $('.advance-right').bind('click', advanceRight);
  $('.advance-left').bind('click', advanceLeft);


});
