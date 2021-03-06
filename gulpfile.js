const {
  src,
  dest,
  watch,
  parallel,
  series
} = require('gulp'),
  scss = require('gulp-sass')(require('sass')),
  concat = require('gulp-concat'),
  browserSync = require('browser-sync').create(),
  autoprefixer = require('gulp-autoprefixer'),
  uglify = require('gulp-uglify-es').default,
  del = require('del'),
  ghpages = require('gh-pages');

function browsersync() {
  browserSync.init({
    server: {
      baseDir: 'app/'
    }
  });
}

function styles() {
  return src([
      'node_modules/slick-carousel/slick/slick.css',
      'node_modules/magnific-popup/dist/magnific-popup.css',
      'node_modules/normalize.css/normalize.css',
      'node_modules/ion-rangeslider/css/ion.rangeSlider.css',
      'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.css',
      'node_modules/jquery-form-styler/dist/jquery.formstyler.css',
      'node_modules/jquery-form-styler/dist/jquery.formstyler.css',
      'node_modules/jquery-form-styler/dist/jquery.formstyler.theme.css',
      'app/scss/style.scss'
    ])
    .pipe(scss({
      outputStyle: 'compressed'
    }))
    .pipe(concat('style.min.css'))
    .pipe(autoprefixer({
      overrideBrowserlist: ['last 10 version'],
      grid: true
    }))
    .pipe(dest('app/css'))
    .pipe(browserSync.stream());
}

function scripts() {
  return src([
      'node_modules/slick-carousel/slick/slick.js',
      'node_modules/magnific-popup/dist/jquery.magnific-popup.js',
      'node_modules/mixitup/dist/mixitup.js',
      'node_modules/ion-rangeslider/js/ion.rangeSlider.js',
      'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.js',
      'node_modules/jquery-form-styler/dist/jquery.formstyler.js',
      'app/js/main.js'
    ])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js'))
    .pipe(browserSync.stream());
}

function cleanDist() {
  return del('dist');
}

function build() {
  return src([
      'app/css/style.min.css',
      'app/fonts/**/*',
      'app/js/main.min.js',
      'app/*.html'
    ], {
      base: 'app'
    })
    .pipe(dest('app/dist'));
}

function watching() {
  watch(['app/scss/**/*.scss'], styles);
  watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts);
  watch(['app/*.html']).on('change', browserSync.reload);
}


module.exports = function deploy() {
  return ghpages.publish('build', function (err) {});
};

exports.styles = styles;
exports.watching = watching;
exports.browsersync = browsersync;
exports.scripts = scripts;
exports.cleanDist = cleanDist;

exports.build = series(cleanDist, build);
exports.default = parallel(scripts, styles, browsersync, watching);