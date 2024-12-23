$(document).ready(function () {
  //$("body").niceScroll({cursorwidth:"7px",background:"rgba(0,0,0,0.0)",cursorborderradius:0});
  //main navigation
  $(document).on("click", ".burger-menu, .open_menu , .closenav", function () {
    //event.preventDefault();
    //console.log($(this).find("burgerbg").length);
    $(".burger-menu, .closenav").toggleClass("burgerbg");
    $(".mainnavigation").toggleClass("showhidenav");
    $(".navcontent").toggleClass("opa1", 300);
    $("body").toggleClass("modal-open");
    $(".rv-400-bikeinfo").toggleClass("showhidebike");
  });
  // Go to top
  $(".goto-top").on("click", function () {
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      "slow",
    );
    return false;
  });
  // logo click
  $(".logo50").on("click", function () {
    var href = $(this).find("a").attr("href");
    console.log(href);
    location.href = href;
  });
});

/*$("body").niceScroll({cursorwidth:"6px",background:"rgba(0,0,0,0.0)",cursorborderradius:10,cursorborder:"1px solid #cccccc",cursorminheight: 40});*/
