/**
 * =======================
 * Accordion
 * =======================
 */

(function() {
  $(".accord-block > .accord-toggle").on("click", function() {
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
  });
})();
