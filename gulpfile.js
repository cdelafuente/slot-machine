const gulp = require('gulp');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const browserify = require('browserify');
const uglify = require('gulp-uglify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');

/**
 * Generate CSS files task
 */
gulp.task('sass', function () {
  return gulp.src('./styles/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS())
    .pipe(gulp.dest('./styles/css'));
});

/**
 * Watch SASS files task
 */
gulp.task('sass:watch', function () {
  gulp.watch('./styles/sass/**/*.scss', ['sass']);
});

/**
 * Generate JS bundle
 */
gulp.task('bundle', function () {
  return browserify('./js/src/main.js')
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('./js/dist/'));
});
