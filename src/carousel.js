// $("img").on("swipe",function(){
//   $(this).hide();
// });
$(document).ready(function() {

  var carouselImages = [
    "src/img/img1.jpg",
    "src/img/img2.jpg",
    "src/img/img3.jpg",
    "src/img/img4.jpg",
    "src/img/img5.jpg"
  ];

  var totalCarouselImages = carouselImages.length;

  function carouselInnerHTML(activeImgIndex) {

    var imgActiveSrc = carouselImages[activeImgIndex];
    var imgRightSrc;
    var imgLeftSrc;
    var imgElements;

    if (activeImgIndex === 0) {
      imgLeftSrc = carouselImages[totalCarouselImages - 1];
    } else {
      imgLeftSrc = carouselImages[activeImgIndex - 1];
    }

    if (activeImgIndex === totalCarouselImages - 1) {
      imgRightSrc = carouselImages[0];
      nextIndex = 0;
    } else {
      imgRightSrc = carouselImages[activeImgIndex + 1];
      nextIndex = activeImgIndex + 1;
    }

    imgElements = '<img src="' + imgLeftSrc + '" class="img-left">';
    imgElements += '<img src="' + imgActiveSrc + '" class="img-active">';
    // imgElements += 'data-next-index-right="' + nextIndexRight + '"data-next-index-left="' + nextIndexLeft + '">'
    imgElements += '<img src="' + imgRightSrc + '" class="img-right">';

    return imgElements;

  }

  $('.carousel').html( carouselInnerHTML(0) );

var nextIndex;

  function advanceRight() {
    $('.advance-right').unbind('click');
    $('.img-active').addClass('slide-out-left');
    $('.img-right').addClass('slide-in-left');

    $('.slide-out-left').on('animationend', function() {
      $('.carousel').html( carouselInnerHTML(nextIndex) );
      $('.advance-right').bind('click', advanceRight);
    });


  }
  $('.advance-right').bind('click', advanceRight);

  $('.advance-left').click(function() {
    $('.img-active').addClass('slide-out-right');
    $('.img-left').addClass('slide-in-right');


    $('.slide-out-left').on('animationend', function() {
      $('.carousel').html( carouselInnerHTML(nextIndex) );
    });
  });

});
