Gulp
====
Install
--------
mkdir yourproject
cd yourproject
npm init

### Install Globally
    npm i -g gulp 

### Install Gulp into your project
    npm i -D gulp

### Create a blank Gulpfile.js and save it into the root directory
```
var gulp = require('gulp');

gulp.task('default', function () {

});
```

Use
---
Install a few modules

    npm i -D gulp-uglify gulp-concat gulp-rename

gulp only has 5 methods. These methods are as follows: task, run, watch, src, and dest. These are all you will need to write your tasks.

In the root directory of your project create a new file and name it gulpfile.js and paste the following code inside.

```
var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var pkg = require('./package.json');

gulp.task('build', function () {
  return gulp.src('build/js/*.js')
    .pipe(concat(pkg.name + '.js'))
    .pipe(gulp.dest('publish'))
    .pipe(rename(pkg.name + '.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('publish'));
});
```

Copy 
----
    gulp.src(create_fonts + '/*')
    .pipe(gulp.dest(broadcast_fonts))

Clean
-----
// Copy Fonts
    gulp.task('copy', function() {
    gulp.src(create_fonts + '/*', {read: false})
    .pipe(clean({force: true}))
    .pipe(gulp.dest(broadcast_fonts));
});
// Run Server
gulp.task('express', function() {
  app.use(express.static(path.resolve(broadcast_folder)));
  app.listen(10000);
  gutil.log('Server started - point your browser to http://localhost:10000')
});

Size
----
Lets look at the size

    npm install gulp-size --save-dev

Then require it

    var size = require('gulp-size'); 

Then add it to the task

    .pipe(size())

Embed 
------

    var     live        = false;

// check to see if --live was set
process.argv.forEach(function(val, index, array) {
    if(val === '--live') {
        live = false;
    }
});

gulp.task('jade', function() {
    return gulp.src('src/jade/*.jade')
        .pipe(jade({'pretty':true}))
        .pipe(livereload(lrserver))
        .pipe(gulpif(live, embedlr()))
        .pipe(gulp.dest('dist'));
});

----

# Gulp Template

