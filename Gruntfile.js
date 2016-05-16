module.exports = function (grunt) {
    grunt.initConfig({
        durandal: {
            dist: {
                src: [
                    'app/**/*.*',
                    'scripts/durandal/**/*.*'
                ],
                options: {
                    paths: {
                        'text': '../scripts/text',

                        'jquery': '../scripts/jquery-1.9.1',
                        'knockout': '../scripts/knockout-2.3.0.debug',

                        'durandal': '../scripts/durandal',
                        'plugins': '../scripts/durandal/plugins',
                        'transitions': '../scripts/durandal/transitions'
                    },
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