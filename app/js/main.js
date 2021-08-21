$(function () {
  $('.rate-star').rateYo({
    rating: 5,
    starWidth: '12px',
    readOnly: true,
    ratedFill: '#ffa726'
  });

  $('.product-slider__inner').slick({
    dots: true,
    arrows: false,
    slidesToShow: 4,
    slidesToScroll: 2
  });

  var mixer = mixitup('.products__inner-box');
});