var gulp        = require('gulp'),
    browserSync = require('browser-sync').create();

gulp.task('serve', function() {

    browserSync.init({
        server: './src/main/webapp'
    });

    gulp.watch(['src/main/webapp/*.html', 'src/main/webapp/css/*.css'])
        .on('change', browserSync.reload);
});

gulp.task('default', ['serve']);
