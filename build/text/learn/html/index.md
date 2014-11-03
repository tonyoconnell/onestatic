HTML5
====
Semantic Page Structure
------------------------

```HTML
<!DOCTYPE HTML>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Website Title</title>
</head>
<body>
    <header>
        <h1>Logo</h1>
        <nav>
          <ul>
              <li>Menu 1</li>
              <li>Menu 2</li>
          </ul>
        </nav>
    </header>
    
    <section>
        <article>
            <header>
                <h3>Title</h3>
                <p>Posted on <time datetime="2013-01-04T13:19:20">04/01/2013</time></p>
            </header>
            <p>Lorum ipsum.</p>
        </article>
    </section>
    <aside>
        <h3>Sidebar</h3>
        <p>Lorum ipsum.</p>
    </aside>
    <footer>
        <p>Lorum ipsum.</p>
    </footer>
</body>
</html>
```

Simplify to Jade
-----------------
```jade
doctype html
html
  head
    meta(http-equiv='Content-Type', content='text/html; charset=UTF-8')
    title Website Title
  body
    header
      h1 Logo
      nav
        ul
          li Menu 1
          li Menu 2
    section
      article
        header
          h3 Title
          p
            | Posted on
            time(datetime='2013-01-04T13:19:20') 04/01/2013
        p Lorum ipsum.
    aside
      h3 Sidebar
      p Lorum ipsum.
    footer
      p Lorum ipsum.
```