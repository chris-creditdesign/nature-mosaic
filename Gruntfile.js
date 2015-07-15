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

	concat: {
		index: {
			src: [
				'site/includes/header.html',
				'site/includes/fixed-header.html',
				'site/pages/index.html',
				'site/includes/footer.html'
			],
			dest: 'site/index.html'
		},
		featureB: {
			src: [
				'site/includes/header.html',
				'site/includes/fixed-header.html',
				'site/pages/feature-b.html',
				'site/includes/footer.html'
			],
			dest: 'site/feature-b.html'
		},
		newsA: {
			src: [
				'site/includes/header.html',
				'site/includes/fixed-header.html',
				'site/pages/news-a.html',
				'site/includes/footer.html'
			],
		dest: 'site/news-a.html'
		},
		commentA: {
			src: [
				'site/includes/header.html',
				'site/includes/fixed-header.html',
				'site/pages/comment-a.html',
				'site/includes/footer.html'
			],
		dest: 'site/comment-a.html'
		},
		newsAndViewsA: {
			src: [
				'site/includes/header.html',
				'site/includes/fixed-header.html',
				'site/pages/news-views-a.html',
				'site/includes/footer.html'
			],
		dest: 'site/news-views-a.html'
		},
		sevenDaysA: {
			src: [
				'site/includes/header.html',
				'site/includes/card-header.html',
				'site/pages/seven-days-a.html',
				'site/includes/footer.html'
			],
		dest: 'site/seven-days-a.html'
		},
		researchHighlightsA: {
			src: [
				'site/includes/header.html',
				'site/includes/card-header.html',
				'site/pages/research-highlights-a.html',
				'site/includes/footer.html'
			],
		dest: 'site/research-highlights-a.html'
		},
		audioVideoA: {
			src: [
				'site/includes/header.html',
				'site/includes/fixed-header.html',
				'site/pages/audio-video-a.html',
				'site/includes/footer.html'
			],
		dest: 'site/audio-video-a.html'
		}
	},

	watch: {
		html: {
			files: ['site/pages/*.html'],
			tasks: ['concat']
		},
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
				server: '../'
			}
		}
	}

	});

	grunt.registerTask('default', ['browserSync','watch']);
	// use build css for the final dist css
	grunt.registerTask('buildcss',  ['sass', 'postcss']);

};