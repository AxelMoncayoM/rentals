const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const plumber = require("gulp-plumber");
const imagemin = require("gulp-imagemin");
const sourcemaps = require("gulp-sourcemaps");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");

function css(done) {
  //prettier-ignore
  src("src/scss/**/*.scss")
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write())
    .pipe(dest("build/css"))

  done();
}

function images(done) {
  //prettier-ignore
  src('src/img/**/*.{jpg,png}')
        .pipe(imagemin({ optimizationLevel: 3 }))
        .pipe(dest('build/img'))

  done();
}

function dev() {
  watch("src/scss/**/*.scss", css);
}

exports.css = css;
exports.images = images;
exports.dev = dev;
//exports.dev = series(css, dev);
