import gulp from 'gulp';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import gulpAutoprefixer from 'gulp-autoprefixer';
import gulpConcat from 'gulp-concat';
import gulpBabel from 'gulp-babel';
import gulpUglify from 'gulp-uglify';
import browserSync from 'browser-sync';
import webp from 'imagemin-webp'
import svg from 'imagemin-svgo'
import imagemin from 'gulp-imagemin';
import extReplace from 'gulp-ext-replace';
import rewriteImagePath from 'gulp-rewrite-image-path'
import replace from 'gulp-replace'

const sass = gulpSass(dartSass);

browserSync.create();

// Build all scss files into css files and add autoprefixer
const buildStyles = () => {
    return gulp
        .src('./scss/**/*.scss')
        .pipe(
            sass({
                outputStyle: 'compressed',
                includePaths: ['./node_modules/phosphor-icons/src/css']
            }).on('error', sass.logError)
        )
        .pipe(
            gulpAutoprefixer({
                overrideBrowserslist: ['last 2 versions'],
                cascade: false
            })
        )
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.stream());
};

const buildPackagesStyles = () => {
    return gulp
        .src(['./css/libs/*.css', './node_modules/swiper/swiper-bundle.min.css'], {
            allowEmpty: true
        }) // Set which files you want build
        .pipe(gulpConcat('packages.min.css'))
        .pipe(gulp.dest('./dist/css/'))
        .pipe(browserSync.stream());
};


// Init Browser Sync
const browserSyncInit = () => {
    browserSync.init({
        server: {
            baseDir: './dist/'
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
        .pipe(gulp.dest('./dist/js/'))
        .pipe(browserSync.stream());
};

const buildPackagesJS = () => {
    return gulp
        .src(['./node_modules/swiper/swiper-bundle.min.js'], {allowEmpty: true}) // Set which files you want build
        .pipe(gulpConcat('packages.min.js'))
        .pipe(
            gulpBabel({
                presets: ['@babel/env']
            })
        )
        .pipe(gulpUglify())
        .pipe(gulp.dest('./dist/js/'))
        .pipe(browserSync.stream());
};

// Convert images to webp
const convertToWebp = () => {
    return gulp
        .src(['./img/**/*.{jpg,png,gif,jpeg}'], {base: 'src'})
        .pipe(imagemin([
            webp()
        ]))
        .pipe(extReplace('.webp'))
        .pipe(gulp.dest('./dist/img'))
}

const optimizeSVGs = () => {
    return gulp
        .src('./img/**/*.svg', {base: 'src'})
        .pipe(imagemin([svg()]))
        .pipe(gulp.dest('./dist/img'))
}

const updatePaths = () => {
    return gulp
        .src(['./*.html', './index.html'])
        .pipe(rewriteImagePath({
            path: 'dist',
        }))
        .pipe(replace(/(jpg|png|jpeg|gif)/g, 'webp'))
        .pipe(replace(/js\//g, 'dist/js/'))
        .pipe(replace('img/favicon.svg', 'dist/img/favicon.svg'))
        .pipe(replace(/css\//g, 'dist/css/'))
        .pipe(gulp.dest("dist"))
}

const updateDevPaths = () => {
    return gulp
        .src(['./*.html', './index.html'])
        .pipe(rewriteImagePath({
            path: 'dist',
        }))
        .pipe(replace(/js\//g, 'dist/js/'))
        .pipe(gulp.dest("./"))
}

// Tasks
gulp.task('browser-sync', browserSyncInit);

gulp.task('packages:js', buildPackagesJS);
gulp.task('packages:css', buildPackagesStyles);
gulp.task('img:optimization', async () => {
    convertToWebp()
    optimizeSVGs()
})

gulp.task('sass', async () => {
    buildPackagesStyles();
    buildStyles();
});
gulp.task('js', async () => {
    buildPackagesJS();
    buildJS();
});

// Watch for changes
const watch = () => {
    gulp.watch('./scss/**/*.scss', gulp.series('sass'));

    gulp.watch('./**/*.html').on('change', browserSync.reload);

    gulp.watch('./js/scripts/*.js', gulp.series('js'));

    gulp.watch('./css/libs/*.css', gulp.series('packages:css'));
    gulp.watch('./js/libs/*.js', gulp.series('packages:js'));

    // gulp.watch('./img/**/*', gulp.series('img:optimization'))
    //
    // gulp.watch('./*', gulp.series(gulp.parallel(updatePaths)))
    gulp.watch('./*', gulp.series(gulp.parallel(updateDevPaths)))
};

gulp.task('watch', watch);

// Default task
gulp.task(
    'default',
    gulp.parallel('watch', 'browser-sync', 'sass', 'js', 'packages:js', 'packages:css')
);

// Build tasks
const build = () => {
}