Basic Template Front-end with [Gulp](http://gulpjs.com/)

Page [Gulp Template](http://tiagoporto.github.io/gulp-template/).

This template includes

* [Sass](http://sass-lang.com/) + [Compass](http://compass-style.org/)
* [jQuery](http://jquery.com/)
* [jQuery UI](http://jqueryui.com/)
* [Jquery Mobile](http://jquerymobile.com/)
* [Bootstrap](http://getbootstrap.com/)
* [AngularJS](http://angularjs.org/)

Just remove what you will not use or include in specific directories: libraries, frameworks or plugins which you want use.

## Features

* Compress Images
* Compile Sass
* Minify JavaScript
* Monitors changes in the file with LiveReload - reload browser
* Clean the assets (img, css, js) in the project to maintain the directory organized
* Notify when tasks are complete

## Directories Structures

```
./
├───┐
│   ├── .sass-cache
│   │   └─ //SASS Cache
│   │
│   ├── node-modules //Will appear after installed the NPM modules
│   │   └─ //All Gulp.js plugins
│   │
│   ├── project //Files for deployment
│   │   ├─ css
│   │   │  └─ //CSS public css
│   │   │
│   │   ├─ fonts
│   │   │  └─ //Web Fonts
│   │   │
│   │   ├─ img
│   │   │  └─ //public images
│   │   │
│   │   ├─ js
│   │   │  └─ //public scripts
│   │   │
│   │   ├─ //Favicons Files
│   │   │
│   │   └─ //HTML or PHP Files
│   │
│   │
│   └── src //Source files for the projects
│       ├── images
│       │   └─ //Original imagens, don't compressed
│       │
│       ├── scripts
│       │   ├─ frameworks
│       │   │
│       │   ├─ libs
│       │   │
│       │   ├─ onread
│       │   │
│       │   ├─ plugins
│       │   │
│       │   └─ //Javascript files will be concatenated and minify
│       │
│       └── stylesheets
│           │
│           ├─ bootstrap
│           │
│           ├─ media_queries
│           │
│           └─ //SASS files be concatenated and minify
│
│
├── .gitignore //Ignored files to GIT commit
├── gulpfile.js //Gulp.js configuration file
├── package.json //NPM dependencies
├── README.md //Descrition of project
└── config.rb //Additional configurations for the SASS
```


## Dependencies

1. [Node.js](http://nodejs.org/) installation

  `Mark npm package manager`


1. Install Gulp

  ```
  $ npm install -g gulp
  ```

  For Mac or Linux User

  ```
  $ sudo npm install gulp -g
  ```


1. [gulp-compass](https://www.npmjs.org/package/gulp-compass) require ruby and compass

  For Windows Users Only is necessary installer ruby

  Download [Ruby](https://www.ruby-lang.org/pt/)

  Download Development Kit from [Ruby Installer](http://rubyinstaller.org/downloads/)

  * Unzip the zip
  * Open command-line and go to unzipped folder
  * `ruby dk.rb init`
  * `ruby dk.rb install`
  * `gem install rdiscount --platform=ruby`


```
$ gem update --system
$ gem install compass
```

Go to the local folder

```
$ cd local/gulp-template
```


Install dependences of npm
```
$ npm install
```


## Usage

Go to the local folder

```
$ cd local/gulp-template
```

Execute

```
$ gulp
```

## Bugs

[Error: ENOENT, no such file or directory](https://github.com/appleboy/gulp-compass/issues/15)

```
sudo gem uninstall sass
sudo gem install sass -v 3.2.12
```

Too Many Open Files
--------------------
How do I fix the error EMFILE: Too many opened files.? 
Increase the limit

    sudo ulimit -n 10480


https://github.com/julien/gulp-processhtml
https://www.npmjs.org/package/gulp-include
https://www.npmjs.org/package/gulp-file-include

https://github.com/paulwib/gulp-ssg
https://github.com/lmtm/gulp-front-matter

http://krasimir.github.io/techy/docs/
https://github.com/0x01/gulp-static-site

// fileinclude: grab partials from templates and render out html files
// ==========================================
gulp.task('fileinclude', function() {
  return  gulp.src(path.join(paths.templates, '*.tpl.html'))
    .pipe(fileinclude())
    .pipe(rename({
      extname: ""
     }))
    .pipe(rename({
      extname: ".html"
     }))
    .pipe(gulp.dest('./'))
    .pipe(livereload(server))
    .pipe(notify({ message: 'Includes: included' }));
});



To do
-----
https://www.npmjs.org/package/gulp-open
https://www.npmjs.org/package/gulp-sketch
https://www.npmjs.org/package/gulp-gzip
https://www.npmjs.org/package/gulp-prefix
https://www.npmjs.org/package/gulp-inline
https://www.npmjs.org/package/gulp-inc
https://www.npmjs.org/package/gulp-build
https://www.npmjs.org/package/gulp-if-else
https://www.npmjs.org/package/gulp-premailer
https://www.npmjs.org/package/gulp-uncss-task
https://www.npmjs.org/package/gulp-inject
https://www.npmjs.org/package/gulp-mc-inline-css
https://www.npmjs.org/package/gulp-assetpaths
https://www.npmjs.org/package/gulp-atomicscss
https://www.npmjs.org/package/compass-options
https://www.npmjs.org/package/gulp-usemin2 //changes references to minified js css
https://www.npmjs.org/package/generator-emi //wordpress

https://www.npmjs.org/package/techy static
https://www.npmjs.org/package/swig-tiny-cms
https://www.npmjs.org/package/gulp-html2md
https://www.npmjs.org/package/gulp-ssg static site
https://www.npmjs.org/package/gulp-front-matter
https://www.npmjs.org/package/gulp-rewrite-css
https://www.npmjs.org/package/gulp-group-css-media-queries
https://www.npmjs.org/package/gulp-local-screenshots
https://www.npmjs.org/package/generator-ghost-h5bp
https://www.npmjs.org/package/squareboy static
https://www.npmjs.org/package/gulp-html-file-to-directory 
https://www.npmjs.org/package/markded-middleware

https://www.npmjs.org/package/meanframework
