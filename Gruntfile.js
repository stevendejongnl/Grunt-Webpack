module.exports = function (grunt) {
  grunt.initConfig({
    watch: {
      files: [
        'src/**/*.scss',
        'src/**/*.js'
      ],
      tasks: ['sass:dev', 'browserify:dev']
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
    browserify: {
      dist: {
        files: {
          'dist/main.js': 'src/main.js'
        },
        options: {
          transform: [['babelify', {
            "sourceMap": false,
            "presets": ["@babel/preset-env"]
          }]],
          browserifyOptions: {
            debug: false
          }
        }
      },
      dev: {
        files: {
          'dist/main.js': 'src/main.js'
        },
        options: {
          transform: [['babelify', {
            "sourceMap": true,
            "presets": ["@babel/preset-env"]
          }]],
          browserifyOptions: {
            debug: true
          }
        }
      }
    },
    uglify: {
      options: {
        sourceMap: false
      },
      my_target: {
        files: {
          'dist/main.js': ['dist/main.js']
        }
      }
    },
    browserSync: {
      dev: {
        bsFiles: {
          src : [
            'dist/*.js',
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

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify-es');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-rollup');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browser-sync');

  grunt.registerTask('default', ['browserSync', 'watch']);
  grunt.registerTask('build', ['sass:dist', 'browserify:dist', 'uglify']);
};
