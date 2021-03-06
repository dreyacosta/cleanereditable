module.exports = (grunt) ->
  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'

    coffee:
      compile:
        files:
          'dist/cleanereditable.js': 'src/cleanereditable.coffee'
          'spec/cleaner.spec.js': 'spec/cleaner.spec.coffee'

    uglify:
      options:
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      build:
        src: 'dist/cleanereditable.js'
        dest: 'dist/cleanereditable.min.js'

    jasmine:
      pivotal:
        src: 'dist/**/*.js'
        options:
          specs: 'spec/**/*.spec.js'

    watch:
      coffee:
        files: ['src/**/*.coffee', 'spec/**/*.coffee']
        tasks: ['coffee', 'uglify', 'jasmine']

    grunt.loadNpmTasks 'grunt-contrib-coffee'
    grunt.loadNpmTasks 'grunt-contrib-jasmine'
    grunt.loadNpmTasks 'grunt-contrib-uglify'
    grunt.loadNpmTasks 'grunt-contrib-watch'

    grunt.registerTask 'default', ['coffee', 'uglify', 'jasmine']