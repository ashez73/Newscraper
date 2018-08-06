let gulp = require('gulp');
let sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
let uglify = require('gulp-uglify-es').default;

gulp.task('default', () => {
  gulp.watch('sass/**/*.scss').on('change', gulp.parallel('styles'));
});

gulp.task('scripts', () => {
  return gulp.src('js/**/*.js')
    .pipe(concat('scrape.js'))
    .pipe(uglify())
    .pipe(gulp.dest('production/js'));
});
gulp.task('copy-views', () => {
  return gulp.src('./views/**/**')
    .pipe(gulp.dest('./production/vies'));
});
gulp.task('copy-public', () => {
  return gulp.src('./public/**/**')
    .pipe(gulp.dest('./production/public'));
});

gulp.task('styles', () => {
  return gulp.src('sass/**/*.scss')
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(gulp.dest('./public/css'));
});
gulp.task('uglify-client', function () {
  return gulp.src('public/javascript/client.js')
    .pipe(uglify())
    .pipe(gulp.dest('production/public/javascript/'));
});
gulp.task('prod', gulp.series('copy-public', 'copy-views', 'scripts', function (done) {
  // do more stuff
  done();
}));
