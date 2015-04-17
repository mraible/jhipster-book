'use strict';

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        watch: {
            web: {
                files: ['src/main/webapp/css/*.css', 'src/main/webapp/js/**/*.js']
            }
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src : [
                        'src/main/webapp/index.html',
                        'src/main/webapp/tpl/**/*.html',
                        'src/main/webapp/css/*.css',
                        'src/main/webapp/js/**/*.js',
                        'src/main/webapp/img/**/*.{png,jpg,jpeg,gif,webp,svg}'
                    ]
                }
            },
            options: {
                watchTask: true,
                server: {
                    baseDir: "./src/main/webapp/"
                }
            }
        }
    });

    grunt.registerTask('serve', [
        'browserSync',
        'watch'
    ]);

    grunt.registerTask('default', [
        'serve'
    ]);
};
