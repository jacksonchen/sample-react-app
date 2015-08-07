var gulp = require('gulp');
var uglify = require('gulp-uglify');
var htmlreplace = require('gulp-html-replace');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var gutil = require('gulp-util');
var watchify = require('watchify');
var sourcemaps = require('gulp-sourcemaps');
var reactify = require('reactify');
var streamify = require('gulp-streamify');

var path = {
  HTML: 'src/index.html',
  ENTRY_POINT: 'src/js/App.js',
  OUT: 'build.js',
  MINIFIED_OUT: 'build.min.js',
  DEST: 'dist',
  DEST_BUILD: 'dist/build',
  DEST_SRC: 'dist/src'
};

// Default

gulp.task('copy', function() {
  gulp.src(path.HTML)
    .pipe(gulp.dest(path.DEST));
});

gulp.task('watch', function() {
  gulp.watch(path.HTML, ['copy']);

  var watcher = watchify(browserify({
    entries: [path.ENTRY_POINT],
    transform: [reactify],
    debug: true,
    cache: {}, packageCache: {}, fullPaths: true
  }));
  watcher.bundle()
    .on('error', gutil.log)
    .pipe(source(path.OUT))
    .pipe(gulp.dest(path.DEST_SRC));

  return watcher.on('update', function() {
    watcher.bundle()
      .on('error', gutil.log)
      .pipe(source(path.OUT))
      .pipe(gulp.dest(path.DEST_SRC))

  })

});

gulp.task('default', ['watch']);

// Production

gulp.task('build', function() {
  browserify({
    entries: [path.ENTRY_POINT],
    transform: [reactify]
  })
    .bundle()
    .on('error', gutil.log)
    .pipe(source(path.MINIFIED_OUT))
    .pipe(streamify(uglify(path.MINIFIED_OUT)))
    .pipe(gulp.dest(path.DEST_BUILD));
})

gulp.task('replaceHTML', function() {
  gulp.src(path.HTML)
    .pipe(htmlreplace({
      'js': 'build/' + path.MINIFIED_OUT
    }))
    .pipe(gulp.dest(path.DEST));
})

gulp.task('production', ['replaceHTML', 'build']);
