module.exports = {
	taskName: 'uglify',
	options: {
		sourceMap		: true,
		sourceMapIn		: 'assets/js/script.js.map',
		mangle			: false,
		preserveComments: false,
		// banner			:	'/* <%= pkg.name %>' +
		// 					'\n * Version  : v<%= pkg.version %>' +
		// 					'\n * Updated  : <%= grunt.template.today("yyyy-mm-dd") %>' +
		// 					'\n * Author   : <%= pkg.author %> */',
	},
	my_target: {
		files: {
			'assets/js/script.js' : 'assets/js/script.js'
		},
	},
};
