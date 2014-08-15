module.exports = function(grunt) {
	// Project configuration.
	grunt.initConfig({
		// Metadata.
		bwr: grunt.file.readJSON('bower.json'),
		pkg: grunt.file.readJSON('package.json'),
		banner: '/** <%= pkg.main || pkg.name %>.js - v<%= pkg.version %> - ' +
			'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
			'<%= pkg.homepage ? " * " + pkg.homepage + "\\n" : "" %>' +
			' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
			' Licensed under the <%= pkg.license %> license */\n',
		// Task configuration.
		concat: {
			options: {
				banner: '<%= banner %>',
				stripBanners: "block"
			},
			dist: {
				src: ['<%= pkg.name %>.js'],
				dest: '<%= pkg.name %>.js'
			}
		},
		uglify: {
			options: {
				banner: '<%= banner %>'
			},
			dist: {
				src: '<%= concat.dist.dest %>',
				dest: '<%= pkg.name %>.min.js'
			}
		},
		jshint: {
			options: {
				curly: false,
				eqeqeq: true,
				immed: true,
				latedef: true,
				newcap: true,
				noarg: true,
				sub: true,
				undef: true,
				unused: true,
				boss: true,
				eqnull: true,
				globals: { "window": true, "SVG": true }
			},
			svgpathfile: {
				src: 'svg.path.js'
			}
		},
		watch: {
			svgpathfile: {
				files: '<%= jshint.svgpathfile.src %>',
				tasks: ['jshint:svgpathfile']
			}
		},
		bower: {
			install: {
				options: {
					targetDir: "spec/lib/",
					cleanup: true,
					bowerOptions: {
						production: true
					}
				}
			}
		}
	});

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-bower-task');

	/* check if we remembered to sync versions in bower.json and package.json,
	 * the version from package.json is written in the banner */
	grunt.registerTask('version', 'Test bower.json and package.json versions', function version() {
		grunt.log.write('Checking if versions are in sync...');
		grunt.config.requires('bwr.version');
		grunt.config.requires('pkg.version');
		if( grunt.config.data.bwr.version === grunt.config.data.pkg.version ) {
			grunt.log.ok();
			return true;
		} else {
			grunt.log.error(
				'bower.json version '
			 + grunt.config.data.bwr.version
			 + ' is not in sync with package.json version '
			 + grunt.config.data.pkg.version
			 + '.'
			);
			return false;
		}
	});

	// Default task.
	grunt.registerTask('default', ['jshint', 'version', 'concat', 'uglify']);
	// update svg.js using bower and reading config from bower.json
	grunt.registerTask('update', ['bower']);
};
