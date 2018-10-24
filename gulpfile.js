const gulp = require("gulp");
const sass = require("gulp-sass");
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require("browser-sync").create();
const htmlmin = require('gulp-htmlmin');
const clean = require("gulp-clean");

sass.compiler = require('node-sass');

const directories = {
  root: '.',
  src: {
    root: './src',
    styles: './src/styles',
    scripts: './src/scripts'
  },
  dist: {
    root: './dist',
    styles: './dist/styles',
    scripts: './dist/scripts'
  },
};

gulp.task('serve', ['htmlmin', 'styles'], () => {

  browserSync.init({
    // proxy: "yourlocal.dev"
    server: directories.dist.root
  });

  // gulp.watch(`${directories.src.styles}/**/*/.scss`, ['styles', 'clean:styles']);
  gulp.watch(`${directories.src.styles}/**/*/.scss`, ['clean:styles', 'styles']);
  // gulp.watch(`${directories.src.root}/*.html`).on('change', browserSync.reload);
  gulp.watch(`${directories.src.root}/*.html`, ['htmlmin']);
  // gulp.watch(`./src/*.html`).on('change', browserSync.reload);
});

gulp.task('htmlmin', () => {
  return gulp.src(`${directories.src.root}/*.html`)
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(directories.dist.root))
    .pipe(browserSync.stream());
});

gulp.task('styles', function () {

  return gulp.src("./src/styles/**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest("./dist/styles"))
    .pipe(browserSync.stream());
});

gulp.task('clean:styles', () => {
  // return gulp.src(`${directories.dist.styles}/**/*/.{css,map}`, {read: false})
  //   .pipe(clean());
});

