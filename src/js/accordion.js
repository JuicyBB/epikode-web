/**
 * =======================
 * Process Accordion
 * =======================
 */

(function() {
  $(".accord-toggle").on("click", function() {
    var toggleTarget = $($(this).data("toggle"));
    if ($(this).hasClass("active")) {
      // Active block, close on click
      $(this).removeClass("active");
      toggleTarget.slideUp(280, "swing").removeClass("active");
    } else {
      $(".accord-toggle").removeClass("active");
      $(".accord-content")
        .removeClass("active")
        .slideUp(280, "swing");
      // Inactive block, open on click
      $(this).addClass("active");
      toggleTarget
        .delay(280)
        .slideDown(280, "swing")
        .addClass("active");
      // .slideDown(280, "swing", function() {
      //   scrollToView($(this).parent());
      // });
    }
  });

  // Scroll page
  // var scrollToView = function(element) {
  //   var elementTop = $(element).offset().top;
  //   var elementHeight = element.height();
  //   var windowHeight = $(window).height();
  //   // Scroll to top of element if elementHeight > windowHeight
  //   var scrollTo = elementTop;
  //   // Scroll to middle of page if elementHeight < windowHeight
  //   if (elementHeight < windowHeight) {
  //     scrollTo = elementTop - (windowHeight / 2 - elementHeight / 2);
  //   }
  //   $("html, body").animate({ scrollTop: [scrollTo, "swing"] }, 350);
  // };
})();
