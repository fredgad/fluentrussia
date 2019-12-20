"use strict";

$(function () {
  window.addEventListener('scroll', function () {
    if ($(window).width() < 1024) {
      var scrolled = window.pageYOffset || document.scrollTop;
      console.log('asdsad');

      if ($('#numbers').offsetTop()) {
        console.log($('#numbers').offsetTop());
      }
    }
  });
});