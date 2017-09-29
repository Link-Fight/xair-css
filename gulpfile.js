let gulp = require('gulp');
let less = require('gulp-less');
let postcss = require('gulp-postcss');
let autoprefixer = require('autoprefixer');
let sourcemaps = require('gulp-sourcemaps');
let nano = require('gulp-cssnano');
let rename = require('gulp-rename');
let comments = require('postcss-discard-comments');

let dist = __dirname + '/dist';
gulp.task('build', function () {
    gulp.src('src/style/index.less')
        .pipe(sourcemaps.init())
        .pipe(less().on('error', function (e) {
            console.error(e.message);
            this.emit('end');
        }))
        .pipe(postcss([autoprefixer(['iOS >= 7', 'Android >= 4.1']), comments()]))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(dist))
        .pipe(nano({
            zindex: false,
            autoprefixer: false
        }))
        .pipe(rename(function (path) {
            path.basename += '.min';
        }))
        .pipe(gulp.dest(dist));
})