module.exports = {
	taskName: 'watch',
	options: {
		interrupt: true,
		livereload: {
			port: 35729,
		},
	},
	jscss: {
		files: 'views/**/*{.scss,.js}',
		tasks: 'build:dev',
	},
	html: {
		files: 'views/**/*{.html,.ejs}',
		tasks: [],
	},
};
