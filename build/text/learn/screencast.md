Screencast
==========

ONE
===

Internet sales. Simple. Swift. Succint.

“Art is the elimination of the unnecessary.”
― Pablo Picasso

ONE is a lightweight framework for rappid internet sales. 

You can publish on the web very very quickly

Write in markdown... 

Click save. 

And a page is generated 

On your development server 

On your staging server (show HTML) 

And on your production server - if live publishing is set

You can connect your devices

And watch changes as soon as you click save

No reload is required 

And each device follows you 

And updates.

I designed ONE because I was frustrated with a few things

1. Magento
2. Folder structure
3. Code ... HTML and CSS ... 

I tried Twitter Bootstrap ...
How beautiful it was 
Create a grid with bootstrap
But then upgrade to 3
still ugly. 
What if I could 

Write HTML 

Layout 3 colunm (2/4)
Responsive
Source Ordering
Grid
Mixin

I don't want MY HTML littered with someone elses shite
I don't want somebody telling me where I should put stuff
I want to have to move things around when I upgrade
I want everything to be in the exact place where it should be


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

Show gulp


Templates are written in Jade 
Grid







Styles are written in Stylus and converted to CSS. 

Save your fonts in the ```Fonts``` folder and optimised fonts will be served for each device. Save a picture to the ```Pictures``` folder and it will be compressed and coppied to the server. Download web components with bower and include them in your application. Like a kid playing with blocks build your ecommece app with ease. 


