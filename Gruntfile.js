const webpackConfig = require('./webpack.config');

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/* <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      dist: {
        files: {
          './build/<%= pkg.name %>.min.js': [ './build/<%= pkg.name %>.js' ]
        }
      }
    },
    sass: {
      options: { sourceMap: true },
      dist: {
        files: {
          './build/<%= pkg.name %>.css': './styles/index.scss'
        }
      }
    },
    webpack: {
      prod: webpackConfig
    },
    watch: {
      css: {
        files: [
          './styles/**/*.scss'
        ],
        tasks: [ 'sass' ]
      },
      ts: {
        files: [
          './src/**/*.ts',
          './src/**/*.tsx'
        ],
        tasks: [ 'webpack' ],
      },
      configFiles: {
        files: [ 'Gruntfile.js' ],
        options: {
          reload: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-webpack');
  grunt.loadNpmTasks('grunt-sass');

  grunt.registerTask('default', [ 'webpack', 'sass', 'uglify' ]);
};