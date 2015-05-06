var gulp = require('gulp');
$ = require('gulp-load-plugins')();

gulp.task('clean', function () {
    return gulp.src('dist/')
        .pipe($.clean());
});

gulp.task('copy', ['clean'], function () {
    gulp.src(['**', '!index*.html*', '!js/**', '!lib/**', '!**/*.css'], {cwd: 'app/'})
        .pipe(gulp.dest('dist/.'));
});

gulp.task('usemin', ['copy'], function () {
    return gulp.src('app/index.html')
        .pipe($.usemin({
            css: [$.minifyCss(), $.rev()],
            js: [$.uglify(), $.rev()]
        }))
        .pipe(gulp.dest('dist/'));
});

// Tell Gulp what to do when we type "gulp" into the terminal
gulp.task('default', ['usemin']);
