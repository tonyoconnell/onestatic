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

Documents
======
*/

var strategy = '../strategy/', // Strategy documents and spreadsheets
    marketing = '../marketing/', //  Marketing campaigns
    sales = '../sales/'; // Sales

/*


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
    components = '../build/components/', //  Fonts in any format
    scripts = '../build/scripts/'; // Javascript

/*


Servers
=======
Development Server
------------------
Static server for pure HTML and CSS

*/

var server = '../server/', // This is the root of your local web server
    server_pictures = server + 'pictures/', //  Pictures resized and optimised (retina and web)
    server_fonts = server + 'fonts/', //  Fonts converted for use on all devices (TTF, ODF)
    server_styles = server + 'styles/', // Stylesheets generated, mapped, cleaned, combined, minified and obfuscated. 
    server_scripts = server + 'scripts/'; // Javascript combined, minified and obfuscated
    server_components = server + 'components/'; // Javascript combined, minified and obfuscated
/*

Intranet
------------------
Private company information

*/

var intranet = '../server/intranet/', // This is the root of your local web server
    intranet_marketing = intranet + 'marketing/', //  Pictures resized and optimised (retina and web)
    intranet_strategy = intranet + 'strategy/', //  Fonts converted for use on all devices (TTF, ODF)
    intranet_sales = intranet + 'sales/'; // Javascript combined, minified and obfuscated
/*


MAMP Server
------------
Your local server for magento
*/

var mamp_server = '/Users/tony/Websites/mco/'; // This is the root of your local web server


/*

Node.js 
--------
Install node modules. Find modules at https://www.npmjs.org/ 
npm install module-name --save-dev
*/

var gulp = require('gulp'), // Gulp.js
    plumber = require('gulp-plumber'), // Keeps Gulp running after an error
    rename = require('gulp-rename'), // Renames files
    clean = require('gulp-clean'), // Cleans files and folders
    concat = require('gulp-concat'), // Combines CSS and Javascript
    notify = require('gulp-notify'), // Growl notification on completion of tasks
    path = require('path'), // Rewrites paths
    watch = require('gulp-watch'), //Watches for changes
    size = require('gulp-size'), //Lets you know the size of your optimised files
    jshint = require('gulp-jshint'), // Tests Javascript for errors
    stylish = require('jshint-stylish'), // Tests Javascript for errors
    gulputil = require('gulp-util'), // Utilities for Gulp.js
    jade = require('gulp-jade'), // Utilities for Gulp.js
    marked = require('marked'), // Transforms markdown files into HTML
    markdownpdf = require('gulp-markdown-pdf'),
    gulpif = require('gulp-if'), // Reloads web pages when they are changed
    path = require('path'), // Normalises, joins and resolves paths
    changed = require('gulp-changed'), // Only executes tasks if files were changed
    cache = require('gulp-cached'),
    es = require('event-stream'), 
    static_site = require('gulp-static-site'),
    fontface = require('stylus-font-face'),
    uncss = require('gulp-uncss'),
    pureJade = require('jade'),
    autoprefixer = require('autoprefixer-stylus'),
    prettify = require('gulp-jsbeautifier'),
    browsersync  = require('browser-sync'), // Live Reload 
    wait = require('gulp-wait'), // Waits a while
    uglify = require('gulp-uglify'), // Minifies CSS
    fs = require('fs'),
    frontMatter = require('front-matter'),
    map = require('vinyl-map'),
    reveal = require('gulp-reveal'),
    markdown = require('gulp-markdown'),
    stylus = require('gulp-stylus');

/*

Local webserver
--------
*/

// Start Browser-Sync server
gulp.task('server', function(){
  return browsersync.init(null, {server: {baseDir: '../server/'}})
});

gulp.task('reload', function () {
    browsersync.reload();
});

// Auto Restart Server on Change 

var spawn = require('child_process').spawn;

gulp.task('auto', function() {
    var process;

    function restart() {
        if (process) {
            process.kill();
        }

        process = spawn('gulp', ['default'], {stdio: 'inherit'});
    }

    gulp.watch('gulpfile.js', restart);
    restart();
});

/*

Pages
---------
Convert Jade to HTML and copy to the server. 
*/

    gulp.task('page', function() {
     gulp.src('../build/pages/**/*.jade')
    .pipe(cache()) 
    .pipe(plumber())
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest(server))
    .pipe(wait(1500))
    .pipe(browsersync.reload({stream: true}));
});

