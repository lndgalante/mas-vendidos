const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

const sourceJS = './src/content_script.js';
const destinationJS = './dist/src';

gulp.task('js', () => {
  gulp
    .src(sourceJS)
    .pipe(
      babel({
        presets: ['es2015']
      })
    )
    .pipe(uglify())
    .pipe(gulp.dest(destinationJS));
});

gulp.task('default', ['js'], () => {
  gulp.watch(sourceJS, ['js']);
});
