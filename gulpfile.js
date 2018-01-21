/*
  Modules
*/
const gulp = require('gulp');
const sass = require('gulp-sass');

/*
  Tasks
*/
gulp.task('build', style);
gulp.task('default', ['build'], watch);

/*
  Functions
*/
function style() {
  return gulp.src('./scss/**/*.scss')
             .pipe(sass({
               includePaths: './node_modules/foundation-sites/scss'
             }).on('error', sass.logError))
             .pipe(gulp.dest('./public/css'));
}

function watch() {
  gulp.watch('./scss/**/*.scss', style);
}
