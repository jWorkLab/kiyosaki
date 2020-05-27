//====================================
//              modules             //
//====================================
var gulp = require('gulp');
var sass = require('gulp-sass');
var csscomb = require('gulp-csscomb');
var csso = require('gulp-csso');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var tinpng = require('gulp-tinypng');
var watch = require('gulp-watch');
var newer = require('gulp-newer');
var svgo = require('gulp-svgo');
var twig = require('gulp-twig');
var replace = require('gulp-replace');
var htmlbeautify = require('gulp-html-beautify');
// var svgSprite = require('gulp-svg-sprite');



//====================================
//              Default             //
//====================================

gulp.task('default',
    [
        'browser-sync',
        'watch',
        'all'
    ]
);

gulp.task('all',
    [
        'scss',
        'twig',
        'js',
        'fonts',
        'php',
        'img-tin',
        'concat-css-libs',
        'concat-js-libs',
        'svg'
    ]
);

//====================================
//          BrowserSync            //
//====================================

gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: "app"
        },
        ui: false
        //tunnel: true
    });
});

//====================================
//               watch              //
//====================================

gulp.task('watch', function () {
    gulp.watch('src/scss/**/*.scss', ['scss']);
    gulp.watch('src/twig/**/*.scss', ['scss']);
    gulp.watch('src/pages/*.twig', ['twig']);
    gulp.watch('src/twig/**/*.twig', ['twig']);
    gulp.watch('src/js/*.js', ['js']);
});

//====================================
//                Twig              //
//====================================

gulp.task('twig', function () {
    return gulp.src('src/twig/pages/*.twig')
        .pipe(plumber())
        .pipe(twig())
        .pipe(replace('/src/', ''))
        .pipe(htmlbeautify())
        .pipe(gulp.dest('app'))
        .pipe(browserSync.stream());
});

//====================================
//     scss / html / js / fonts     //
//====================================

gulp.task('scss', function () {
    gulp.src(['src/scss/main.scss'])
        .pipe(concat('style.scss'))
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(csscomb())
        .pipe(replace('/src/', '../'))
        // .pipe(csso())
        .pipe(gulp.dest('app/css/'))
        .pipe(browserSync.stream());
});


gulp.task('js', function () {
    gulp.src('src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('app/js/'))
        .pipe(browserSync.stream());
});

gulp.task('fonts', function () {
    return watch('src/fonts/**/**/*.*', function () {
        gulp.src('src/fonts/**/**/*.*')
            .pipe(plumber())
            .pipe(newer('app/fonts'))
            .pipe(gulp.dest('app/fonts'));
    });
});

gulp.task('php', function () {
    return watch('src/**/**/*.php', function () {
        gulp.src('src/**/**/*.php')
            .pipe(plumber())
            .pipe(newer('app'))
            .pipe(gulp.dest('app'));
    });
});

gulp.task('svg', function () {
    return watch('src/img/**/**/*.svg', function () {
        gulp.src('src/img/**/**/*.svg')
            .pipe(plumber())
            .pipe(svgo())
            .pipe(gulp.dest('app/img'));
    });
});

// gulp.task('svgsprite', function () {
//     return watch('src/img/svgsprite/*.svg', function () {
//         gulp.src('src/img/svgsprite/*.svg')
//             // .pipe(svgo())
//             .pipe(svgSprite(/* ... Insert your configuration here ... */))
//             .pipe(gulp.dest('app/img'));
//     });
// });

//====================================
//           concat-libs            //
//====================================

gulp.task('concat-css-libs', function () {
    return watch('src/css/plugins/*.css', function () {
        gulp.src([
            // 'src/css/normalize.css',
            'src/css/main.css',
            'src/css/base-styles.css',
            'src/css/plugins/*.css'
        ])
            .pipe(concat("assets.css"))
            .pipe(autoprefixer())
            .pipe(csscomb())
            .pipe(csso())
            .pipe(gulp.dest('app/css/'))
    });
});

gulp.task('concat-js-libs', function () {
    return watch('src/js/plugins/*.js', function () {
        gulp.src('src/js/plugins/*.js')
            .pipe(concat('assets.js'))
            .pipe(uglify())
            .pipe(gulp.dest('app/js/'))
    });
});

//====================================
//            img TinyPng           //
//====================================

gulp.task('img-tin', function () {
    return watch('src/img/**/**/*.*', function () {
        gulp.src('src/img/**/**/*.*')
            .pipe(plumber())
            .pipe(newer('app/img'))
            .pipe(tinpng('1n9UL-m3FoRoJ-nq24hbAJmuR1pl_wls'))
            .pipe(gulp.dest('app/img'));
    });
});


//====================================
//              scsscomb            //
//====================================

gulp.task('scsscomb-task', function () {
    gulp.src(['src/scss/**/*.scss'])
        .pipe(plumber())
        .pipe(csscomb())
        .pipe(gulp.dest('src/scss/'));
});


//====================================
//            End Gulpfile          //
//====================================
