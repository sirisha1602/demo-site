jQuery(function($) {
  "use strict";

// jQuery to collapse the navbar on scroll
$(window).scroll(function() {
    if ($(".navbar").offset().top > 50) {
        $(".main-nav").addClass("top-nav-collapse");
    } else {
        $(".main-nav").removeClass("top-nav-collapse");
    }
});

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').hover(function() {
    $('.navbar-toggle:visible').hover();
});


//$('ul.nav li.dropdown').hover(function() {
  //$(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn(500);
  //$(this).find('.dropdown-submenu').stop(true,true).delay(200).fadeIn(500);
//}, function() {
  //$(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut(500);
//});





 new WOW().init();


 });