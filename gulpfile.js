import gulp from 'gulp';
import plumber from 'gulp-plumber';
import sass from 'gulp-dart-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import csso from 'postcss-csso';
import rename from 'gulp-rename';
import htmlmin from 'gulp-htmlmin';
import concat from 'gulp-concat';
import terser from 'gulp-terser';
import svgo from 'gulp-svgmin';
import svgstore from 'gulp-svgstore';
import {deleteAsync} from 'del';
import browser from 'browser-sync';

// Styles
// export const styles = () => {
//   return gulp.src(['source/sass/**/*.scss', '!source/sass/scheme/**/*.scss'], { sourcemaps: true })
//     .pipe(plumber())
//     .pipe(sass().on('error', sass.logError))
//     .pipe(postcss([
//       autoprefixer(),
//       csso()
//     ]))
//     .pipe(concat('style.min.css'))
//     .pipe(gulp.dest('build/css', { sourcemaps: '.' }))
//     .pipe(browser.stream());
// }

export const styles = () => {
  return gulp.src('source/sass/style.scss', { sourcemaps: true })
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css', { sourcemaps: '.' }))
    .pipe(browser.stream());
}

// Scheme
export const scheme = () => {
  return gulp.src('source/sass/scheme/*.scss')
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(gulp.dest('build/css'))
    .pipe(browser.stream());
}

// HTML
export const html = () => {
  return gulp.src('source/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('build'));
}

// Concat
const scriptConcat = () => {
  return gulp.src(['source/js/components/global.js', 'source/js/components/settings.js', 'source/js/components/scheme.js', 'source/js/components/*.js'])
    .pipe(concat('script.js'))
    .pipe(gulp.dest('source/js'))
    .pipe(gulp.dest('build/js'));
}

// Scripts
export const scripts = () => {
  return gulp.src('source/js/script.js')
    .pipe(terser())
    .pipe(rename('script.min.js'))
    .pipe(gulp.dest('build/js'))
    .pipe(browser.stream());
}

// Images
const copyImages = () => {
  return gulp.src('source/img/**/*.{png,jpg,webp}')
    .pipe(gulp.dest('build/img'))
}

// SVG sprite
const sprite = () => {
  return gulp.src('source/img/sprite/*.svg')
    .pipe(svgo({
      plugins: [
        { removeUselessStrokeAndFill: false }
      ]
    }))
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('build/img'));
}

// Copy
const copy = (done) => {
  gulp.src([
    'source/fonts/*.{woff2,otf}',
    'source/favicon.ico',
    'source/img/favicons/*.svg',
    'source/apple-touch-icon.png',
    'source/player.webmanifest',
    'source/video/**/*.{webm,mp4}',
    'source/video.json',
    'source/subtitle/**/*.vtt',
    'source/browserconfig.xml',
  ], {
    base: 'source'
  })
    .pipe(gulp.dest('build'))
  done();
}

// Clean
const clean = () => {
  return deleteAsync(['build/*']);
};

// Server
const server = (done) => {
  browser.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

// Reload
const reload = (done) => {
  browser.reload();
  done();
}

// Watcher
const watcher = () => {
  gulp.watch('source/sass/components/**/*.scss', styles);
  gulp.watch('source/sass/scheme/*.scss', scheme);
  gulp.watch('source/js/components/*.js', gulp.series(scriptConcat, scripts));
  gulp.watch('source/*.html', gulp.series(html, reload));
}

// Build
export const build = gulp.series(
  clean,
  scriptConcat,
  copy,
  copyImages,
  gulp.parallel(
    styles,
    scheme,
    html,
    scripts,
    sprite
  ),
);

// Default
export default gulp.series(
  clean,
  scriptConcat,
  copy,
  copyImages,
  gulp.parallel(
    styles,
    scheme,
    html,
    scripts,
    sprite
  ),
  gulp.series(
    server,
    watcher
  ));
