ONE
===

Create beautiful, responsive websites quickly. 

Get Started 
------------
### Pages ###

Create pages for your website inside the pages folder. 
Pages can be written in Jade, Markdown or HTML. 
Jade is used for templating which allows you to extend (surround) your page with a template. 

```
extends ../templates/one

append page-info
    - title = 'This is the title of the page'
    - description = 'This is the description of the page'
    - keywords = 'keyword, keyword2'
 
block content
    h1 The first heading of the page
      p Hello this is a paragraph
        a(href="page.html") Link 
    include:md page.md
    include page.html  
```
To change a page template simply point to a different one. 

```
extends ../templates/different-template
```

### Templates ###

Templates are found in the templates folder. 
They generally include a head block (which contains links to CSS files and scripts), navigation block, content block (this pulls in the content of the page), and footer scripts. 

```
block page-info 

doctype html
html(lang='en')
  head  
    include ../blocks/head
  body
    include ../blocks/navigation/side-navigation
    #screen
      logo
        a#open-left(href='#')  
          img.logo.circular.picture(src="/pictures/logos/logo-ram.png", alt="Mid-Century Online")
      #top-picture
        block top-picture
      #content
        block content
    script(src='/scripts/libraries/jquery.min.js')
    script(src='/scripts/one.js')
    include ../blocks/footer-scripts.html
 ```

 ### Styles ###

 You can find styles in the styles folder. Stylesheets are written in Stylus. The main stylesheet one.styl builds one.css. Other stylus files are imported into one.styl

 ```
 Colors 
=========
*/

// Your brand color. Used in logo, links, buttons etc.
primary-color = #111
// Complimentary colour used for hover and secondary buttons
secondary-color = goldenrod
// Light Background Pattern
light-background()
  background: url('/pictures/patterns/background.png') repeat
// Location of logo
logo = '/pictures/logo.png'
logo-text  
  font-size 30px 
logo
  padding 10px 5px
logo img
  padding 5px
@import 'screens'

``` 