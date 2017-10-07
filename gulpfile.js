var gulp = require('gulp');
var $    = require('gulp-load-plugins')();
var browserSync = require('browser-sync').create(),
reload = browserSync.reload;

var sassPaths = [
  'bower_components/normalize.scss/sass',
  'bower_components/foundation-sites/scss',
  'bower_components/motion-ui/src'
];

gulp.task('sass', function() {
  return gulp.src('scss/app.scss')
    .pipe($.sass({
      includePaths: sassPaths,
      outputStyle: 'compressed' // if css compressed **file size**
    })
    .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }))
    .pipe(gulp.dest('css'))
    .pipe(browserSync.stream());
});

// browswer sync server
gulp.task("server", function() {
  browserSync.init({
    server: "./"
  });
});

gulp.task('watch', ['sass'], function() {
  // liverelaod
  gulp.watch(['scss/**/*.scss'], ['sass']);
  gulp.watch("*.html").on("change", reload);
});

// default
gulp.task("default", ["server", "sass", "watch"]);