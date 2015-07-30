/*
 * grunt-file-version
 * https://github.com/xiaoyunchen/fileVersion
 *
 * Copyright (c) 2015 陈云
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    // Configuration to be run (and then tested).
    file_version: {
      js: {
        options: {
        },
        files: {
          'demo/index.html': ['demo/js/hello.js','demo/js/world.js'],
        },
      },
      css: {
        options: {
        },
        files: {
          'demo/index.html': ['demo/css/*.css'],
        },
      },
    }


  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['file_version']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['file_version']);

};
