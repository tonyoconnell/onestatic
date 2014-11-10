Stylus
======

http://www.youtube.com/watch?v=xnI4fqXsu2s

Stylus is the simplist way to write CSS. You don't need to use commas, curly braces, colons or semi-colons. Instead you use spaces - indents and outdents as shown below.

```stylus
body
  color white
```

Becomes this CSS

```css
body {
  color: #fff;
}
```

Parent References
-----------------
The & character references the parent selector(s). In the example below our two selectors (textarea and input) both alter the color on the :hover pseudo selector.

```stylus
textarea
input
  color #A7A7A7
  &:hover
    color #000
```

Compiles to:

```css
textarea,
input {
  color: #a7a7a7;
}
textarea:hover,
input:hover {
  color: #000;
}
```


Variables
----------
http://www.youtube.com/watch?v=VN6trmTBCVs

Define a variable, something you can use throughout your stylesheet. 

```css
primary-color = red
font-size = 14px
font = font-size "Lucida Grande", Arial

body
  font font sans-serif
  background primary-color

```
Property lookup will “bubble up” the stack until found, or return null if the property cannot be resolved. In the following example, @color will resolve to blue:

```css
  body
    color: red
    ul
      li
        color: blue
        a
          background-color: @color
```


Mixins
-------
Mixins allow you to define a combination of values that can be reused. 



When border-radius() is invoked within a selector, the properties are expanded and copied into the selector.

```css
border-radius(n)
  -webkit-border-radius n
  -moz-border-radius n
  border-radius n

form input[type=button]
  border-radius 5px

```
Compiles to:

```css
form input[type=button] {
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
}
```

```css
border-radius()
  -webkit-border-radius arguments
  -moz-border-radius arguments
  border-radius arguments

a.button
  border-radius 1px 2px / 3px 4px!
```


Built in Functions
-------------------
Lighten(color, amount)

Lighten the given color by amount. This function is unit-sensitive, for example supporting percentages as shown below.

```
lighten(#2c2c2c, 30%)
```
Compiles to
```
#787878
```
Also ...
```
* darken(color, amount)
* desaturate(color, amount)
* saturate(color, amount)
* complement(color) - Gives the complementary color. Equals to spinning hue to 180deg.
* invert(color) - Inverts the color. The red, green, and blue values are inverted, while the opacity is left alone.
* grayscale(color) - Gives the grayscale equivalent of the given color. Equals to desaturate by 100%.
* tint(color, amount) - Mix the given color with white e.g. tint(#fd0cc7,66%)
* shade(color, amount) - Mix the given color with black.
```

Comments
--------

Stylus supports three kinds of comments: single-line, and multi-line comments, and multi-line buffered comments.

### Single-line

Single-line comments look like JavaScript comments, and do not output in the resulting CSS:

```
// I'm a comment!
body
  padding 5px // some awesome padding
```

### Multi-line

Multi-line comments look identical to regular CSS comments. However, they only output when the compress option is not enabled.

```
/*
 * Adds the given numbers together.
 */
add(a, b)
  a + b
```

Multi-line buffered

Multi-line comments which are not suppressed start with /*!. This tells Stylus to output the comment regardless of compression.

```
/*!
 * Adds the given numbers together.
 */

add(a, b)
  a + b
```

Importing
--------

Stylus supports both literal @import for CSS, as well as dynamic importing or requiring of other Stylus sheets.

Literal CSS

Any filename with the extension .css will become a literal. For example:

```css
 @import "reset.css"
```

When using @import without the .css extension, it’s assumed to be a Stylus sheet (e.g., @import "mixins/border-radius").

### File globbing

Stylus supports globbing. With it you could import many files using a file mask:

```css
@import 'product/*'
```

This would import all the stylus sheets from the product directory in such structure:

```css
./product
  |-- body.styl
  |-- foot.styl
  |-- head.styl

```
Note that this works with @require too, so if you would have also a ./product/index.styl with this content:

```css
@require 'head'
@require 'body'
@require 'foot'
```

then @require 'product/*' would include each individual sheet only once.


Extends
--------
You can extend a class with another one. 

```
  .message {
    padding: 10px;
    border: 1px solid #eee;
  }

  .warning {
    @extend .message;
    color: #E2E21E;
  }
```

Extending multiple selectors

Stylus allows you to extend multiple selectors at once, just write them with the comma:

```
.a
  color: red

.b
  width: 100px

.c
  @extend .a, .b
  height: 200px
```

Would render to

```
.a,
.c {
  color: #f00;
}
.b,
.c {
  width: 100px;
}
.c {
  height: 200px;
}
```

@block
--------
You can define blocks that can be inserted anywhere. 

```
foo =
  width: 20px
  height: 20px

.icon
  {foo}
```

Would render to

```
.icon {
  width: 20px;
  height: 20px;
}
```
