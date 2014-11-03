Rupture
=======

All of the functions provided by rupture are block mixins, which means that they must be called with a + prefix and a block of stylus should be nested inside them.

Before getting started, I would recommend reading this to better understand the concept that we're trying to hit.

Variables

A few variables are exposed that can be customized, each of them are listed below:

mobile-cutoff

Pixel value where the mobile mixin kicks in, also the lower bound of the tablet mixin.

desktop-cutoff

Pixel value where the desktop mixin kicks in, also the upper bound of the tablet mixin.

scale

A list of values that you can reference by index in most of the mixins listed below. This works exactly like breakpoint-slicer. Default looks like this:

scale = 0 400px 600px 800px 1050px
Mixins

So there are two "categories" of mixins that are a part of rupture. The first is a very basic set designed to simply shorten and sweeten standard media queries, and the second is a very close port of the fantastic breakpoint-slicer library, which can be used almost as a grid. We'll go through these in order.

+above(measure)

When the screen size is above the provided measure, the styles in the block will take effect.

+from(measure)

Alias of above. Styles take effect from the provided measure and above.

+below(measure)

When the screen size is below the provided measure, the styles in the block will take effect.

+to(measure)

Alias of below. Styles take effect from zero up to the provided measure.

+between(measure, measure)

When the screen size is between the two provided measure, the styles in the block will take effect.

+at(measure)

Intended for use with scale measures, when the screen size is between the provided scale measure and the one below it, the styles in the block will take effect. For example, if your scale was something like scale = 0 400px 600px, and you used the mixin like +at(2), it would kick in between 400 and 600px (remember, scale is zero indexed, so 2 is the third value, and one less is the second). If you use this with a value, it will not have much effect, as it will be at one specific pixel value rather than a range like you want.

+mobile()

When the screen size is 400px (defined by mobile-cutoff) or less, the styles in the block will take effect.

+tablet()

When the screen size is between 1050px (defined by desktop-cutoff) and 400px (defined by mobile-cutoff), the styles in the block will take effect.

+desktop()

When the screen size is 1050px (defined by desktop-cutoff) or more, the styles in the block will take effect.

+retina()

When the device has a pixel density of over 1.5 (retina), the styles in the block will take effect.