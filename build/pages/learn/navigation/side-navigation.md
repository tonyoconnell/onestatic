Side Navigation
================
Put this in the head

```
<script type="text/javascript">
  var snapper = new Snap({
                element: document.getElementById('content')
            });
            addEvent(document.getElementById('ol'), 'click', function(){
                snapper.open('left');
            });

            addEvent(document.getElementById('or'), 'click', function(){
                snapper.open('right');
            });
</script>
```