/*
 ██████╗ ███╗   ██╗███████╗
██╔═══██╗████╗  ██║██╔════╝
██║   ██║██╔██╗ ██║█████╗  
██║   ██║██║╚██╗██║██╔══╝  
╚██████╔╝██║ ╚████║███████╗
 ╚═════╝ ╚═╝  ╚═══╝╚══════╝
===
    Version: 1.0.0
    Author: Tony O'Connell
    http://one.ie
    tony@one.ie
    https://github.com/tonyoconnell/one.git

Reconstruct Your Ebusiness
==========================
ONE is a simple way to create an intuitive structure for your business. 
Its designed for CEOs, engineers and their mothers to build internet apps using plain English.

Build
======
The is the location of your source files. Its where you build your website from. 
*/

var pages = '../build/pages/', // Web pages
    templates = '../build/templates/', // Web pages
    blocks = '../build/blocks/', // Blocks are used to build pages 
    pictures = '../build/pictures/', //  Original pictures (highest resolution .JPG, .GIF, PNG, SVG) 
    styles = '../build/styles/', // Stylesheets in Stylus Format
    fonts = '../build/fonts/', //  Fonts in any format
    scripts = '../build/scripts/'; // Javascript

/*


Server
-------------
Where you want to broadcast pure HTML to web and mobile users. 

*/

var server = '../server/', // This is the root of your local web server
    server_pictures = server + 'pictures/', //  Pictures resized and optimised (retina and web)
    server_fonts = server + 'fonts/', //  Fonts converted for use on all devices (TTF, ODF)
    server_styles = server + 'styles/', // Stylesheets generated, mapped, cleaned, combined, minified and obfuscated. 
    server_scripts = server + 'scripts/'; // Javascript combined, minified and obfuscated

/*


/*

Node.js 
--------
Install node modules. Find modules at https://www.npmjs.org/ 
npm install module-name --save-dev
*/

var gulp = require('gulp'), // Gulp.js
    plumber = require('gulp-plumber'), // Keeps Gulp running after an error
    imagemin = require('gulp-imagemin'), // Compress Gif, Jpeg and SVG images
    rename = require('gulp-rename'), // Renames files
    clean = require('gulp-clean'), // Cleans files and folders
    concat = require('gulp-concat'), // Combines CSS and Javascript
    notify = require('gulp-notify'), // Growl notification on completion of tasks
    csslint = require('gulp-csslint'),
    path = require('path'), // Rewrites paths
    watch = require('gulp-watch'), //Watches for changes
    size = require('gulp-size'), //Lets you know the size of your optimised files
    jshint = require('gulp-jshint'), // Tests Javascript for errors
    stylish = require('jshint-stylish'), // Tests Javascript for errors
    gulputil = require('gulp-util'), // Utilities for Gulp.js
    jade = require('gulp-jade'), // Utilities for Gulp.js
    express = require('express'), // Express Server
    marked = require('marked'), // Transforms markdown files into HTML
    markdownpdf = require('gulp-markdown-pdf'),
    gulpif = require('gulp-if'), // Reloads web pages when they are changed
    path = require('path'), // Normalises, joins and resolves paths
    rename = require('gulp-rename'), // Renames files
    changed = require('gulp-changed'), // Only executes tasks if files were changed
    es = require('event-stream'), 
    uncss = require('gulp-uncss'),
    livereload = require('gulp-livereload'), // Reloads web pages when they are changed
    embedlr = require('gulp-embedlr'), // Adds javascript to listen and reload
    lr = require('tiny-lr'), // Live Reload Server
    uglify = require('gulp-uglify'), // Minifies CSS
    atomic = require('gulp-atomicscss'), // Creates SCSS classes from HTML
    stylus = require('gulp-stylus');

/*

Express
--------
Local webserver
*/

var app = express(),

staticServer = function(port) {
    app = express();
    app.use(express.static(path.resolve(server)));
    app.listen(port, function() {
        gulputil.log('Static server running at http://localhost:'+port);
    });
    return {
        app: app
    };
};
staticServer(1111);

/*

Live Reload
-----------
Refresh your browser after changes. Add .pipe(livereload(lrserver)) to any task.
*/

var lrport      = 35729,
    lrserver    = lr();

/*

Pages
---------
Convert Jade to HTML and copy to the server. 
*/

    gulp.task('page', function() {
     gulp.src('../build/pages/**/*.jade')
    .pipe(plumber())
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest(server))
    .pipe(livereload(lrserver))
    .pipe(notify({message: 'Page Built'}));
});

/*

Pictures
----------
*/
    gulp.task('picture', function() {
    gulp.src(pictures + '**/*.{jpg,png,gif,svg}')
    .pipe(changed(server_pictures))
    .pipe(gulp.dest(server_pictures))
    .pipe(livereload(lrserver));
});

/*
Fonts
----------
*/
    gulp.task('font', function() {
    gulp.src(fonts + '*')
    .pipe(changed(server_fonts))
    .pipe(gulp.dest(server_fonts))
    .pipe(livereload(lrserver));
});


/*
Styles
--------- 
Build CSS classes from Stylus
*/

   gulp.task('style', function () {
     gulp.src(styles + '*.styl')
    .pipe(plumber())
    .pipe(changed(styles + '*.styl'))
    .pipe(stylus())
    .pipe(gulp.dest(server_styles))
    .pipe(livereload(lrserver))
    .pipe(size())
    .pipe(notify({message: 'Styles Applied'}));
});

/*
Scripts
--------- 
Build your scripts 
*/

   gulp.task('script', function () {
    gulp.src(['../build/scripts/**/*.js', '!../build/scripts/**/*.min.js'])
    .pipe(plumber())
    .pipe(changed(scripts + '**/*.js'))
    .pipe(jshint())
/*    .pipe(jshint.reporter('default')) */
    .pipe(concat('app.js'))
     gulp.src(['../build/scripts/**/*.min.js'])
    .pipe(uglify())
    .pipe(gulp.dest(server_scripts))
    .pipe(livereload(lrserver))
    .pipe(size())
    .pipe(notify({message: 'Scripts Optimised'}));
});



/*

Run Tasks
=========
*/

gulp.task('default', function() {

// start these tasks 
    gulp.start( 'page', 'picture', 'font', 'style', 'script');

// start livereload server
    lrserver.listen(lrport, function (err) {
        if (err) {
            return console.log(err)
        };
        gulputil.log('Livereload server listening at http://localhost:'+lrport);
        
// watch for changes and run tasks
        gulp.watch('../build/pages/**/*.jade', function(event){
            gulp.start('page');
        });
        gulp.watch('../build/templates/**/*.jade', function(event){
            gulp.start('page');
        });
        gulp.watch('../build/blocks/**/*.jade', function(event){
            gulp.start('page');
        });
        gulp.watch(pictures + '**/*', function(event){
            gulp.start('picture');
        });
        gulp.watch(fonts  + '**/*', function(event){
            gulp.start('font');
        });
        gulp.watch(styles + '**/*.styl', function(event){
            gulp.start('style');
        });
        gulp.watch(scripts + '**/*.js', function(event){
            gulp.start('script');
        });
    });
});
