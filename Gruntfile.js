module.exports = function(grunt){

  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

  var autoprefixer = require('autoprefixer-core');

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

	sass: {
	  build: {
		options: {
			style: 'expanded',
		},
		files: {
		  'site/css/main.css': 'site/sass/main.scss'
		}
	  }
	},

	postcss: {
	  options: {
		processors: [
		  autoprefixer({ browsers: ['> 1%'] }).postcss
		]
	  },
	  dist: { src: 'site/css/*.css' }
	},

	jshint: {
	  files: {
		src : 'site/scripts/*.js'
	  },
	},

	watch: {
		css: {
			files: ['site/sass/**/*.scss'],
			tasks: ['buildcss']
		},
		js: {
			files: ['site/scripts/*.js'],
			tasks: ['jshint']
		}
	},

	browserSync: {
		dev: {
			bsFiles: {
				src : [
					'site/css/*.css',
					'site/*.html'
				]
			},
			options: {
				watchTask: true,
				server: './'
			}
		}
	}

	});

	grunt.registerTask('default', ['browserSync','watch']);
	// use build css for the final dist css
	grunt.registerTask('buildcss',  ['sass', 'postcss']);

};