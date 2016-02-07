module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    browserify: {
      options: {
        transform: [
          ['babelify']
        ],
        browserifyOptions: {
          debug: true
        }
      },
      build: {
        src: './example/index.js',
        dest: './example/index-compiled.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
}
