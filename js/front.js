$(function() {
  $(".shop-detail-carousel").owlCarousel({
    items: 1,
    thumbs: true,
    nav: false,
    dots: false,
    loop: true,
    autoplay: true,
    thumbsPrerendered: true
  });

  $("#main-slider").owlCarousel({
    items: 1,
    nav: false,
    dots: true,
    autoplay: true,
    autoplayHoverPause: true,
    dotsSpeed: 400
  });

  $("#get-inspired").owlCarousel({
    items: 1,
    nav: false,
    dots: true,
    autoplay: true,
    autoplayHoverPause: true,
    dotsSpeed: 400
  });

  $(".product-slider").owlCarousel({
    items: 1,
    dots: true,
    nav: false,
    responsive: {
      480: {
        items: 1
      },
      765: {
        items: 2
      },
      991: {
        items: 3
      },
      1200: {
        items: 5
      }
    }
  });

  // productDetailGallery(4000);
  utils();

  // ------------------------------------------------------ //
  // For demo purposes, can be deleted
  // ------------------------------------------------------ //

  var stylesheet = $("link#theme-stylesheet");
  $("<link id='new-stylesheet' rel='stylesheet'>").insertAfter(stylesheet);
  var alternateColour = $("link#new-stylesheet");

  if ($.cookie("theme_csspath")) {
    alternateColour.attr("href", $.cookie("theme_csspath"));
  }

  $("#colour").change(function() {
    if ($(this).val() !== "") {
      var theme_csspath = "css/style." + $(this).val() + ".css";

      alternateColour.attr("href", theme_csspath);

      $.cookie("theme_csspath", theme_csspath, {
        expires: 365,
        path: document.URL.substr(0, document.URL.lastIndexOf("/"))
      });
    }

    return false;
  });
});

$(window).on("load", function() {
  $(this).alignElementsSameHeight();
});

$(window).resize(function() {
  setTimeout(function() {
    $(this).alignElementsSameHeight();
  }, 150);
});

/* product detail gallery */

// function productDetailGallery(confDetailSwitch) {
//     $('.thumb:first').addClass('active');
//     timer = setInterval(autoSwitch, confDetailSwitch);
//     $(".thumb").click(function(e) {
//
// 	switchImage($(this));
// 	clearInterval(timer);
// 	timer = setInterval(autoSwitch, confDetailSwitch);
// 	e.preventDefault();
//     }
//     );
//     $('#mainImage').hover(function() {
// 	clearInterval(timer);
//     }, function() {
// 	timer = setInterval(autoSwitch, confDetailSwitch);
//     });
//
//     function autoSwitch() {
// 	var nextThumb = $('.thumb.active').closest('div').next('div').find('.thumb');
// 	if (nextThumb.length == 0) {
// 	    nextThumb = $('.thumb:first');
// 	}
// 	switchImage(nextThumb);
//     }
//
//     function switchImage(thumb) {
//
// 	$('.thumb').removeClass('active');
// 	var bigUrl = thumb.attr('href');
// 	thumb.addClass('active');
// 	$('#mainImage img').attr('src', bigUrl);
//     }
// }

function utils() {
  /* click on the box activates the radio */

  $("#checkout").on(
    "click",
    ".box.shipping-method, .box.payment-method",
    function(e) {
      var radio = $(this).find(":radio");
      radio.prop("checked", true);
    }
  );
  /* click on the box activates the link in it */

  $(".box.clickable").on("click", function(e) {
    window.location = $(this)
      .find("a")
      .attr("href");
  });
  /* external links in new window*/

  $(".external").on("click", function(e) {
    e.preventDefault();
    window.open($(this).attr("href"));
  });
  /* animated scrolling */

  $(".scroll-to, .scroll-to-top").click(function(event) {
    var full_url = this.href;
    var parts = full_url.split("#");
    if (parts.length > 1) {
      scrollTo(full_url);
      event.preventDefault();
    }
  });

  function scrollTo(full_url) {
    var parts = full_url.split("#");
    var trgt = parts[1];
    var target_offset = $("#" + trgt).offset();
    var target_top = target_offset.top - 100;
    if (target_top < 0) {
      target_top = 0;
    }

    $("html, body").animate(
      {
        scrollTop: target_top
      },
      1000
    );
  }
}

$.fn.alignElementsSameHeight = function() {
  $(".same-height-row").each(function() {
    var maxHeight = 0;

    var children = $(this).find(".same-height");

    children.height("auto");

    if ($(document).width() > 768) {
      children.each(function() {
        if ($(this).innerHeight() > maxHeight) {
          maxHeight = $(this).innerHeight();
        }
      });

      children.innerHeight(maxHeight);
    }

    maxHeight = 0;
    children = $(this).find(".same-height-always");

    children.height("auto");

    children.each(function() {
      if ($(this).innerHeight() > maxHeight) {
        maxHeight = $(this).innerHeight();
      }
    });

    children.innerHeight(maxHeight);
  });
};

// my code - exercises
// product page has pathname /detail.html

// when user reaches the product page, trigger a view:productPage event
// when window.location.pathname = '/detail.html', trigger view:
$(document).trigger("view:productPage");

// when user reaches the product page, inspect the breadcrumb element (which category in category in category the user is in)
// if breadcrumbs include "male", trigger customer:Male
// if breadcrumbs include "female", trigger customer:Female
// if breadcrumbs include "{product subcategory}", trigger view:{product subcategory}

// when user reaches the /checkout4.html page, trigger "conversion" event WHEN user clicks on "Place an Order" btn

// in "conversion" event, put extra object parameter {name, qualtity, unit price} of each purchased product

/* if pathname is /index.html, trigger view:HomePage event */

if (
  window.location.pathname === "/" ||
  window.location.pathname === "/index.html"
) {
  $(document).trigger("view:HomePage");
  console.log("User on home page");
}

if (window.location.pathname === "/detail.html") {
  $(document).trigger("view:ProductPage");
  console.log("User on product page");
}

if (window.location.pathname === "/basket.html") {
  $(document).trigger("view:Basket");
  console.log("User on basket page");
}

if (window.location.pathname === "/checkout1.html") {
  $(document).trigger("view:Checkout");
  console.log("User on checkout page");
}

if (window.location.pathname === "/checkout2.html") {
  $(document).trigger("view:Delivery");
  console.log("User on delivery page");
}

if (window.location.pathname === "/checkout3.html") {
  $(document).trigger("view:Payment");
  console.log("User on payment page");
}

if (window.location.pathname === "/checkout4.html") {
  console.log("User on order review page");
}

$(".box-footer [type='submit']").click(function() {
  $(document).trigger("conversion");
  console.log("user clicked the place an order button");
});