/*
Templates
---------
Convert Jade to HTML and copy to server. 
*/

    gulp.task('template', function() {
     gulp.src('../build/pages/**/*.jade')
    .pipe(plumber())
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest(server))
    .pipe(wait(1500))
    .pipe(browsersync.reload({stream: true}));
});

/*

Text
---------
Convert markdown to HTML 
*/

gulp.task('text', function () {
    return gulp.src('../build/text/**/**/*.md')
    .pipe(cache()) 
    .pipe(static_site())
    .pipe(gulp.dest('../server/'))
    .pipe(wait(1500))
    .pipe(browsersync.reload({stream: true}));
});



/*
Pictures
----------
*/
    gulp.task('picture', function() {
    gulp.src(pictures + '**/*.{jpg,png,gif,svg}')
    .pipe(cache()) 
    .pipe(gulp.dest(server_pictures))
    .pipe(browsersync.reload({stream: true}));
});

/*
Fonts
----------
*/
    gulp.task('font', function() {
    gulp.src(fonts + '*')
    .pipe(cache()) 
    .pipe(changed(server_fonts))
    .pipe(gulp.dest(server_fonts))
    .pipe(browsersync.reload({stream: true}));
});


/*
Styles
--------- 
Build CSS classes from Styluss
.pipe(stylus({
            use: [autoprefixer('iOS >= 7', 'last 1 Chrome version')]
        }))
    .pipe(stylus({compress: true, use: fontface()}))

*/

   gulp.task('style', function () {
     gulp.src(styles + 'one.styl')
    .pipe(plumber())
    .pipe(changed(styles + '*.styl'))
    .pipe(stylus({ use:[fontface()], sourcemap: { inline: true } }))
    .pipe(gulp.dest(server_styles))
    .pipe(browsersync.reload({stream: true}))
    .pipe(size());
});

   gulp.task('stage-style', function () {
     gulp.src(styles + 'one.styl')
    .pipe(plumber())
    .pipe(stylus({ use:[fontface()], compress: true}))
    .pipe(gulp.dest(mamp_server + 'skin/frontend/one/default/css/'))
    .pipe(size());
});


/*
Scripts
--------- 
Build your scripts 
*/

   gulp.task('script', function () {
    gulp.src(['../build/scripts/one.js','../build/scripts/plugins/**/*.js', '../build/scripts/libraries/**/*.js'])
    .pipe(plumber())
    .pipe(cache()) 
    .pipe(changed(scripts + '**/*.js'))
    .pipe(gulp.dest(server_scripts))
    .pipe(size());
});

   gulp.task('script2', function () {
    gulp.src(['../build/scripts/scripts.jade'])
    .pipe(plumber())
    .pipe(jade({
      pretty: false
    }))
    .pipe(rename("scripts.js"))
    .pipe(gulp.dest(server_scripts))
    .pipe(size());
});

/*

Components
----------
*/
    gulp.task('component', function() {
    gulp.src(['../build/components/**/*'])
    .pipe(cache()) 
    .pipe(gulp.dest(server_components))
});

/*
Presentations
----------

gulp.task('present', function () {
  gulp.src(strategy + '*.jade')
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest(intranet))
    .pipe(wait(1500))
    .pipe(browsersync.reload({stream: true}))
    .pipe(size());
});

/*
Run Tasks
=========
*/

gulp.task('default', function() {

// start these tasks 
    gulp.start( 'page', 'picture', 'font', 'style', 'script', 'component', 'text', 'stage-style', 'server')

// watch for changes and run tasks
        gulp.watch('../build/pages/**/**/**/*', function(event){
            gulp.start('page', 'reload');
        });
        gulp.watch('../build/templates/*.jade', function(event){
            gulp.start('template', 'reload');
        });
        gulp.watch('../build/blocks/**/*.jade', function(event){
            gulp.start('page', 'reload');
        });
        gulp.watch('../build/text/**/**/*.md', function(event){
            gulp.start('text', 'reload');
        });
        gulp.watch(pictures + '**/*', function(event){
            gulp.start('picture');
        });
        gulp.watch(components + '**/*', function(event){
            gulp.start('component');
        });
        gulp.watch(fonts  + '**/*', function(event){
            gulp.start('font');
        });
        gulp.watch(styles + '**/*.styl', function(event){
            gulp.start('style');
        });
        gulp.watch(styles + '**/*.styl', function(event){
            gulp.start('stage-style');
        });
        gulp.watch(scripts + '**/*', function(event){
            gulp.start('script', 'template', 'reload');
        });
//        gulp.watch(strategy + '*', function(event){
//            gulp.start('present', 'reload');
//        });
    });