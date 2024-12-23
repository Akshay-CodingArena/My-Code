$(window).scroll(function () {
  if (window.location.pathname === "/rv400" || 
    window.location.pathname === "/rv1" || 
    window.location.pathname === "/rv1plus" || 
    window.location.pathname === "/rv400-brz") {
  } else {
    var nav = $(".rv-header");
    var top = 100;
    if ($(window).scrollTop() >= top) {
      nav.addClass("fixed");
      $(".backtotop").addClass("active");
    } else {
      nav.removeClass("fixed");
      $(".backtotop").removeClass("active");
    }
  }
});

$(document).on("click", ".backTop", function () {
  $("html, body").animate(
    {
      scrollTop: $("body").offset().top,
    },
    700,
  );
});

// $(".expandText").on("click", function () {
//   $(".expand-text").text(
//     $(".expand-text").text() == "Expand Specs"
//       ? "Collapse Specs"
//       : "Expand Specs"
//   );
//   $("#product-feature").slideToggle();
//   $(".expandText").toggleClass("active");
// });

$("#mbl_slide").on("slide.bs.carousel", function (e) {
  var nxt = $(e.relatedTarget);
  var to = nxt.index() + 1;
  $(".crrn_no").text(to);
});
