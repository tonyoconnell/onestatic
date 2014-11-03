Jeet
====

  (ratios = 1, offset = 0, cycle = 0, uncycle = 0, gutter = jeet-gutter)

COLUMN
------

column (also aliased as col). You specify an initial ratio, either as fractions or decimals, then pass the parent container's context ratio to maintain consistent gutters as you nest.

Offset
------

  column(1/4, offset: 1/4) 

Just specify a ratio to make your offset have a margin-left. Make it negative to give it a margin-right instead. E.g. column(1/4, offset: 1/4) would create a column the quarter of the size of it's container and push it to the right a quarter.

Cycle
-----
Want to make a gallery but don't want to specify a row every 4 pictures? column(1/4, cycle: 4) - done. Want to change it up when you get down to mobile? Maybe just show 2 images per row? uncycle your 4-item cycle then... column(1/2, uncycle: 4, cycle: 2) - done.

Gutter
------
Space to the right. Need to adjust column gutters for a specific container?  

  col(1/4, gutter: .5)

SPAN
----
  (ratio = 1, offset = 0)

Need a grid without the gutters? For instance, for a horizontal navigation where you want buttons touching. Do so like: span(1/5). No need to pass more than one ratio since we don't need to worry about the math involved with gutters and all that.

SHIFT
-----
(ratios = 0, col_or_span = column, gutter = jeet-gutter)

Source ordering works in Jeet by assigning position: relative and then a left offset equal to the ratio passed. You can specify if this is a column or span shift to include gutters or not. This works similar to offset in that it can accept negative values to shift the other direction.

Again, shift can accept multiple context ratios to maintain perfect sizing.
shift also accepts custom gutter sizing, just make sure your gutter sizes match the gutter sizes of your original elements.

UNSHIFT
()
Accepts no values but isn't a block closer either. unshift() is a great helper function to quickly disable whatever source ordering you've done to an element.
EDIT
()
Edit mode assigns a light gray, semi-transparent, background to every element on the page. It's a little trick picked up over the years that makes visualizing the structure of your site trivial.
VIEW AN EXAMPLE
CENTER
(max_width = 1410px, pad = 0)
This is a shortcut to easily center containers. The pad variable sets padding on the left and right.
VIEW AN EXAMPLE
STACK
(pad = 0, align = center)
A helper mixin to "stack" elements on top of each other. Useful for mobile views. Accepts padding and/or text alignment.
(resize your browser when viewing the example to see this in action)
VIEW AN EXAMPLE
UNSTACK
()
Cancel that stack(). Note: This won't revert back to your column() calls. For that, manually call your column() method again.
(resize your browser to a mobile viewport when viewing the example to see this in action)
ALIGN
(direction = both)
Aligning blocks relative to their container with position: absolute and fancy positioning and transform. Vertical alignment is now trivial in IE9+ browsers.
VIEW AN EXAMPLE
CF
()
Nicholas Gallagher's clearfix. Use this to wrap any set of column()s or spans.




Install
-------
npm install gulp gulp-stylus jeet
gulp = require("gulp")
stylus = require("gulp-stylus")
jeet = require("jeet")

gulp.task "jeet", ->
  gulp.src("style.styl").pipe(stylus(use: ["jeet"])).pipe gulp.dest(".")
  return

  

stylus -u jeet -w one.styl
https://www.npmjs.org/package/gulp-stylus
https://github.com/mojotech/jeet/tree/master/stylus#usage-example
https://github.com/jenius/rupture
https://github.com/muraken720/jeet-gulp

```
@import 'jeet'
@import 'rupture'

body
  center(80%)
    overview
        +desktop()
        col(1/3)

    process
        +desktop()
        col(2/3)
        +tablet()
        color red
``