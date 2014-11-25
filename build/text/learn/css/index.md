CSS
===
Positioning 
----------
### Static
This is how elements are positioned in the document if you don't specify anything else. 

### Relative
Use relative position so you can use top, bottom, left and right to move items relative to where whey would normally be in the document

```stylus
example {
 position:relative;
 top:20px;
 left:-40px;
}
```

### Absolute
Use absolute position to remove items from the document. If you put them inside a parent with position relative then they will be positioned relative to the parent, otherwise they will be positioned from the start

```stylus
.container
	position relative
.example
	position absolute
	top 0
	left 100px
	width 200px


