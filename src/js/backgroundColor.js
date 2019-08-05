/**
 * =======================
 * Background Tween
 * =======================
 */

(function() {
  var color = {
    blue: "#0d245f",
    purple: "#3A0D5A",
    cherry: "#93104F",
    pink: "#E53655",
    red: "#AB1515",
    orange: "#DA6F0D",
    yellow: "#FFB402",
    green: "#4D7B1E",
    teal: "#0AB092",
    cyan: "#0A88B0",
    gray: "#212121",
  };

  var section = {
    hero: color.purple,
    services: color.blue,
    project1: "#ad5851",
    project2: "#0c1938",
    about: color.cyan,
    process: color.green,
    tech: color.cherry,
    contact: color.purple,
  };

  var controller = new ScrollMagic.Controller({
    globalSceneOptions: { duration: 500 },
  });

  new ScrollMagic.Scene({
    triggerElement: "#hero",
  })
    .setTween("body, .dynamic-bg", {
      backgroundColor: section.hero,
    })
    // .addIndicators()
    .addTo(controller);

  new ScrollMagic.Scene({
    triggerElement: "#services",
  })
    .setTween("body, .dynamic-bg", {
      backgroundColor: section.services,
    })
    // .addIndicators()
    .addTo(controller);

  new ScrollMagic.Scene({
    triggerElement: "#projects",
  })
    .setTween("body, .dynamic-bg", {
      backgroundColor: section.project1,
    })
    // .addIndicators()
    .addTo(controller);

  new ScrollMagic.Scene({
    triggerElement: "#project_market",
  })
    .setTween("body, .dynamic-bg", {
      backgroundColor: section.project1,
    })
    // .addIndicators()
    .addTo(controller);

  new ScrollMagic.Scene({
    triggerElement: "#project_trilliant",
  })
    .setTween("body, .dynamic-bg", {
      backgroundColor: section.project2,
    })
    // .addIndicators()
    .addTo(controller);

  new ScrollMagic.Scene({
    triggerElement: "#tech",
  })
    .setTween("body, .dynamic-bg", {
      backgroundColor: section.tech,
    })
    // .addIndicators()
    .addTo(controller);

  new ScrollMagic.Scene({
    triggerElement: "#about",
  })
    .setTween("body, .dynamic-bg", {
      backgroundColor: section.about,
    })
    // .addIndicators()
    .addTo(controller);

  new ScrollMagic.Scene({
    triggerElement: "#process",
  })
    .setTween("body, .dynamic-bg", {
      backgroundColor: section.process,
    })
    // .addIndicators()
    .addTo(controller);

  new ScrollMagic.Scene({
    triggerElement: "#contact",
  })
    .setTween("body, .dynamic-bg", {
      backgroundColor: section.contact,
    })
    // .addIndicators()
    .addTo(controller);
})();
