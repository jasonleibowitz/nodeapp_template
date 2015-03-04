module.exports = {
	taskName: 'sass',
	dist: {
		options: {
			style     : 'expanded',
			loadPath  : 'views/layout/',
		},
		files: {
			'assets/styles/styles.css': 'assets/styles/styles.scss'
		},
	},
};
