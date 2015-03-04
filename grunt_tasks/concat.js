module.exports = {

	taskName: 'concat',
	js: {
		options: {
			sourceMap	: false,
			separator	: ';',
		},
		src		: ['assets/js/lib/*.js','views/layouts/global.js', 'views/**/*.js'],
		dest	: 'assets/js/script.js',
	},

	// SASS File Concatenation Config
	sass: {
		options: {
			souceMap	: false,
			separator	: ';',
		},
		src		: ['views/layout/global.scss', 'views/home/*.scss', 'views/**/*.scss'],
		filter	: function(filepath) { return !/(vars|mixins|reset)\.scss$/.test(filepath); },
		dest	: 'assets/styles/styles.scss'
	},
};
