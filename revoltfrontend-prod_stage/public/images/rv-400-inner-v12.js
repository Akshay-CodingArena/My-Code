$(document).ready(function () {
  $(".switch-sec").on("click", function () {
    $(this).siblings(".rv-specification").find(".hiddeninfo").slideToggle();
    $(this).toggleClass("bgchange123");
    //var textValue = $(this).find("p").text();
    // if (textValue == "Expand Specification") {
    //     $(this).find("p").text("Expand Specification 123");
    // } else {
    //     $(this).find("p").text("Expand Specification");
    // }
  });

  $("#showHidden").click(function () {
    $(this).find("span").toggleClass("collapseTxt");
    $(".plusIcon").toggle();
    $(".minusIcon").toggle();
    $(this).siblings(".hide_img").book();
  });

  //RV-400 Bike gallery
  $("#rv-400-gallery").owlCarousel({
    nav: true,
    navElement: "button",
    navText: [
      '<i class="fa fa-angle-left"></i>',
      '<i class="fa fa-angle-right"></i>',
    ],
    center: true,
    loop: true,
    items: 1,
    margin: 20,
    responsive: {
      0: {
        stagePadding: 0,
      },
      768: {
        stagePadding: 150,
      },
      1024: {
        stagePadding: 300,
      },
    },
  });

  //feature sec 1
  var owlCar = $(".owl_sld_right .owl-carousel");
  owlCar.owlCarousel({
    loop: true,
    nav: true,
    mouseDrag: false,
    touchDrag: false,
    autoplayHoverPause: true,
    animateOut: "slideOutDown",
    animateIn: "slideInDown",
    dots: false,
    autoplay: false,
    margin: 0,
    nav: true,
    items: 1,
  });

  // bike Pricing section
  $(".switch input").click(function () {
    if ($(this).is(":checked")) {
      $(".billed-annually").hide();
      $(".billed-quarterly").show();
    } else {
      $(".billed-annually").show();
      $(".billed-quarterly").hide();
    }
  });

  // The singlePageNav plugin
  $(".fixedmenu").singlePageNav({
    speed: 800,
    offset: 10,
    changeHash: true,
    //filter: ':not(.external)',
    // beforeStart: function () {
    //     console.log('begin scrolling');
    // },
    // onComplete: function () {
    //     console.log('done scrolling');
    // }
  });

  //video modal close
  // $(".playvideo").on("click", function () {
  //     //alert();
  //     $(this).hide();
  //     $("#videoposterimg").fadeOut();
  //     videoId = $("#custvideo1")[0];
  //     videoId.play();
  //     $(".controlbuttons").addClass("showcontrol");
  // });

  // $(".palypause").on("click", function () {
  //     videoId = $("#custvideo1")[0];
  //     $(".palypause").toggleClass("iconchange");
  //     if (videoId.paused == false) {
  //         videoId.pause();
  //     } else {
  //         videoId.play();
  //     }
  // });
  // $(".mutesound").on("click", function () {
  //     $(".mutesound").toggleClass("iconchange");
  //     videoId = $("#custvideo1")[0];
  //     $(videoId).prop("muted", !$(videoId).prop("muted"));
  // });

  $(document).on("scroll", function () {
    var secPos = $("#yourride").position();
    secPos = secPos.top + 100;
    //console.log(secPos);
    if ($("#custvideo").length > 0) {
      if ($(document).scrollTop() > secPos) {
        $("#custvideo1")[0].pause();
        //$(".palypause").addClass("iconchange");
      } else {
        $("#custvideo1")[0].play();
        //$(".palypause").removeClass("iconchange");
      }
    }
  });
  var swiper = new Swiper(".swiper-container", {
    direction: "vertical",
  });
  if ($(window).width() <= 769) {
    $(".swiper-container").each(function () {
      this.swiper.destroy(true, true);
    });
  }
  // Hit the Raod full details
  var docHeight = $(window).height();
  $(".slide_open_btn").on("click", function () {
    var modalID = $(this).data("modalid");
    $("html").css({
      height: docHeight,
      overflow: "hidden",
      "margin-right": "17px",
    });
    //$("body").toggleClass("zomout");
    $("#" + modalID)
      .fadeIn("fast")
      .animate(
        {
          right: "0",
        },
        300,
      );
    swiper.startAutoplay();
  });
  $(".slide_close_btn").on("click", function () {
    $("html").css({
      overflow: "unset",
      "margin-right": "0",
    });
    $(this).closest(".owl_sld_right").fadeOut().animate(
      {
        right: "-100%",
      },
      100,
    );
    swiper.stopAutoplay();
  });
});

$(document).ready(function () {
  //var findVideo = $(document).find('#custvideo');
  if ($("#custvideo").length) {
    $("#custvideo")[0].play();
  }
  // bike slide switch
  $(".rv300bike li").on("click", function () {
    $(this).addClass("active").siblings().removeClass("active");
    var idValue = $(this).attr("data-bikeclr");
    var ColorName = $(this).find("div").data("bikecolor");
    $(".colorname span").text(ColorName);

    var targetDiv = $("." + idValue);
    $(".bike-imgsection").not(targetDiv).hide();
    $(targetDiv).show();
  });
});

function chackNavColor() {
  var navColor = $(".fixedmenu li.black a").hasClass("current");
  //alert(navColor);
  if (navColor) {
    $(".fixedmenu").addClass("nav-black");
  } else {
    $(".fixedmenu").removeClass("nav-black");
  }
}
chackNavColor();

$(window).scroll(function () {
  chackNavColor();
});

// AOS
AOS.init();

//Section swiper
var swiper = new Swiper(".swiper-container", {
  direction: "vertical",
  slidesPerView: 1,
  speed: 1500,
  loop: false,
  spaceBetween: 0,
  mousewheel: true,
  //autoplay: false,
  on: {
    slideChangeTransitionStart: function () {
      $(this)
        .find("video")
        .each(function () {
          console.log(this);
          this.play();
        });
    },
    slideChangeTransitionEnd: function () {
      $(this)
        .find("video")
        .each(function () {
          this.pause();
        });
    },
  },
  // navigation: {
  //     nextEl: '.swiper-button-next',
  //     prevEl: '.swiper-button-prev',
  //   },
  //   autoplay: {
  //     delay: 1500,
  //     disableOnInteraction: false,
  //   },
  pagination: {
    el: ".swiper-pagination",
    dynamicBullets: true,
  },
});

if ($(window).width() <= 850) {
  $(".swiper-container").each(function () {
    this.swiper.destroy(true, true);
  });
}
