'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync  = require('browser-sync').create();
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');


gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: "./build"
        }
    });
    browserSync.watch('build',browserSync.stream())
});

gulp.task('imagemin', () =>
    gulp.src('./src/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./build/images/'))
);

gulp.task('sass', function () {
    return gulp.src('./src/scss/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
        }))
      .pipe(gulp.dest('./build/css/'));
});

gulp.task('html', function () {
    return gulp.src('./src/pages/*.html')
    .pipe(gulp.dest('./build/'));
});


gulp.task('watch', function () {
    gulp.watch('./src/scss/*.scss',gulp.series('sass')),
    gulp.watch('./src/pages/*.html',gulp.series('html')),
    gulp.watch('./src/img/*',gulp.series('imagemin'))
});

gulp.task('default',gulp.series(
    'imagemin',
    gulp.parallel('sass','html'),
    gulp.parallel('watch','serve')
    
));
