var fs      = require('fs'),
    marked  = require('marked');

module.exports = {

    // GET /
    root : function(req, res){
        return res.redirect('/pages/home');
    },

    // Renders a screen from the views directory
    // GET /pages/*
    renderPage : function(req, res) {

        var path = (req.url || '').replace(/(^\/?pages\/?)/g, '').split(/\//g).filter(Boolean);

        // The final url part is an explicit file address
        if (!/\.ejs$/.test(path[path.length - 1])) {
            path.push(path[path.length - 1]);
        }

        res.view(path.join('/'), {
            screen: path.pop().replace(/(\.ejs$)/, ''),
        }, function(error, data) {
            return res.send(error ? '404' : data);
        });

    },

    // Renders the README markdown file as HTML
    // GET /app/readme
    readMe: function(req, res){

        fs.readFile('README.md', {
            encoding: 'ascii',
        }, function(err, markdown){

            return res.send(err ? '404' : marked(markdown));

        });

    },
};
