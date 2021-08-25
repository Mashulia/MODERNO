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

  $(".js-range-slider").ionRangeSlider({
    type: "double",
    min: 0,
    max: 1200,
    from: 0,
    to: 600,
    prefix: "$"
  });

  $('.icon-th-list').on('click', function () {
    $('.products__inner-box .product__item').addClass('list');
    $('.icon-th-list').addClass('active');
    $('.icon-th-large').removeClass('active');

  });

  $('.icon-th-large').on('click', function () {
    $('.products__inner-box .product__item').removeClass('list');
    $('.icon-th-large').addClass('active');
    $('.icon-th-list').removeClass('active');
  });

  $('.header__burger').on('click', function () {
    $('.menu').slideToggle('active');
  });

  $('.header__btn-menu').on('click', function () {
    $('.header__box').toggleClass('active');
  });

  $('.product__tabs .tab').on('click', function (evt) {
    var id = $(this).attr('data-id');
    $('.product__tabs').find('.tab__item').removeClass('active-tab').hide();
    $('.product__tabs .tab').find('.tab').removeClass('active');
    $(this).addClass('active');
    $('#' + id).addClass('active-tab').fadeIn();
    return false;
  });

  var mixer = mixitup('.products__inner-box');
});