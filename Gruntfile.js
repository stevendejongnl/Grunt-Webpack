module.exports = function (grunt) {
  grunt.initConfig({
    watch: {
      files: 'src/**/*.scss',
      tasks: ['sass:dev']
    },
    sass: {
      dist: {
        files: {
          'dist/main.css': 'src/main.scss'
        },
        options: {
          style: 'compressed'
        }
      },
      dev: {
        files: {
          'dist/main.css': 'src/main.scss'
        }
      }
    },
    browserSync: {
      dev: {
        bsFiles: {
          src : [
            'dist/*.css',
            '*.html'
          ]
        },
        options: {
          watchTask: true,
          server: './'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browser-sync');

  grunt.registerTask('default', ['browserSync', 'watch']);
  grunt.registerTask('build', ['sass:dist']);
};
