module.exports = function(grunt) {

    "use strict";

    grunt.loadNpmTasks("grunt-contrib-sass");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks("grunt-contrib-connect");
    grunt.loadNpmTasks("grunt-bower-install-simple");
    grunt.loadNpmTasks('grunt-minjson');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-uncss');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
    	"bower-install-simple": {
	        dist: {
	            options: {
	                production: true
	            }
	        },
	        dev: {
	            options: {
	                production: false
	            }
	        }
	    },
	    uncss: {
			dist: {
				options: {
			    	ignore: ['#back-to-top', '.back-to-top', '.tooltip', '.fade', '.left', '.in', '.out', '.nav .active', '.nav .active a', '.btn-toggle:hover, .btn-toggle:focus, .btn-toggle.active', '.btn-toggle.active:hover', '.collapsing', '.navbar-collapse.in', '.collapse.in']
			    },
		    	files: {
		      		'css/main.min.css': 'index.html'
		    	}
		  	}
		},
		cssmin: {
			dist: {
		 		files: {
		      		'css/main.min.css': 'css/main.min.css'
		    	}
		  	}
		},
	    htmlmin: {
	    	dist: {
	     		options: {
	        		removeComments: false,
	        		collapseWhitespace: false
	      		},
	      		files: {
	        		'index.html': 'src/main/web/index.html'
	      		}
	      	}
	    },
	    minjson: {
			dist: {
			    files: {
                	'projects/projects.json': 'src/main/web/projects/projects.json'
            	}
			 }
		},
        sass: {
            dist : {
                options: {
                    style: "expanded"
                },
                files: {
                    "css/main.min.css": "src/main/web/sass/main.scss"
                }
            }
        },
        imagemin: {
			dist : {
		    	options: {
		    		optimizationLevel: 7
		      	},
		    	files: [{
		        	expand: true,
		        	cwd: 'src/main/web/img',
		        	src: ['**/*.{png,jpg,gif,svg}'],
		        	dest: 'img'
		      	}]
		   	}
		},
        uglify : {
            dist : {
            	options : {
                    compress: {},
                    mangle : true,
                    preserveComments : false,
                    beautify: false,
                },
                files: {
                    "js/main.min.js" : ["bower_components/jquery/dist/jquery.js", "bower_components/bootstrap-sass-official/assets/javascripts/bootstrap.js", "src/main/web/js/main.js"]
                }
            }
        },
        copy : {
        	fonts : {
        		expand: true,
        		flatten: true,
        		src: ['src/main/web/fonts/**', 'bower_components/fontawesome/fonts/**'],
        		dest: 'fonts',
        		filter: 'isFile'
        	}
        },
        connect: {
            server : {
                options: {
                    open: true,
                    keepalive: true,
                    port: 8080,
                    hostname: "127.0.0.1"
                }
            }
        }
    });

    grunt.registerTask("build", ["bower-install-simple:dist", "sass:dist", "htmlmin:dist", "uncss:dist", "cssmin:dist", "uglify:dist", "copy:fonts", "minjson:dist", "imagemin", "connect:server"]);
};
