/*!
 * epikode v1.0.0: Epikode Studio Inc official website. We provide full-service end to end digital solutions. We build websites, ecommerce platforms, web applications, mobile apps, and offer maintenance services. We are based in and around Vancouver Canada area.
 * (c) 2019 
 * ISC License
 * https://github.com/epikode
 */

/**
 * =======================
 * Accordion
 * =======================
 */

(function() {
  $(".accord-block > .accord-toggle").on("click", (function() {
    if ($(this).hasClass("active")) {
      // Active block, close on click
      $(this).removeClass("active");
      $(this)
        .siblings(".accord-content")
        .slideUp(250, "swing")
        .removeClass("active");
    } else {
      // Inactive block, open on click
      $(this).addClass("active");
      $(this)
        .siblings(".accord-content")
        .slideDown(250, "swing", (function() {
          scrollToView($(this).parent());
        }))
        .addClass("active");
    }
  }));

  // Scroll page
  var scrollToView = function(element) {
    var elementTop = $(element).offset().top;
    var elementHeight = element.height();
    var windowHeight = $(window).height();
    // Scroll to top of element if elementHeight > windowHeight
    var scrollTo = elementTop;
    // Scroll to middle of page if elementHeight < windowHeight
    if (elementHeight < windowHeight) {
      scrollTo = elementTop - (windowHeight / 2 - elementHeight / 2);
    }
    $("html, body").animate({ scrollTop: [scrollTo, "swing"] }, 350);
  };
})();
