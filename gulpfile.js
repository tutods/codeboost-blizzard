import gulp from 'gulp';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import gulpAutoprefixer from 'gulp-autoprefixer';
import gulpConcat from 'gulp-concat';
import gulpBabel from 'gulp-babel';
import gulpUglify from 'gulp-uglify';
import browserSync from 'browser-sync';

const sass = gulpSass(dartSass);

browserSync.create();

// Build all scss files into css files and add autoprefixer
const buildStyles = () => {
	return gulp
		.src('./scss/**/*.scss')
		.pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
		.pipe(
			gulpAutoprefixer({
				overrideBrowserslist: ['last 2 versions'],
				cascade: false
			})
		)
		.pipe(gulp.dest('./css'))
		.pipe(browserSync.stream());
};

// Init Browser Sync
const browserSyncInit = () => {
	browserSync.init({
		server: {
			baseDir: './'
		}
	});
};

// Build Javascript code
const buildJS = () => {
	return gulp
		.src('./js/scripts/**/*.js')
		.pipe(gulpConcat('app.min.js'))
		.pipe(
			gulpBabel({
				presets: ['@babel/env']
			})
		)
		.pipe(gulpUglify())
		.pipe(gulp.dest('./js/'))
		.pipe(browserSync.stream());
};

const buildPackagesJS = () => {
	return gulp
		.src(['./js/libs/*.min.js'], { allowEmpty: true }) // Set which files you want build
		.pipe(gulpConcat('packages.min.js'))
		.pipe(
			gulpBabel({
				presets: ['@babel/env']
			})
		)
		.pipe(gulpUglify())
		.pipe(gulp.dest('./js/'))
		.pipe(browserSync.stream());
};

const buildPackagesStyles = () => {
	return gulp
		.src(['./css/libs/phosphor-icons.css'], { allowEmpty: true }) // Set which files you want build
		.pipe(gulpConcat('packages.min.css'))
		.pipe(gulp.dest('./css/'))
		.pipe(browserSync.stream());
};

// Tasks
gulp.task('sass', buildStyles);

gulp.task('browser-sync', browserSyncInit);

gulp.task('js', buildJS);

gulp.task('packages:js', buildPackagesJS);
gulp.task('packages:css', buildPackagesStyles);

// Watch for changes
const watch = () => {
	gulp.watch('./scss/**/*.scss', gulp.series('sass'));

	gulp.watch('./**/*.html').on('change', browserSync.reload);

	gulp.watch('./js/scripts/*.js', gulp.series('js'));

	gulp.watch('./css/libs/*.css', gulp.series('packages:css'));
	gulp.watch('./js/libs/*.js', gulp.series('packages:js'));
};

gulp.task('watch', watch);

// Default task
gulp.task(
	'default',
	gulp.parallel('watch', 'browser-sync', 'sass', 'js', 'packages:js', 'packages:css')
);
