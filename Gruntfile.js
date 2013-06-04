module.exports = function (grunt) {
    grunt.initConfig({
        durandal: {
            dist: {
                src: 'app/**/*.*',
                options: {
                    uglify2: {
                        compress: {
                            global_defs: {
                                DEBUG: false
                            }
                        }
                    }
                }
            }
        }
    });

    grunt.loadTasks('tasks');

    grunt.registerTask('default', ['durandal']);
};