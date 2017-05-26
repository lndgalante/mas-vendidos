const gulp = require('gulp')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')

const src = 'src/*.js'
const dest = 'dist/src'

gulp.task('js', () => {
  gulp
    .src(src)
    .pipe(
      babel({
        presets: ['es2015']
      })
    )
    .pipe(uglify())
    .pipe(gulp.dest(dest))
})

gulp.task('default', ['js'], () => {
  gulp.watch(src, ['js'])
})
