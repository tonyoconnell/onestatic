Axis
====

*   [introduction](#introduction)
*   [settings](#settings)
*   [reset](#reset)
*   [vendor](#vendor)
*   [positioning](#positioning)
*   [grid](#grid)
*   [utilities](#utilities)
*   [typography](#typography)
*   [vertical-rhythm](#vertical-rhythm)
*   [tables](#tables)
*   [gradients](#gradients)
*   [forms](#forms)
*   [code](#code)
*   [interaction](#interaction)
*   [easing](#easing)
*   [buttons](#buttons)
*   [ui](#ui)
*   [animation](#animation)</div>

Introduction
-------------
Roots includes a css library called axis built on top of [stylus](http://learnboost.github.com/stylus/). It contains a lot of functionality and is very large, but it should be an easy transition from regular css, less, or sass. With stylus, you can use brackets and semicolons or not, your choice. You can even mix them. Pasting straight css will compile perfectly, and nothing in this library overrides anything in regular css in a destructive manner. In addition, this library adds no extra weight to your css footprint unless you do it specifically using mixins or imports. Axis css is an enhancement of regular css, and you can ease into it gradually, unlike some other libraries which require you to learn entirely new syntax.

Since this library is mixin-based, it&#39;s worth briefly discussing mixins here. There are two ways to call a mixin in stylus, what I call the _mixin form_ or the _native form_. The mixin form has parens and comma-separated arguments while the native form uses a colon and space-separated args.

this is the mixin form: `mixin(arg1, arg2)`
and this is the native form: `mixin: arg1 arg2`

When calling mixins in roots, you should use the native form, _unless the mixin is being called at the root level_, in which case you should use the mixin form. When you call a mixin with no arguments, it must be followed by empty parens `()`. Examples below:

    // root level, call with mixin syntax
    font-face(&#39;proxima-nova&#39;, &#39;/fonts&#39;)

    .picture
      // not root level, call with native syntax
      bg: &#39;/img/whatever.png&#39;

      // no arguments, call with empty parens
      transition()`</pre>

    Finally, the source code for roots is organized exactly as this page is, and is thoroughly commented and as clear as possible. Feel free to [check out the source](https://github.com/jenius/axis) if you are after implementation details.

    ### settings

    There are a number of global settings in roots that you can and should feel free to override at any time. If you are using the [roots command line client](https://github.com/jenius/roots), any project you generate will come with a copy of the roots settings file in the css and/or assets folder. I would list them all out here, but it&#39;s probably easier to just look at them directly.

    [Check out the settings variables &raquo;](https://github.com/jenius/roots/blob/master/templates/new/default/assets/css/_settings.styl)

    ### reset

    When you&#39;re trying to reset browser css, there are three ways to do it. The global reset gets rid of all browser default styles, and can be called with `global-reset()`. In addition, you can use [normalize.css](http://necolas.github.com/normalize.css/) to normalize styles across browsers. Just call `normalize()`. For projects that conform to a vertical rhythm or baseline grid, an alternative version of `normalize()` is available; just call `establish-baseline(&#39;normalize&#39;)`. All of these should be called at root level.

    ### vendor

    Everybody hates vendor prefixing. It&#39;s just a huge pain, and there have been half a million solutions to it. Roots has the best one: don&#39;t worry about prefixes at all, ever. Don&#39;t do anything different. Just write the properties as they appear in the official spec and they will be prefixed for you automatically if necessary when compiled.

      **Examples:**
          `translate: rotate(45deg)`
          `box-shadow: 0 0 5px rgba(#000, .3)`  

    ### positioning

    Let&#39;s face it, writing out absolute, relative, or fixed positioning and the dimensions is a pain and takes a long time. So I ported (read: stole) this incredible couple of utilities from [nib](https://github.com/visionmedia/nib), which allow you to write out positions like such:

    `absolute: top left`
    `absolute: top 5px right`
    `absolute: top left 5px`
    `absolute: bottom 5px left 5px`

    Of course absolute can be substituted for relative or fixed. When you call `top`, `bottom`, `left`, or `right` without a value after it, the value is assumed to be zero.

    ### grid

    There are hundreds of existing grid systems out there, and honestly there is no need to make another one just for roots. So I brought in the most excellent and flexible [semantic.gs](http://semantic.gs), which is truly fantastic. Feel free to check out the documentation on the semantic.gs site - but it&#39;s very easy to use. To set initial styles, call `grid()` at root level. There are a few configuration variables for the grid in the settings file. What follows is an example of a fluid grid with a main area and sidebar.

    <pre>`  grid()

      column-width = 60px
      gutter-width = 20px
      columns = 12
      total-width = 100%

      .main
      .sidebar
        float: left

      .main
        column(9)

      .sidebar
        column(3)`</pre>

    ### utilities

    The utilities module is a mixed bag of moderately to extremely useful css shortcuts.

    **`size()`**
    This is the mixin I use most; it&#39;s a combination of width and height. Pass it a width and height or just one number which is set as the width and height. like this: `size: 50px 20px` or this: `size: 30px`. It defaults to `px` if you don&#39;t pass it a unit, so you can even call it like this if you want: `size: 10 27`

    **`bold()`**
    Bold text. Makes way more sense and is a lot faster.

    **`italic()`**
    Italic text.

    **`normal()`**
    Removes all traces of boldenss and italic-ness from the text.

    **`group()`**
    A way better name for clearfix. Can also be called as `clearfix()` if you really can&#39;t give up the nonsensical word.

    **`inline-block()`**
    Renders `display: inline-block`, except it works in all browsers including old IE.

    **`rounded()`**
    Renders `border-radius: 999px`

    **`no-select()`**
    Sets `user-select` (prefixed) to none so that the text inside the specified element can&#39;t be selected. [More info  on user-select here](https://developer.mozilla.org/en-US/docs/CSS/user-select).

    **`b()`**
    Short alias for `border: 1px solid`.

    **`bg(path, args...)`**
    Shortcut for setting the background to an image. Call it with a quoted image path to render `background: url(path/image.jpg) no-repeat`. If you pass it more arguments after the image path, they will replace `no-repeat`.

    **`font-face(name, folder, weight = normal, style = normal)`**
    Pass a name for the font and the folder it&#39;s in and it will declare the font-face using the lightweight and reliable [fontspring syntax](http://www.fontspring.com/blog/the-new-bulletproof-font-face-syntax). It will look for the font based on `folder/name.extension` - we&#39;ll take care of the extension. So if you passed it like this: `font-face: myfont &#39;/fonts&#39;`, it would look in `/fonts/myfont.ttf` for the ttf file, for example, and the font would be named `myfont` in your css.

    **`triangle(direction = up, size = 10px, color = #000)`**
    Makes a little html triangle. Pass it a direction, size, and color.

    **`image-replace(path, dimensions)`**
    Image replacement. Pass it an image path and the dimensions of the image and it will replace get rid of any text in the div and render an image instead. But it&#39;s still semantic! Can also be called with `ir()`.

    **`raquo()`**
    Puts a [raquo](http://www.raquo.net/) after whatever text is in your div semantically. Because raquos are awesome, but they aren&#39;t really that semantic.

    **`columns(count = 3, gap = 30px, width = null, rule = null)`**
    Column-ize that shit. Takes number of columns, gap between columns, width of each column, and if you want a column rule (syntax like border). Combines `column-count`, `column-gap`, `column-width`, and `column-rule` into one convenient package.

    **`debug()`**
    A moderately useful mixin - drop this at root level and it will put yellow or red borders around objects for which there are errors, like missing alt attributes on images or empty links. Everything valid gets a green border.

    ### typography

    Everyone wants to have typography their own way so I&#39;m not messing with any grids or vertical rhythms or anything here. Just the basics to make your type look nice, and a few shortcuts for uselessly long common properties.

    **`paragraph(size = font-size, margins = true)`**
    Sets the font to the specified size, adds a nice line-height, and unless you turn it off, adds appropriate margins for paragraphs.

    **`fs(size)`**
    A shortcut for `font-size`.

    **`upcase()`**
    `text-transform: uppercase`. Can also be called as `uppercase()`.

    **`downcase()`**
    `text-transform: lowercase`. Can also be called as `lowercase()`.

    **`reset-case()`**
    `text-transform: none`. Just regular case.

    **`h1(), h2(), h3(), h4(), h5(), h6()`**
    Nice default sizes and styles for headings.

    **`link(color = blue, style = underline)`**
    A boilerplate link default style. Uses border-bottom for the underline by default for smooth transitions. The style parameter accepts `underline`, `darken`, `lighten`, or `glow`, and you can pass any valid color to the color parameter.

    **`reset-link()`**
    Takes all the styling off links, including the annoying underline on default styles, and if you have the above link mixin, all borders and hover effects.

    **`text-selection(color = highlight-color, textColor = null)`**
    Sets the text selection color either to the default variable or to any color you pass in. Sets the text color by default to white for dark hilight colors and black for light hilight colors, but you can override it if you want.

    **`ul(style = disc)`**
    A nice, semantic, and unorderd list that scales with the font-size. Takes an optional style, which can be [anything you would pass to](https://developer.mozilla.org/en-US/docs/CSS/list-style-type) `list-style-type` in css.

    **`ol(style = decimal)`**
    Same thing as above, but an ordered list.

    **`inline-list(spacing = 20px)`**
    Put this on a `ul` or `ol` and your list will be inline and work in any browser. Pass an optional spacing value to change the spacing between list items.

    **`reset-list()`**
    Strips a list of all styles that would be there by default or from one of the above mixins.

    **`blockquote()`**
    Nice default style for a blockquote. Expects the quote to be in a nested paragraph element and the citation to be in a cite, footer or figcaption element.

    * * *

    _Each of the below mixins apply styles to elements which means they should be called at root level. If you accidentally call them nested under another element, they will render nothing and add a warning to the console._

    * * *

    **`base(fonts = font-stack, size = font-size, color = font-color)`**
    Applies the default font size, color, and font-family to the body, and adds better anti-aliasing. A great place to start for a custom site.

    **`headers()`**
    Adds roots&#39; header mixins to the `h1` - `h6` tags

    **`lists()`**
    Adds roots&#39; list styles to `ol` and `ul`.

    **`bold-italic()`**
    Adds bold and italic styles to `b`, `i`, `strong`, and `em` tags.

    **`typography()`**
    Executes `bold-italic()`, `headers()`, `text-selection()`, and `lists()`, adds `paragraph()` to the `p` tag, `small-text()` to the `small` tag, `link()` to the `a` tag, and `blockquote()` to the `blockquote` tag - intelligent defaults for all the typography basics.

    ### vertical rhythm

    The vertical-rhythm module is ported directly from [Compass](http://compass-style.org/reference/compass/typography/vertical_rhythm/) and functions in very much the same way, with few subtle differences to fix a margin collapse bug with **normalize.css**. If your project makes use of Normalize and you want vertical rhythm, call `establish-baseline(&#39;normalize&#39;)` instead of the `normalize()` mixin.

    <h4>Configurable Variables

    **`base-font-size = 16px`**
    The base font size.

    **`base-line-height = 24px`**
    The base line height determines the basic unit of vertical ryhthm.

    **`default-rhythm-border-style = solid`**
    Set the default border style for rhythm borders.

    **`relative-font-sizing = true`**
    Set to false if you want to use absolute pixels in sizing your typography.

    **`round-to-nearest-half-line = false`**
    Allows the `adjust-font-size-to` mixin and the `-lines-for-font-size` function to round the line height to the nearest half line height instead of the nearest integral line height to avoid large spacing between lines.

    **`min-line-padding = 2px`**
    Ensure there is at least this many pixels above and below the text.

    **`font-unit = relative-font-sizing ? 1em : base-font-size`**
    `base-font-size`, but in your output unit of choice. Defaults to `1em` when `relative-font-sizing` is `true`.

    #### Constants

    **`browser-default-font-size = 16px`**
    The default font size in all browsers.

    **`base-rhythm-unit = base-line-height / base-font-size * font-unit`**
    The basic unit of font rhythm.

    **`base-leader = (base-line-height - base-font-size) * font-unit / base-font-size`**
    The leader is the amount of whitespace in a line. It might be useful in your calculations.

    **`base-half-leader = base-leader / 2`**
    The half leader is the amount of whitespace above and below a line. It might be useful in your calculations.

    #### Functions

    **`-unitless(number)`**
    `true` if a number has no unit.

    **`-relative-unit(number)`**
    `true` if a number has a relative unit.

    **`-absolute-unit(number)`**
    `true` if a number has an absolute unit.

    **`-rhythm(lines = 1, font-size = base-font-size, offset = 0)`**
    Calculates rhythm units.

    **`-lines-for-font-size(font-size)`**
    Calculates the minimum multiple of rhythm units needed to contain the font size.

    #### Mixins

    **`establish-baseline(font-size = base-font-size)`**
    Establishes a font baseline for the given font size. Alternatively, if the string `&#39;normalize&#39;` is passed; will output a modified **normalize.css** that conforms to a baseline grid.

    **`debug-vertical-alignment()`**
    Show a background image that can be used to debug your alignments. Uses a temporary strategy via [Basehold.it](http://basehold.it) that requires an internet connection.

    **`adjust-font-size-to(to-size, lines = -lines-for-font-size(to-size), from-size = base-font-size)`**
    Adjust a block to have a different font size and line height to maintain the rhythm. `lines` specifies how many multiples of the baseline rhythm each line of this font should use up. It does not have to be an integer, but it defaults to the smallest integer that is large enough to fit the font. Use `from-size` to adjust from a `font-size` other than the `base-font-size`.

    **`adjust-leading-to(lines, font-size = base-font-size)`**
    Adjust a block to have different line height to maintain the rhythm. `lines` specifies how many multiples of the baseline rhythm each line of this font should use up. It does not have to be an integer, but it defaults to the smallest integer that is large enough to fit the font.

    **`leader(lines = 1, font-size = base-font-size, property = margin)`**
    Apply leading whitespace. The `property` can be either `margin` or `padding`.

    **`padding-leader(lines = 1, font-size = base-font-size)`**
    Apply leading whitespace as `padding`.

    **`margin-leader(lines = 1, font-size = base-font-size)`**
    Apply leading whitespace as `margin`.

     **`trailer(lines = 1, font-size = base-font-size, property = margin)`**
    Apply trailing whitespace. The `property` can be either `margin` or `padding`.

    **`padding-trailer(lines = 1, font-size = base-font-size)`**
    Apply trailing whitespace as `padding`.

    **`margin-trailer(lines = 1, font-size = base-font-size)`**
    Apply trailing whitespace as `margin`.

    **`rhythm(l = 0, pl = 0, pt = 0, t = 0, font-size = base-font-size)`**
    Shorthand mixin to apply whitespace for top and bottom margins and padding.
    `l` = `leader`, `pl` = `padding-leader`, `pt` = `padding-trailer`, `t` = `trailer`.

    **`apply-side-rhythm-border(side, w = 1px, lines = 1, font-size = base-font-size, bs = default-rhythm-border-style)`**
    Apply a border and whitespace to any side without destroying the vertical rhythm. The whitespace must be greater than the width of the border.
    `w` = `width`, `bs` = `border-style`

    **`rhythm-borders(w = 1px, lines = 1, font-size = base-font-size, bs = default-rhythm-border-style)`**
    Apply borders and whitespace equally to all sides.
    `w` = `width`, `bs` = `border-style`

    **`leading-border(width = 1px, lines = 1, font-size = base-font-size, border-style = default-rhythm-border-style)`**
    Apply a leading border.

    **`trailing-border(width = 1px, lines = 1, font-size = base-font-size, border-style = default-rhythm-border-style)`**
    Apply a trailing border.

    **`horizontal-borders(width = 1px, lines = 1, font-size = base-font-size, border-style = default-rhythm-border-style)`**
    Apply both leading and trailing borders.

    </h3>

    ### tables

    The tables are ported directly from [twitter bootstrap](http://twitter.github.com/bootstrap/base-css.html#tables), because they did a good job with them. It&#39;s just one mixin which takes care of all the aspects of a nice table.

    **`table(border = true, striped = true, condensed = false)`**
    Add this to a `table` tag to get a nice-looking table. All options are boolean and do just about what they say.

    **`tables()`**
    Root level mixin that just adds `table()` to the `table` tag. Almost always more convenient.

    ### gradients

    Gradients are a huge pain in css, but roots makes life a bit easier on that front. There are a number of methods available that you can utilize to make gradients easier, ranging from finer control to simpler and more generic mixins. All credit for the incredible base gradient logic goes again to [TJ](https://github.com/visionmedia) and [nib](https://github.com/visionmedia/nib), which I shamelessly ported here. Open source ftw!

    **`linear-gradient(start, stops...)`**
    Probably the most insane mixin in this library. It can be used as the value of a background, and will automatically prefix itself with multiple background properties. The way it&#39;s declared is with an optional starting point (top, bottom, left, right, defaults to top if not provided) then gradient stops, which is a percentage followed by a space followed by a color. A few examples:

    `background: linear-gradient(top, red, green, blue)`
    `background: linear-gradient(bottom, red, green 50%, blue)`
    `background: linear-gradient(bottom, red, 50% green, blue)`
    `background: linear-gradient(bottom, red, 50% green, 90% white, blue)`    

    Try experimenting around a bit with this one, you&#39;ll get it quickly.

    <div class="gradient multi"></div>

    **`radial-gradient(stops...)`**
    Creates a radial gradient. Works similarly to `linear-gradient` and supports numerous color stops.

    `background: radial-gradient(white, red)`

    <div class="gradient radial"></div>

    **`gradient(color1, color2)`**
    Simple top-to-bottom two-color gradient. IE support if pie is enabled in settings.

    **`simple-gradient(color, strength = 10%)`**
    Pass the base color, the mixin will lighten and darken it by the specified strength and create a simple gradient with the base color being the middle/average.

    <div class="gradient basic"></div>

    **`noise-gradient(color1, color2, imagePath = &#39;/img/noise.png&#39;)`**
    Roots ships with a tiny light noise image tile which is useful for adding a bit of randomness to an otherwise solid color. This gradient adds that image on top, which gives it a slightly more organic feel. Of course if you have your own noise or other image, you can override the default here.

    **`simple-noise-gradient(color, strength = 10%, imagePath = &#39;/img/noise.png)`**
    Same as simple gradient, but includes the noise image over the top.

    <div class="gradient noise"></div>

    ### forms

    Forms are one of the most difficult and annoying things to style. It&#39;s impossible to make assumptions about the html structure of the forms, so many of the core mixins here just provide basic nicer-looking form fields without trying to align things correctly for you (although a few mixins present that option if you want).

    **`input(color = light-blue, width = 250px)`**
    The most important mixin here. Nice-looking and basic default styles for input fields. Takes an optional color and width, and comes with a style when focused based on the color.

    <input type="text" placeholder="type here" class="input"/>

    **`input-disabled()`**
    Put this on an input and it will style it so that it looks disabled. Make sure to actually disable the input in your html as well.

    <input type="text" placeholder="oh noes!" disabled="disabled" class="input disabled"/>

    **`label(display = inline-block)`**
    Super basic label styles. Pass it an optional value for `display`.

    <div class="field"><label>account number: </label><input type="text" placeholder="####" class="input"/></div>

    **`field(direction = right, width = 370px)`**
    Often times it&#39;s easier to wrap your input and label in a div called `field` so the input and label can be floated, positioned, and manipulated without screwing up the rest of the form. That&#39;s what this mixin is for - put it on a div that contains a label and an input. Then feed it a direction to align (default is right), and an optional width.

    **`input-error(color = red)`**
    Throw this on an input element to give it a red hue indicitive of an egregious error. Best used when applied to a class called `.error`, for example. Can also be called on a wrapper div as `field-error(color)` (if you are using wrapper divs) to color the label text red as well.

    <input type="text" placeholder="errarrrr!" class="input error"/>

    **`input-warning(color = yellow)`**
    Exactly the same as above, but yellow for warning. Can also be called as `field-warning(color)`, same as above.

    <input type="text" placeholder="watch out..." class="input warning"/>

    **`input-success(color = green)`**
    Exactly the same as the two others but with a green color. Again, you can use `field-success(color)` on a wrapper div for the same effect.

    <input type="text" placeholder="wahoo!" class="input success"/>

    * * *

    _These form helpers can be applied at root level to apply defaults intelligently to certain classes and elements._

    * * *

    **`forms()`**
    Applies the `input` mixin to all types of input and if classes of `disabled`, `success`, `warning`, and/or `error` are applied to an input, they are styled appropriately.

    **`fields()`**
    Applies the `field()` mixin to any element with a `field` class. If a `success`, `warning`, or `error` class is applied, they are also styled appropriately.

    ### code

    A simple modules that applies appropriate styles to `code` and `pre` blocks.

    **`code(color = #DF5C33)`**
    Styles inline code snippets on the page. Defaults to a nice attention-catching red, but accepts any other color as well. Used for `all code examples` on this site.

    **`pre()`**
    Monospace font and a light background and border for longer blocks of code.

    <pre class="pre">var it = "all a dream"
    biggie.read("Word Up Magazine")
    limosine = ["Salt &amp; Pepper", "Heavy D"]
    wall.hang("pictures")
    if ((new Date).toString().substr(0,3) == "Sat") {
      var rap_attack = Array.new
      rap_attack.push("Mr. Magic", "Marley Marl")
    }</pre>

    **`code-blocks()`**
    This is a _root level mixin_ which applies the `code` and `pre` mixins to `code` and `pre` elements automatically.

    ### interaction

    This module is where stylus&#39; power really shines. Often times, we find ourselves executing the same types of hover effects over and over. Hover this and it&#39;s underlined. Hover this and it lightens or darkens the background color, etc. This set of mixins are shortcuts for these situations.

    **`hover-darken(percent = 15%)`**
    Looks first for a background color defined on the element, then for a color. If it finds either of these, it will darken them by the specified percentage when the element is hovered. If not, it will throw a warning that the element needs a color or background color.

    <div class="interaction hover-darken">hover-darken</div>

    **`hover-lighten(percent = 15%)`**
    Exact same as above, but it lightens the color instead.

    <div class="interaction hover-lighten">hover-lighten</div>

    **`hover-underline()`**
    Uses border-bottom to add an underline to the specified element on hover. If you already have a border on the bottom, this will probably cause an issue.

    <div class="interaction hover-underline"><span>hover-underline</span></div>

    **`hover-pop(scale = 1.2, rotate = null, shadow = null)`**
    When you hover an element, it will scale up so it appears to be popping out. Works best with a css transition. If you specify a degree measure (like `45deg`), it will rotate that much as it pops, and if you set shadow to true, it will add a little drop shadow as it comes out. An example of a call with all params specified: `hover-pop: 1.2 15deg true`

    <div class="interaction hover-pop">hover-pop</div>

    **`hover-fade(amount)`**
    When the element is hovered, it&#39;s opacity is set to the specified amount (0 - 1, decimal). Also works great with a transition.

    <div class="interaction hover-fade">hover-fade</div>

    **`hover-color(color)`**
    Looks first for a background color, then a color on the current element. If it finds one, it will swap it for the color passed as an argument. Also looks much better with a transition.

    <div class="interaction hover-color">hover-color</div>

    ### easing

    You seriously expect me to write out cubic bezier functions in this $6,800 suit? [Come on!](http://www.youtube.com/watch?v=81Nl7VYFEaI) Roots has all the most common easing functions right here for you, in english™! You can use these anywhere, but they are probably most useful in a transition, like this for example: `transition: all .25s ease-in-sine`. It&#39;s almost like this was actually a part of css like it should be!

    <div class="easing-demo"><div class="ease-in-quad"><div class="name">ease-in-quad</div><div class="animation"><div class="box"></div><div class="line"></div></div></div><div class="ease-in-cubic"><div class="name">ease-in-cubic</div><div class="animation"><div class="box"></div><div class="line"></div></div></div><div class="ease-in-quart"><div class="name">ease-in-quart</div><div class="animation"><div class="box"></div><div class="line"></div></div></div><div class="ease-in-quint"><div class="name">ease-in-quint</div><div class="animation"><div class="box"></div><div class="line"></div></div></div><div class="ease-in-sine"><div class="name">ease-in-sine</div><div class="animation"><div class="box"></div><div class="line"></div></div></div><div class="ease-in-expo"><div class="name">ease-in-expo</div><div class="animation"><div class="box"></div><div class="line"></div></div></div><div class="ease-in-circ"><div class="name">ease-in-circ</div><div class="animation"><div class="box"></div><div class="line"></div></div></div><div class="ease-in-back"><div class="name">ease-in-back</div><div class="animation"><div class="box"></div><div class="line"></div></div></div><div class="ease-out-quad"><div class="name">ease-out-quad</div><div class="animation"><div class="box"></div><div class="line"></div></div></div><div class="ease-out-cubic"><div class="name">ease-out-cubic</div><div class="animation"><div class="box"></div><div class="line"></div></div></div><div class="ease-out-quart"><div class="name">ease-out-quart</div><div class="animation"><div class="box"></div><div class="line"></div></div></div><div class="ease-out-quint"><div class="name">ease-out-quint</div><div class="animation"><div class="box"></div><div class="line"></div></div></div><div class="ease-out-sine"><div class="name">ease-out-sine</div><div class="animation"><div class="box"></div><div class="line"></div></div></div><div class="ease-out-expo"><div class="name">ease-out-expo</div><div class="animation"><div class="box"></div><div class="line"></div></div></div><div class="ease-out-circ"><div class="name">ease-out-circ</div><div class="animation"><div class="box"></div><div class="line"></div></div></div><div class="ease-out-back"><div class="name">ease-out-back</div><div class="animation"><div class="box"></div><div class="line"></div></div></div><div class="ease-in-out-quad"><div class="name">ease-in-out-quad</div><div class="animation"><div class="box"></div><div class="line"></div></div></div><div class="ease-in-out-cubic"><div class="name">ease-in-out-cubic</div><div class="animation"><div class="box"></div><div class="line"></div></div></div><div class="ease-in-out-quart"><div class="name">ease-in-out-quart</div><div class="animation"><div class="box"></div><div class="line"></div></div></div><div class="ease-in-out-quint"><div class="name">ease-in-out-quint</div><div class="animation"><div class="box"></div><div class="line"></div></div></div><div class="ease-in-out-sine"><div class="name">ease-in-out-sine</div><div class="animation"><div class="box"></div><div class="line"></div></div></div><div class="ease-in-out-expo"><div class="name">ease-in-out-expo</div><div class="animation"><div class="box"></div><div class="line"></div></div></div><div class="ease-in-out-circ"><div class="name">ease-in-out-circ</div><div class="animation"><div class="box"></div><div class="line"></div></div></div><div class="ease-in-out-back"><div class="name">ease-in-out-back</div><div class="animation"><div class="box"></div><div class="line"></div></div></div></div>

    ### buttons

    This begins the UI section of roots, which is designed to be as modular and flexible as possible. Since the buttons are so complex, they are split into their own section, and below this is a collection of other smaller UI components.

    **`simple-button(color = default, size = &#39;medium&#39;)`**
    A simple, flat, one-color button. Example below. Takes a color and a size. Color can be any valid color, and the size can be `small`, `medium`, `large`, or a number from 1 to infinity, no units necessary.

    <div class="btn-simple">click me!</div><div class="btn-simple red">i'm brighter!</div><div class="btn-simple black">i'm not : (</div>

    **`button(color = default, size = &#39;medium&#39;)`**
    A more shinier and modern button, same parameters as the simple button. Any color, any size. Very flexible and useful. Example below.

    <div class="btn">no me, i'm shinier</div><div class="btn purple">me, i'm fabulous!</div><div class="btn white">i'm so pure</div>

    **`button-disabled()`**
    Lay this mixin down on any axis button and it will appear to be disabled. Again, make sure you actually disable it in your html.

    <div class="btn disabled">don't click me :(</div>

    **`buttons()`**
    This is _a root level mixin_ that applies the `simple-button` mixin to the class `btn-simple` and the `button` mixin to the class `btn`. If you add a `disabled` class to either one, it will render appropriately as well.

    ### ui

    There are a variety of UI components I find myself using over and over which I&#39;ve tried to abstract into flexible mixins here.

    **`area(color = #f5f5f5)`**
    Light grey background, padding, and subtle inner shadow provide a nice box around some content. You can change the color, but don&#39;t get too crazy.

    <div class="area">hello, i'm just a humble area. you can put content in me.</div>

    **`notice(width = false, color = #f5f5f5)`**
    This is best used in notifications or flash messages, as will be seen below. This is the version that you can customize more - just a rectangular box with bold text and a light gradient in the background, intended for sitting at the top of the screen and notifying the user of something.

    <div class="notice">look at me!</div>

    **`flash(type = notice)`**
    This is a standard notice, but comes pre-populated with the four most common flavors. `notice`, `success`, `error`, and `warning`. Examples below.

    <div class="flash notice">hey, i have something to tell you</div><div class="flash warning">you'd better watch yourself son</div><div class="flash error">delete the logs! we've been breached!</div><div class="flash success">awwww yeaahhh - you won life!</div>

    **`breadcrumb(character = &#39;/&#39;, spacing = 10px, divider-color = #cdcdcd)`**
    Place this on a `ul` and it will create an inline list separated by the specified character. Nice for breadcrumb trails - example below.

    <div class="breadcrumbs">

*   system
*   bin
*   roots
*   mixins
*   breadcrumb</div>

    **`bubble(pointer = left, color = #eee, width = false)`**
    Creates a little speech bubble. Specify if you want the pointer on the `left`, `center`, or `right`, add a color, and set a width if you&#39;d like. Very helpful, example below.

    <div class="bubble">hey girl, check out my curves</div>

    **`figure(color = default, dimensions = false)`**
    Place this on a figure element and it will nicely style an `img` and `figcaption` nested inside. Example below.

    <figure>![](/img/zebra.jpg)<figcaption>a fine specimen of zebra. a fine specimen indeed.</figcaption></figure>

    **`navigation(size = 1, color = #222, link-color = #fff, fixed = true)`**
    Creates a standard navigation bar. The size parameter just scales everything up or down, the rest is self-explanitory. Make sure to put this mixin on a `nav` element with a  `ul` and/or `h1` inside for the navigation and title respetively. Example coming soon.

    **`flash-notices()`**
    This is a _root level mixin_ which adds the appropriate flash notification mixin to elements with the classes `.flash .error`, `.flash .success`, `.flash .notice`, or `.flash .warning`. Must have both of the classes. It will make sense once you start styling them.

    ### animation

    There are a bunch of animations available in axis that have been ported from [animate.css](http://daneden.me/animate/). If you @import `axis/animation`, they will be made available and you can use any of them in your project. Note that any animation with &quot;big&quot; at the end has been left out because these are horrendous and should never be used. And if you really want to use it, you can write it yourself. An example of usage would be as such:

    <pre>`  @import &#39;axis/animation&#39;
      .test
        animation: bounce 3s infinite