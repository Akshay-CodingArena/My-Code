$(document).ready(function () {
  $(".switch-sec").on("click", function () {
    $(this).siblings(".rv-specification").find(".hiddeninfo").slideToggle();
    $(this).toggleClass("bgchange123");
  });
  $("#showHidden").click(function () {
    $(this).find("span").toggleClass("collapseTxt");
    $(".plusIcon").toggle();
    $(".minusIcon").toggle();
    $(this).siblings(".hide_img").slideToggle();
  });
  $("#rv-400-gallery").owlCarousel({
    nav: !0,
    navElement: "button",
    navText: [
      '<i class="fa fa-angle-left"></i>',
      '<i class="fa fa-angle-right"></i>',
    ],
    center: !0,
    loop: !0,
    items: 1,
    margin: 20,
    responsive: {
      0: { stagePadding: 0 },
      768: { stagePadding: 150 },
      1024: { stagePadding: 300 },
    },
  });
  var owlCar = $(".owl_sld_right .owl-carousel");
  owlCar.owlCarousel({
    loop: !0,
    nav: !0,
    mouseDrag: !1,
    touchDrag: !1,
    autoplayHoverPause: !0,
    animateOut: "slideOutDown",
    animateIn: "slideInDown",
    dots: !1,
    autoplay: !1,
    margin: 0,
    nav: !0,
    items: 1,
  });
  $(".switch input").click(function () {
    if ($(this).is(":checked")) {
      $(".billed-annually").hide();
      $(".billed-quarterly").show();
    } else {
      $(".billed-annually").show();
      $(".billed-quarterly").hide();
    }
  });
  $(".fixedmenu").singlePageNav({ speed: 800, offset: 10, changeHash: !0 });
  $(document).on("scroll", function () {
    var secPos = $("#yourride").position();
    secPos = secPos?.top + 100;
    if ($("#custvideo").length > 0) {
      if ($(document).scrollTop() > secPos) {
        $("#custvideo1")[0].pause();
      } else {
        $("#custvideo1")[0].play();
      }
    }
  });
  var swiper = new Swiper(".swiper-container", { direction: "vertical" });
  if ($(window).width() <= 769) {
    $(".swiper-container").each(function () {
      this.swiper.destroy(!0, !0);
    });
  }
  var docHeight = $(window).height();
  $(".slide_open_btn").on("click", function () {
    var modalID = $(this).data("modalid");
    $("html").css({
      height: docHeight,
      overflow: "hidden",
      // "margin-right": "17px",
    });
    $("#" + modalID)
      .fadeIn("fast")
      .animate({ right: "0" }, 300);
  });
  $(".slide_close_btn").on("click", function () {
    $("html").css({ overflow: "unset", "margin-right": "0" });
    $(this)
      .closest(".owl_sld_right")
      .fadeOut()
      .animate({ right: "-100%" }, 100);
  });
});
$(document).ready(function () {
  if ($("#custvideo").length) {
    $("#custvideo")[0].play();
  }
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
AOS.init();
var swiper = new Swiper(".swiper-containers", {
  direction: "vertical",
  slidesPerView: 1,
  speed: 1500,
  loop: !1,
  spaceBetween: 0,
  mousewheel: !0,
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
  pagination: { el: ".swiper-pagination", dynamicBullets: !0 },
});
if ($(window).width() <= 850) {
  $(".swiper-containers").each(function () {
    this.swiper.destroy(!0, !0);
  });
}
