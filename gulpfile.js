
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var bs = require('browser-sync').create();
var nodemon = require('gulp-nodemon');
var Server = require('karma').Server;

gulp.task('test', function(done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('browser-sync', ['nodemon'], function() {
	bs.init(null, {
		proxy: "http://localhost:3000",
    browser: "google chrome",
    port: 4000,
	});
});

// the real stuff
gulp.task('default', ['browser-sync'], function () {
	gulp.watch('./client/**/*.*', ['bs-delay']);
	gulp.watch('./server/**/*.js', ['bs-delay']);
});

// give nodemon time to restart
gulp.task('bs-delay', function () {
  setTimeout(function () {
    bs.reload({ stream: false });
  }, 1000);
});

// our gulp-nodemon task
gulp.task('nodemon', function (cb) {
	var started = false;
	return nodemon({
		script: './server/server',
		ext: 'js'
	}).on('start', function () {
		//avoid nodemon being started multiple times
		if (!started) {
			cb();
			started = true;
		}
	})
	.on('crash', function() {
		console.log('nodemon.crash');
	})
	.on('restart', function() {
		console.log('nodemon.restart');
	})
	.once('quit', function () {
		// handle ctrl+c without a big weep
		process.exit();
	});
});

gulp.task('lint', function() {
  return gulp.src('public/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('concat', function() {
  return gulp.src(['./client/*.js', './server/*/**.js'])
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('uglify', function() {
  return gulp.src('./dist/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./dist/'));
});
