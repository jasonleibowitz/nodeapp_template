var child   = require('child_process'),
    fs      = require('fs');

/* * * CONSTANTS * * */
var APP_PORT = 1337,
    APP_HOME = '/';


module.exports = function(grunt) {

    // Load Grunt Task Config
    loadConfig(grunt, {
        pkg: grunt.file.readJSON('package.json'),
    });

    // Load Grunt Tasks
    require('load-grunt-tasks')(grunt);


	/* * * Custom Tasks * * */

    grunt.registerTask('build', function(target) {

        // All build targets need to be concatenated and transpiled (for now)
        var tasks   = ['concatenate', 'transpile'];
            target  = target || "prod";

        if (["prod", "dev"].indexOf(target) < 0)
            return grunt.util.error("Invalid Target: '" + target + "'");

        // If this is a production build, we will also linting and minifying as well
        if (target == "prod") {
			tasks.unshift('lint');
        	tasks.push("cssmin", "uglify");
        }

        return grunt.task.run(tasks);

    });


    // Starts the app server, opens the app in your default browser, and begins file watch with live reload
    grunt.registerTask("dev", function() {

        var done = this.async();

        // Check that the pre-commit git hook exists
        // fs.exists('.git/hooks/pre-commit', function (exists) {

        //     // If the pre-commit git hook does not exist, the environment is not ready for use.
        //     if (!exists) {
        //         console.error('\n\033[31m >> Your environment is not properly initialized.');
        //         console.error(' >> Please run \033[0m`npm run init`\033[31m in the console before attempting to start the application.\033[0m\n');
        //         return done(new Error('Environment not initialized.'));
        //     }

        // });

            // Stop the application via PM2 when SIGINT is hit
            beforeSIGINT(function(cb){

                grunt.log.writeln();
                grunt.log.ok('Stopping Application...');

                var cmd = "pm2 stop website";

                child.exec(cmd, function (err, stdout, stderr) {

                    if (err) {
                        grunt.log.error("Error Stopping Application. Please run: `" + cmd + "` to try again.");
                        return cb(err);
                    }

                    return cb();
                });

            });

            // Start the application via PM2
            grunt.log.ok('Starting Application...');
            child.exec("pm2 start app.js --name 'website'", function (err, stdout, stderr) {

                if (err) return done(err);

                grunt.log.ok('Opening Application...');

                // Wait a second before opening the app to give sails time to lift
                setTimeout(child.exec.bind(0, "open http://localhost:" + APP_PORT + APP_HOME), 1000);

            });

            return grunt.task.run(['build:dev','watch']), done();

    });

    // Lint the code of various languages for quality
    grunt.registerTask('lint', function(target) {

        var tasks   = [];
            target  = target || "all";

        if (["sass", "js", "all"].indexOf(target) < 0)
          return grunt.util.error("Invalid Target: '" + target + "'");

        if (["js", "all"].indexOf(target) > -1)     tasks.push('jshint');
        if (["sass", "all"].indexOf(target) > -1)   tasks.push('scsslint');

        return grunt.task.run(tasks);

    });

    // Concatenate relevant (and like) language superset files (sass / ec6)
    grunt.registerTask('concatenate', function(target) {

        target  = target || "all";

        if (["sass", "js", "all"].indexOf(target) < 0)
            return grunt.util.error("Invalid Target: '" + target + "'");

        var task = {
          'js'	: 'concat:js',
          'sass': 'concat:sass',
          'all'	: 'concat',
        }[target];

        return grunt.task.run(task);

    });

    // Transpile superset languages (sass / ec6) into their basic form (css / ec5).
    // Run after concatenating all relevant (and like) superset files.
    grunt.registerTask('transpile', function(target) {

        var tasks   = [];
            target  = target || "all";

        if (["sass", "js", "all"].indexOf(target) < 0)
            return grunt.util.error("Invalid Target: '" + target + "'");

        if (["js", "all"].indexOf(target) > -1)     tasks.push("6to5");
        if (["sass", "all"].indexOf(target) > -1)   tasks.push("sass");

        return grunt.task.run(tasks);

    });

    // Minify included files. (js / css).
    // Run after transpiling each from its language superset (sass / ec6)
    grunt.registerTask('minify', function(target) {

        var tasks   = [];
            target  = target || "all";

        if (["css", "js", "all"].indexOf(target) < 0)
            return grunt.util.error("Invalid Target: '" + target + "'");

        if (["js", "all"].indexOf(target) > -1)     tasks.push("uglify");
        if (["css", "all"].indexOf(target) > -1)    tasks.push("cssmin");

        return grunt.task.run(tasks);

    });

};


/* * * Helper Functions * * */

// Load grunt config from external modules
function loadConfig(grunt, extend)
{
    var config = fs.readdirSync('grunt_tasks')
                .filter(function(file){
                    return /\.js$/.test(file);
                }).map(function(file){

                    var req         = require('./grunt_tasks/' + file),
                        task_name   = req.taskName;

                    return delete req.taskName, [task_name, req];

                })
                .reduce(function(r, c){
                    return r[c[0]] = c[1], r;
                }, {});

    for (var i in extend) config[i] = extend[i];

    return grunt.initConfig(config);
}

// Listen for SIGINT and optionally run a function when SIGINT is caught
function beforeSIGINT(fn){
	process.on('SIGINT', function(){
		(fn || function(){})(function(err, data){
            if (err) throw err;
            process.exit();
        });
	});
}
