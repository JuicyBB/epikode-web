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
      $(this).removeClass("active");
      $(this)
        .siblings(".accord-content")
        .slideUp(300)
        .removeClass("active");
    } else {
      $(".accord-block >  .accord-toggle").removeClass("active");
      $(".accord-content").removeClass("active");
      $(this).addClass("active");
      $(".accord-content").slideUp(300);
      $(this)
        .siblings(".accord-content")
        .slideDown(300)
        .addClass("active");
    }
  }));
})();
