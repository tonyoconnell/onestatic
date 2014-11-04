Jade
====
Jade is an elegant templating language focused on enabling very quick HTML coding. 


Import
------

To convert a web page to Jade paste your HTML here
http://html2jade.aaron-powell.com/

or install HTML2Jade

```text
npm install -g html2jade 
```

Then use these commands

```html
html2jade http://twitter.com > twitter.jade
html2jade mywebpage.html # outputs mywebpage.jade
html2jade public/*.html  # converts all .html files to .jade

```

Tags
----
The first word in your line is your HTML tag. To add classes use a dot. 

```
p.message
```
Compiles to
```
<p class="message"></p>
```
Divs are very common in HTML. You can imply the div tag by just specifying IDs and classes.

```
#menu.column
```
Compiles to
<div id="menu" class="column"></div>

```
p Hello, World!
```

```
p
  | Hello, World!
  | This is a block of text.
  | I hope you enjoy using Jade.
```

```
<p>Hello, World!
This is a block of text.
I hope you enjoy using Jade.
</p>
```

```
div
  p hi
```

```
<div>
  <p>hi</p>
</div>
```

Commments
----------
To comment precede with a double slash

```
//This is a comment
```

Nesting
------
```
//hide me
  .row
    .column
      p Foo
    .column
      p Bar
```

```
<!--hide me
<div class="row">
  <div class="column">
    <p>Foo</p>
  </div>
  <div class="column">
    <p>Bar</p>
  </div>
</div>-->
```

You can use colons to nest

```
div: p: span Hello
```

```
<div>
  <p><span>Hello</span>
  </p>
</div>
```

Attributes
--------
Attributes start and end with brackets. Multiple attributes are separated with commas.

```
input(type="text", name="login")
```

```
<input type="text" name="login"/>

```




Variables
--------
Assigning a value to a variable just requires an equal sign with a space before and after. If a space is omitted it will output the value inside a tag instead of assigning it, so be careful.

```
- var foo = "bar"
p= foo
```

```
<p>bar</p>

```

a(href=local) Test Link

- var id = product_view

body(id=id)

Iteration
-------
```
each item in ['product1', 'product2', 'product3']
  li= item
```
```
<li>product1</li>
<li>product2</li>
<li>product3</li>
```

Conditions
----------
```
- var language = "Jade"
if language == "Jade"
  p Awesome
else
  p Not awesome
```

```
<p>Awesome</p>
```

Templates
---------
Template inheritance is a way to define base template structure and reuse it in multiple places. The parent templates define areas for the child templates to overwrite with the "block" keyword. The child inherits this template with the "extends" keyword.

Example: if we have the parent template base.jade:

```
// base.jade
h1 Hello from the base
block content
```

And we want our child to use it:

```
// child.jade
extends base
block content
    p This is the child's content
```


This will output:

```
<h1>Hello from the base</h1>
<p>This is the child's content</p>
```

Templates can have many blocks and inherit multiple levels.


Block Append and Prepend
When using inheritance and blocks, sometimes we want to add to the content instead of overwriting it. We can do so with the "append" and "prepend" keywords. Either by itself along with the block name, or as a parameter to the "block" keyword.

Example: if we have the parent template base.jade:

```
// base.jade
h1 Hello from the base
block content
    p Welcome
```

And we want our child to append to the content block:

```
// child.jade
extends base
block append content
    p And goodbye
```

This will output:

```
<h1>Hello from the base</h1>
<p>Welcome</p>
<p>And goodbye</p>
```

As mentioned you can skip the block keyword and just use append or prepend.

```
// child.jade
extends base
append content
    p And goodbye
```

Inheritance is nice and all, but sometimes we just need a snippet to add at certain parts of the page in various places. Doing this with inheritance is not a good idea. Using the "include" keyword allows us to add on the source of another file.

If we have the following jade files:

```
// widget.jade
.widget
    p The weather is sunny today
```

```
// page.jade
p I wonder what the weather is like today?
include widget
```

The output of page.jade will logically be equivalent and compile to:

```HTML
<p>I wonder what the weather is like today?</p>
<div class="widget">
  <p>The weather is sunny today</p>
</div>
```

Include Markdown in Jade
-------------------------
```text
html
  body
    include:md ../path/to/markdown/file.md
```

```
+filter('markdown').
  # Heading 1
  Hello from some **markdown**.
```

Blocks and Extends
==================
```
// my-template.jade
extends my-layout
  
block head
  script(src="myfile.js")

block content
  h1 My page
```

```
// my-layout.jade
doctype 5
html
  head
    title My title
    block head
  body
    #content
      block content
```


Microdata
=========


http://stackoverflow.com/questions/9332441/java-scala-library-template-engine-
to-produce-microdata

The next listing is an example of manually adding the Microdata tags in a 
template engine (Scalate with Jade syntax):

    -@ var vcard: VCard
    
    div( itemscope itemtype="http://schema.org/Person" 
         itemid=#{vcard.getProperty("uid")} )
      span( itemprop="name" )
        #{vcard.getProperty("fn")}
      span( itemprop="telephone" ) 
        #{vcard.getProperty("tel")}

The next listing shows a template using a data structure that is aware
of the used Microdata vocabulary and wraps an instance of a typed Microdata 
item with its
properties:

    -@ var md: MicroData
    
    = md.scope
      div
        = md.prop("name")
          span( style="color:red" )
        = md.prop("telephone")
        = md.prop("email")

The scope method of the Microdata interface will add the itemscope, itemtype
and itemid attributes to the nested div element. The prop method either 
augments a nested
element as shown for the name property or creates the correct nested element. 
The method
adds the itemprop attribute and puts the value for this property inside the 
element.

An implementation of this approach must take care of a few peculiarities. Some
properties don’t necessarily use simple span elements, e.g. dates can be 
better expressed with time elements or URI values most likely appear in an 
a,img,link or object element. Property values could also be put in a content 
attribute while the element’s nested text content is optimized for human 
consumption. Items can be nested, e.g. an item of type PostalAddress could be 
nested inside a Person item.

A template engine that should be extended as described above should allow to 
capture
and manipulate nested HTML elements and to call methods of passed in objects


