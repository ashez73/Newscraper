var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

gulp.task('default', () => {
  gulp.watch('sass/**/*.scss').on('change', gulp.parallel('styles'));
  // gulp.watch('./index.html', gulp.parallel('copy-html'));
});

gulp.task('scripts', () => {
  return gulp.src('js/**/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('scripts-dist', () => {
  return gulp.src('js/**/*.js')
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('copy-html', () => {
  return gulp.src('./index.html')
    .pipe(gulp.dest('./dist'));
});

gulp.task('copy-images', () => {
  return gulp.src('img/*')
    .pipe(gulp.dest('dist/img'));
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

// gulp.task('styles', updStyle);

// function updStyle (done) {
//  gulp.src('sass/**/*.scss')
//   .pipe(sass().on('error', sass.logError))
//   .pipe(autoprefixer({
//     browsers: ['last 2 versions']
//   }))
//   .pipe(gulp.dest('./css'))
//  .pipe(browserSync.stream());
// };

// gulp.task('default', () => {
//   gulp.watch('sass/**/*.scss', gulp.parallel('styles'));
//   gulp.watch('**/*.js', gulp.parallel('lint'));
// });
gulp.task('dist', gulp.series('copy-html', 'copy-images', 'styles', 'scripts-dist', function (done) {
  // do more stuff
  done();
}));
