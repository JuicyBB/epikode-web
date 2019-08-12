/**
 * =======================
 * Background Tween
 * =======================
 */

(function() {
  var color = {
    blue: "#0a268c",
    purple: "#37005f",
    cherry: "#93104F",
    pink: "#E53655",
    red: "#AB1515",
    orange: "#c24e16",
    yellow: "#FFB402",
    green: "#478804",
    teal: "#0AB092",
    cyan: "#048094",
    gray: "#212121",
  };

  var section = {
    hero: color.purple,
    services: color.cherry,
    service_app: color.orange,
    project1: "#944f48",
    project2: "#041835",
    about: color.cyan,
    process: color.green,
    tech: color.blue,
    contact: color.purple,
  };

  var controller = new ScrollMagic.Controller({
    globalSceneOptions: { duration: 400 },
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
    triggerElement: "#service_app",
  })
    .setTween("body, .dynamic-bg", {
      backgroundColor: section.service_app,
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
