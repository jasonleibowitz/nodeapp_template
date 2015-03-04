module.exports = {
	taskName: 'cssmin',
	options: {
		sourceMap: true,
	},
	target: {
		files: {
			'assets/styles/styles.css' : 'assets/styles/styles.css',
		},
	},
};
