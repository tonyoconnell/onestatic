NIB
===

Position
-------

The position mixins absolute, fixed, and relative provide a shorthand variant to what is otherwise three CSS properties. The syntax is as follows:

      
fixed|absolute|relative: top|bottom [n] left|right [n]
    
The following example will default to (0,0):

      
#back-to-top {
  fixed: bottom right;
}
    
yielding:
      
#back-to-top {
  position: fixed;
  bottom: 0;
  right: 0;
}
    
You may also specify the units:

      
#back-to-top {
  fixed: bottom 10px right 5px;
}
    
yielding:
      
#back-to-top {
  position: fixed;
  bottom: 10px;
  right: 5px;
}

Border radius
-------------

Nib's border-radius supports both the regular syntax as well as augmenting it to make the value more expressive.


button {
  border-radius: 1px 2px / 3px 4px;
}

button {
  border-radius: 5px;
}

button {
  border-radius: bottom 10px;
}

yielding:

button {
  -webkit-border-radius: 1px 2px/3px 4px;
  -moz-border-radius: 1px 2px/3px 4px;
  border-radius: 1px 2px/3px 4px;
}
button {
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
}
button {
  -moz-border-radius-topleft: 10px;
  -webkit-border-top-left-radius: 10px;
  border-top-left-radius: 10px;
  -moz-border-radius-bottomright: 10px;
  -webkit-border-bottom-right-radius: 10px;
  border-bottom-right-radius: 10px;
}

Responsive
----------

The image mixin allows you to define a background-image for both the normal image, and a doubled image for devices with a higher pixel ratio such as retina displays. This works by using a @media query to serve an "@2x" version of the file.


#logo {
  image: '/images/branding/logo.main.png'
}

#logo {
  image: '/images/branding/logo.main.png' 50px 100px
}

yields: 

#logo {
  background-image: url("/images/branding/logo.main.png");
}
@media all and (-webkit-min-device-pixel-ratio: 1.5) {
  #logo {
    background-image: url("/images/branding/logo.main@2x.png");
    background-size: auto auto;
  }
}
#logo {
  background-image: url("/images/branding/logo.main.png");
}
@media all and (-webkit-min-device-pixel-ratio: 1.5) {
  #logo {
    background-image: url("/images/branding/logo.main@2x.png");
    background-size: 50px 100px;
  }
}

Miscellaneous properties

The following properties follow vendor expansion much like border-radius, however without augmentation, as well as some aliases such as whitespace instead of white-space.

no-wrap == nowrap
whitespace == white-space
box-shadow
user-select
column-count
column-gap
column-rule
column-rule-color
column-rule-width
column-rule-style
column-width
background-size
transform
border-image
transition
transition-property
transition-duration
transition-timing-function
transition-delay
backface-visibility
opacity
box-sizing
box-orient
box-flex
box-flex-group
box-align
box-pack
box-direction
animation
animation-name
animation-duration
animation-delay
animation-direction
animation-iteration-count
animation-timing-function
animation-play-state
animation-fill-mode
border-image
hyphens
appearance


