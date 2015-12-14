// $("img").on("swipe",function(){
//   $(this).hide();
// });
$(document).ready(function() {

  // Image collection.
  var carouselImages = [
    "src/img/img1.jpg",
    "src/img/img2.jpg",
    "src/img/img3.jpg",
    "src/img/img4.jpg",
    "src/img/img5.jpg"
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

    /** If at start, set the last image in the collection as the left/previous  * image.
    */
    if (activeImgIndex === 0) {
      imgLeftSrc = carouselImages[totalCarouselImages - 1];
    } else {
      imgLeftSrc = carouselImages[activeImgIndex - 1];
    }

    // If at end, set the first image in the collection as the right/next image.
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
  $('.carousel-images').html( carouselInnerHTML(0) );


  function carouselIndicators() {
    var indicatorDots = '';
    for (var i = 0; i < totalCarouselImages; i++) {
      indicatorDots += '<div></div>';
    }
    return indicatorDots;
  }

  // Add carousel indicators.
  $('.carousel-indicators').html( carouselIndicators() );
  $('.carousel-indicators > div').eq(0).addClass('active');

  /**
  * Depending on advance direction, get index for generating the next set of    * three images. And change color of indicators.
  *
  * @param {String} advanceDirection
  * @return {Integer} nextIndex
  */
  function nextThree(advanceDirection) {

    var currentActiveIndex = $('.img-active').data('active-index');
    var nextIndex;

    if (advanceDirection === 'right') {
      nextIndex = currentActiveIndex === totalCarouselImages - 1 ? 0 : currentActiveIndex + 1;
    }

    if (advanceDirection === 'left') {
      nextIndex = currentActiveIndex === 0 ? totalCarouselImages - 1 : currentActiveIndex - 1;
    }

    $('.carousel-indicators > div').eq(currentActiveIndex).removeClass('active');
    $('.carousel-indicators > div').eq(nextIndex).addClass('active');

    return nextIndex;
  }

  // Advancing slides right.
  function advanceRight() {
    $('.advance-right').unbind('click');
    $('.img-active').addClass('slide-out-left');
    $('.img-right').addClass('slide-in-left');

    // Wait for CSS animation to end, before getting new images.
    var updateCarousel = nextThree('right');
    $('.slide-out-left').on('animationend', function() {
      $('.carousel-images').html( carouselInnerHTML( updateCarousel ) );
      $('.advance-right').bind('click', advanceRight);
    });
  }

  // Advance Left.
  function advanceLeft() {
    $('.advance-left').unbind('click');
    $('.img-active').addClass('slide-out-right');
    $('.img-left').addClass('slide-in-right');

    var updateCarousel = nextThree('left');
    $('.slide-out-right').on('animationend', function() {
      $('.carousel-images').html( carouselInnerHTML( updateCarousel ) );
      $('.advance-left').bind('click', advanceLeft);
    });
  }

  $('.advance-right').bind('click', advanceRight);
  $('.advance-left').bind('click', advanceLeft);


  $('.carousel-indicators > div').click(function() {
    $('.carousel-indicators').find('.active').removeClass();
    $(this).addClass('active');
    $('.carousel-images').html( carouselInnerHTML( $(this).index() ));
  });

  var autoAdvance = setInterval(advanceRight, 3000);

  $('.carousel-container').hover(
    function() {
      clearInterval(autoAdvance);
    }, function() {
      autoAdvance = setInterval(advanceRight, 3000);
  }
);

});
