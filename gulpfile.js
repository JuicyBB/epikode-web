/**
 * Settings
 */

var settings = {
  scripts: true, // Turn on/off script tasks
  polyfills: false, // Turn on/off polyfill tasks
  styles: true, // Turn on/off style tasks
  svgs: false, // Turn on/off SVG tasks
  static: true, // Turn on/off static file copying
  docs: false, // Turn on/off documentation generation
  deploy: true, // Turn on/off all deployment tasks
  cacheBust: false, // Turn on/off cache busting (adds a version number to minified files)
};

/**
 * Gulp Packages
 */

// General
var gulp = require("gulp");
var fs = require("fs");
var del = require("del");
var exec = require("child_process").exec;
var lazypipe = require("lazypipe");
var plumber = require("gulp-plumber");
var flatten = require("gulp-flatten");
var tap = require("gulp-tap");
var rename = require("gulp-rename");
var header = require("gulp-header");
var footer = require("gulp-footer");
var watch = require("gulp-watch");
var livereload = require("gulp-livereload");
var nunjucksRender = require("gulp-nunjucks-render");
var package = require("./package.json");

// Scripts
var jshint = settings.scripts ? require("gulp-jshint") : null;
var stylish = settings.scripts ? require("jshint-stylish") : null;
var concat = settings.scripts ? require("gulp-concat") : null;
var uglify = settings.scripts ? require("gulp-uglify") : null;
var optimizejs = settings.scripts ? require("gulp-optimize-js") : null;

// Styles
var sass = settings.styles ? require("gulp-sass") : null;
var prefix = settings.styles ? require("gulp-autoprefixer") : null;
var minify = settings.styles ? require("gulp-cssnano") : null;

// SVGs
var svgmin = settings.svgs ? require("gulp-svgmin") : null;
var svgstore = settings.svgs ? require("gulp-svgstore") : null;

// Docs
var markdown = settings.docs ? require("gulp-markdown") : null;
var fileinclude = settings.docs ? require("gulp-file-include") : null;

/**
 * Paths to project folders
 */

var paths = {
  input: "src/**/*",
  output: "docs/",
  scripts: {
    input: "src/js/**/*",
    polyfills: "!src/js/*.polyfill.js",
    output: "docs/js/",
  },
  styles: {
    input: "src/sass/app.scss",
    output: "docs/css/",
  },
  svgs: {
    input: "src/svg/*",
    output: "docs/svg/",
  },
  static: {
    input: "src/static/**/*",
    output: "docs/",
  },
  docs: {
    input: "src/docs/*.{html,md,markdown}",
    output: "docs/",
    templates: "src/docs/_templates/",
    assets: "src/docs/assets/**",
  },
  html: {
    input: "src/app/pages/**/*.nunjucks",
    templates: "src/app/templates",
    output: "docs/",
  },
};

/**
 * Template for banner to add to file headers
 */

var banner = {
  full:
    "/*!\n" +
    " * <%= package.name %> v<%= package.version %>: <%= package.description %>\n" +
    " * (c) " +
    new Date().getFullYear() +
    " <%= package.author.name %>\n" +
    " * <%= package.license %> License\n" +
    " * <%= package.repository.url %>\n" +
    " */\n\n",
  min:
    "/*!" +
    " <%= package.name %> v<%= package.version %>" +
    " | (c) " +
    new Date().getFullYear() +
    " <%= package.author.name %>" +
    " | <%= package.license %> License" +
    " | <%= package.repository.url %>" +
    " */\n",
};

/**
 * File Version
 */

var fileVersion = settings.cacheBust ? "." + package.version : "";

/**
 * Gulp Tasks
 */

var jsTasks = lazypipe()
  .pipe(
    header,
    banner.full,
    { package: package }
  )
  .pipe(optimizejs)
  .pipe(
    gulp.dest,
    paths.scripts.output
  )
  .pipe(
    rename,
    { suffix: ".min" + fileVersion }
  )
  .pipe(uglify)
  .pipe(optimizejs)
  .pipe(
    header,
    banner.min,
    { package: package }
  )
  .pipe(
    gulp.dest,
    paths.scripts.output
  );

// Lint, minify, and concatenate scripts
gulp.task("build:scripts", ["clean:docs"], function() {
  if (!settings.scripts) return;

  return gulp
    .src([paths.scripts.input, paths.scripts.polyfills])
    .pipe(plumber())
    .pipe(
      tap(function(file, t) {
        if (file.isDirectory()) {
          var name = file.relative + ".js";
          return gulp
            .src(file.path + "/*.js")
            .pipe(concat(name))
            .pipe(jsTasks());
        }
      })
    )
    .pipe(jsTasks());
});

// Create combined script file
gulp.task("build:combineVendorJs", ["clean:docs"], function() {
  if (!settings.scripts) return;

  return gulp
    .src(["node_modules/slick-carousel/slick/slick.min.js"])
    .pipe(plumber())
    .pipe(concat("vendor.js"))
    .pipe(jsTasks());
});

// Create combined script file
gulp.task("build:combineAppJs", ["clean:docs"], function() {
  if (!settings.scripts) return;

  return gulp
    .src(paths.scripts.input)
    .pipe(plumber())
    .pipe(concat("app.js"))
    .pipe(jsTasks());
});

