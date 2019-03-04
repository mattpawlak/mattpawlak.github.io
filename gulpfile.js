var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
/*
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'build/dev'
    },
  })
})
*/
gulp.task('sass', function(){
  return gulp.src('build/dev/scss/*.scss')
    .pipe(sass()) // Using gulp-sass
    .pipe(gulp.dest('build/dev/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('useref', function(){
  return gulp.src('build/dev/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    // Minifies only if it's a CSS file
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('build/dist'))
});

gulp.task('fonts', function() {
  return gulp.src('build/dev/fonts/**/*')
  .pipe(gulp.dest('build/dist/fonts'))
})

gulp.task('watch', ['sass'], function(){
  gulp.watch('build/dev/scss/*.scss', ['sass']);
  /* gulp.watch('build/dev/*.html', browserSync.reload);
  gulp.watch('build/dev/js/*.js', browserSync.reload); */
})
