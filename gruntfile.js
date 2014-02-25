module.exports = function(grunt) {
 
	grunt.initConfig({
		sass: {
			dist: {
				options: {
					style: 'compressed'
				},
				files: {
					'static/css/main.css': 'static/css/_source/main.scss'
				}
			}
		},
		requirejs: {
			compile: {
				options: {
					baseUrl: "static/src/", 
					out: "static/site.min.js", 
					name: "main", 
					optimize: "uglify2",
					skipModuleInsertion: true,
					include: [		
						"framework/Simplrz",
						"framework/Events",
						"framework/Application",

						"framework/domExtend/DomExtend",
						"framework/domExtend/State",
						"framework/domExtend/Transform",
						"framework/domExtend/Transition",

						"framework/FrameImpulse",
						"framework/HistoryRouter",
						"framework/Loader",
						"framework/MSG",
						"framework/VirtualScroll",
						"framework/Pointer",
						"framework/Util",

						"site/site"
					],
					done: function(done, output) {
						var duplicates = require('rjs-build-analysis').duplicates(output);

						if (duplicates.length > 0) {
							grunt.log.subhead('Duplicates found in requirejs build:');
							grunt.log.warn(duplicates);
							done(new Error('r.js built duplicate modules, please check the excludes option.'));
						}

						done();
					}
				}
			}
		},
		watch: {
			js : {
				files: ['static/src/*.js', 'static/src/**/*.js'],
				tasks: ['requirejs'],
				options: {
					livereload: true
				}
			},
			css : {
				files: ['static/css/_source/*.scss'],
				tasks: ['sass'],
				options: {
					livereload: true
				}
			},
			files : {
				files: ['_source/*.html', '_source/includes/*.html'],
				tasks: ['includes'],
				options: {
					livereload: true
				}
			}
		},
		includes: {
			files: {
				src: ['_source/*.html'], // Source files
				dest: '', // Destination directory
				flatten: true,
				options: {
					silent: true
				}
		 	}
		},
		connect: {
			server: {
				options: {
					port: 8000,
					hostname: '*',
					debug: true
				}
			}
		}
	});
 
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-includes');
	grunt.loadNpmTasks('grunt-contrib-connect');

	grunt.registerTask(
		'default', 
		'Watches the project for changes, automatically builds them and runs a server.', 
		[ 'connect', 'watch' ]
	);
};