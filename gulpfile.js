const { src, dest, watch, parallel, series } = require('gulp');

const scss = require('gulp-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify-es').default;
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const del = require('del');


function browsersync() {
    browserSync.init({
      server : {
       baseDir: 'app/'
      }
    });
}


function cleanDist() {
    return del('dist')
}




function images() {
    return src('app/images/**/*')
    .pipe(imagemin(
        [
            imagemin.gifsicle({interlaced: true}),
            imagemin.mozjpeg({quality: 75, progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ]
    ))
    .pipe(dest('dist/images'))
}

function scripts() {
    return src([
      'node_modules/jquery/dist/jquery.js',
      'node_modules/slick-carousel/slick/slick.js',
      'node_modules/magnific-popup/dist/jquery.magnific-popup.js',
      'app/js/main.js'  
    ])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js'))
    .pipe(browserSync.stream())
}



function styles() {
  return src([
    'node_modules/normalize.css/normalize.css',
    'node_modules/slick-carousel/slick/slick.css',
    'node_modules/magnific-popup/dist/magnific-popup.css',
    'app/scss/style.scss'
  ])  
     .pipe(scss({outputStyle: 'compressed'}))
     .pipe(concat('style.min.css'))
     .pipe(autoprefixer({
         overrideBrowserslist: ['last 10 version'],
         grid: true
     }))
     .pipe(dest('app/css'))
     .pipe(browserSync.stream())
}

function build() {
    return src([
        'app/css/style.min.css',
        'app/fonts/**/*',
        'app/js/main.min.js',
        'app/*.html'
    ], {base: 'app'})
    .pipe(dest('dist'))
}


function watching() {
  watch(['app/scss/**/*.scss'], styles);
  watch(['app/js/main.js', '!app/js/main.min.js'], scripts);
  watch(['app/*.html']).on('change', browserSync.reload);

}




exports.styles = styles;
exports.watching = watching;
exports.browsersync = browsersync;
exports.scripts = scripts;
exports.images = images;
exports.cleanDist = cleanDist;



exports.build = series(cleanDist, images, build);
exports.default = parallel(styles, scripts, browsersync, watching);





































// let gulp = require('gulp'),
//     sass = require('gulp-sass'),
//     rename = require('gulp-rename'),
//     browserSync = require('browser-sync'),
//     autoprefixer = require('gulp-autoprefixer'),
//     concat = require('gulp-concat'),
//     uglify = require('gulp-uglify'),
//     cssmin = require('gulp-cssmin');

// gulp.task('sass', function(){
// return gulp.src('app/scss/style.scss')
//       .pipe(sass({outputStyle: 'compressed'}))
//       .pipe(rename({ suffix : '.min'}))
//       .pipe(autoprefixer({
//         overrideBrowserslist: ['last 8 versions']
//       }))
//       .pipe(gulp.dest('app/css'))
//       .pipe(browserSync.reload({stream: true}))
// });

// gulp.task('style', function(){
//     return gulp.src([
//         'node_modules/normalize.css/normalize.css',
//         'node_modules/slick-carousel/slick/slick.css',
//         'node_modules/magnific-popup/dist/magnific-popup.css'
//     ])
//         .pipe(concat('libs.min.css'))
//         .pipe(cssmin())
//         .pipe(gulp.dest('app/css'))
//     });



// gulp.task('script', function(){
// return gulp.src([
   
//     'node_modules/slick-carousel/slick/slick.js',
//     'node_modules/magnific-popup/dist/jquery.magnific-popup.js'
// ])
//     .pipe(concat('libs.min.js'))
//     .pipe(uglify())
//     .pipe(gulp.dest('app/js'))
// });

// gulp.task('html', function(){
//     return gulp.src('app/*.html')
//     .pipe(browserSync.reload({stream: true}))
// });

// gulp.task('js', function(){
//     return gulp.src('app/js/*.js')
//     .pipe(browserSync.reload({stream: true}))
// });


// gulp.task('browser-sync', function() {
//     browserSync.init({
//         server: {
//             baseDir: "app/"
//         }
//     });
// });

// gulp.task('watch', function(){

//     gulp.watch('app/scss/style.scss', gulp.parallel('sass'));
//     gulp.watch('app/*.html', gulp.parallel('html'));
//     gulp.watch('app/*.js', gulp.parallel('js'));
// });

// gulp.task('default', gulp.parallel('style', 'script', 'sass', 'watch', 'browser-sync'))