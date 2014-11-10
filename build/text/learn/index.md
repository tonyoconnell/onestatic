ONE
===

Internet sales. Simple. Swift. Succint.

“Art is the elimination of the unnecessary.”
― Pablo Picasso

ONE is a framework for rappidly escalating ecommerce stores, traffic, leads and sales. You can build apps very very quickly, because everything is beautifully organised. You can change your structure to suit your needs. 

Structure
---------

```html
ONE
|-- Build - where you build your app
|    |-- Blocks - build with blocks
|    |-- Components - automatically download and update components
|    |-- Fonts - for your typography and icons
|    |-- Pages - web and mobile pages
|    |-- Pictures - your images
|    |-- Scripts - javascript 
|    |-- Styles - stylus stylesheets that will be compiled to CSS
|    |-- Templates - construct pages with Jade
|    +-- Text - write web pages with markdown
|        
|-- Engineer - the technology that builds your app
|    |-- gulpfile.js - your streaming build system
|    |-- node_modules - node.js apps
|    |-- package.json - lists your node modules for install
|    +-- bower.json - lists your javascript components for install
|    
+-- Server - the technology that builds your app
     |-- development - sorce code, beautified, with source maps
     +-- staging - minified, compressed files ready for your production server

```
Documentation is structured like this. 

* Text is written in text/learn
* Demo is located at pages/learn/blocks for example


How it works
------------
ONE uses Gulp.js to streamline your workflow. Write in markdown, save your document to the ```Text``` folder and a web page will be built automatically. Templates are written in Jade and converted to HTML. Styles are written in Stylus and converted to CSS. Save your fonts in the ```Fonts``` folder and optimised fonts will be served for each device. Save a picture to the ```Pictures``` folder and it will be compressed and coppied to the server. Download web components with bower and include them in your application. Like a kid playing with blocks build your ecommece app with ease. 


<a href="/learn/install/index.html"> Install >> </a>
