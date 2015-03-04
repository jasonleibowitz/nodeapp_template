module.exports = {
	taskName: 'scsslint',
	options: {
		colorizeOutput  : true,
		config          : '.scss-lint.yml',
		exclude         : ['views/layout/reset.scss', 'views/layout/mixins.scss']
	},
	src: ['views/**/*.scss'],
};