// Create scripts with polyfills
gulp.task("build:polyfills", ["clean:docs"], function() {
  if (!settings.polyfills) return;

  return gulp
    .src(paths.scripts.input)
    .pipe(plumber())
    .pipe(concat(package.name + ".js"))
    .pipe(
      rename({
        suffix: ".polyfills",
      })
    )
    .pipe(jsTasks());
});

// Process, lint, and minify Sass files
gulp.task("build:styles", ["clean:docs"], function() {
  if (!settings.styles) return;

  return gulp
    .src(paths.styles.input)
    .pipe(plumber())
    .pipe(
      sass({
        outputStyle: "expanded",
        sourceComments: true,
      })
    )
    .pipe(flatten())
    .pipe(
      prefix({
        browsers: ["last 2 version", "> 5%", "not ie <=11", "not ie_mob <= 11"],
        cascade: true,
        remove: true,
      })
    )
    .pipe(header(banner.full, { package: package }))
    .pipe(gulp.dest(paths.styles.output))
    .pipe(rename({ suffix: ".min" + fileVersion }))
    .pipe(
      minify({
        discardComments: {
          removeAll: true,
        },
      })
    )
    .pipe(header(banner.min, { package: package }))
    .pipe(gulp.dest(paths.styles.output));
});

// Generate SVG sprites
gulp.task("build:svgs", ["clean:docs"], function() {
  if (!settings.svgs) return;

  return gulp
    .src(paths.svgs.input)
    .pipe(plumber())
    .pipe(
      tap(function(file, t) {
        if (file.isDirectory()) {
          var name = file.relative + ".svg";
          return gulp
            .src(file.path + "/*.svg")
            .pipe(svgmin())
            .pipe(
              svgstore({
                fileName: name,
                prefix: "icon-",
                inlineSvg: true,
              })
            )
            .pipe(gulp.dest(paths.svgs.output));
        }
      })
    )
    .pipe(svgmin())
    .pipe(gulp.dest(paths.svgs.output));
});

// Copy static files into output folder
gulp.task("build:static", ["clean:docs"], function() {
  if (!settings.static) return;

  return gulp
    .src(paths.static.input)
    .pipe(plumber())
    .pipe(gulp.dest(paths.static.output));
});

// Lint scripts
gulp.task("lint:scripts", function() {
  if (!settings.scripts) return;

  return gulp
    .src(paths.scripts.input)
    .pipe(plumber())
    .pipe(jshint())
    .pipe(jshint.reporter("jshint-stylish"));
});

// Remove pre-existing content from output folders
gulp.task("clean:docs", function() {
  del.sync([paths.output]);
});

// Generate documentation
gulp.task("build:docs", ["compile", "clean:docs"], function() {
  if (!settings.docs) return;

  return gulp
    .src(paths.docs.input)
    .pipe(plumber())
    .pipe(
      fileinclude({
        prefix: "@@",
        basepath: "@file",
      })
    )
    .pipe(
      tap(function(file, t) {
        if (/\.md|\.markdown/.test(file.path)) {
          return t.through(markdown);
        }
      })
    )
    .pipe(header(fs.readFileSync(paths.docs.templates + "/_header.html", "utf8")))
    .pipe(footer(fs.readFileSync(paths.docs.templates + "/_footer.html", "utf8")))
    .pipe(gulp.dest(paths.docs.output));
});

// Copy docsribution files to docs
gulp.task("copy:docs", ["compile", "clean:docs"], function() {
  if (!settings.docs) return;

  return gulp
    .src(paths.output + "/**")
    .pipe(plumber())
    .pipe(gulp.dest(paths.docs.output + "/docs"));
});

// Copy documentation assets to docs
gulp.task("copy:assets", ["clean:docs"], function() {
  if (!settings.docs) return;

  return gulp
    .src(paths.docs.assets)
    .pipe(plumber())
    .pipe(gulp.dest(paths.docs.output + "/assets"));
});

// Remove prexisting content from docs folder
gulp.task("clean:docs", function() {
  if (!settings.docs) return;
  return del.sync(paths.docs.output);
});

// Nunjucks compile task
gulp.task("build:html", function() {
  // Gets .html and .nunjucks files in pages
  return (
    gulp
      .src(paths.html.input)
      // Renders template with nunjucks
      .pipe(
        nunjucksRender({
          path: [paths.html.templates],
        })
      )
      // output files in app folder
      .pipe(gulp.dest(paths.html.output))
  );
});

// Spin up livereload server and listen for file changes
gulp.task("listen", function() {
  // livereload.listen();
  gulp.watch(paths.input).on("change", function(file) {
    gulp.start("compile");
    // gulp.start('refresh');
  });
});

// Run livereload after file change
gulp.task("refresh", ["compile", "docs"], function() {
  livereload.changed();
});

/**
 * Task Runners
 */

// Compile files
gulp.task("compile", [
  "lint:scripts",
  "clean:docs",
  "build:scripts",
  // "build:combineVendorJs",
  "build:combineAppJs",
  "build:polyfills",
  "build:styles",
  "build:static",
  "build:html",
  // 'build:svgs'
]);

// Generate documentation
gulp.task("docs", ["clean:docs", "build:docs", "copy:docs", "copy:assets"]);

// Compile files and generate docs (default)
gulp.task("default", [
  "compile",
  // 'docs'
]);

// Compile files and generate docs when something changes
gulp.task("watch", ["listen", "compile"]);
