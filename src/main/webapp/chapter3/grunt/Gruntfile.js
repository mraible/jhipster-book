module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: ["dist", '.tmp'],

        copy: {
            main: {
                expand: true, cwd: 'app/',
                src: ['**', '!js/**', '!lib/**', '!**/*.css'], dest: 'dist/'
            }
        },

        rev: {files: {src: ['dist/**/*.{js,css}']}},

        useminPrepare: {html: 'app/index.html'},

        usemin: {html: ['dist/index.html']},

        uglify: {options: {report: 'min', mangle: false}}
    });

    // Tell Grunt what to do when we type "grunt" into the terminal
    grunt.registerTask('default', ['copy', 'useminPrepare', 'concat', 'uglify', 'cssmin', 'rev', 'usemin']);
};
