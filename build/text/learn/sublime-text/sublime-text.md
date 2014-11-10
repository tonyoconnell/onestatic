Install Package Control
------------------------

The simplest method of installation is through the Sublime Text console. The console is accessed via the ctrl+` shortcut or the View > Show Console menu. Once open, paste the appropriate Python code for your version of Sublime Text into the console.

```python
import urllib.request,os,hashlib; h = '7183a2d3e96f11eeadd761d777e62404' + 'e330c659d4bb41d3bdf022e94cab3cd0'; pf = 'Package Control.sublime-package'; ipp = sublime.installed_packages_path(); urllib.request.install_opener( urllib.request.build_opener( urllib.request.ProxyHandler()) ); by = urllib.request.urlopen( 'http://sublime.wbond.net/' + pf.replace(' ', '%20')).read(); dh = hashlib.sha256(by).hexdigest(); print('Error validating download (got %s instead of %s), please try manual install' % (dh, h)) if dh != h else open(os.path.join( ipp, pf), 'wb' ).write(by)
```

This code creates the Installed Packages folder for you (if necessary), and then downloads the Package Control.sublime-package into it. 


Themes
------

Select "Install Package" from the Command Palette: Ctrl+Shift+P on Windows and Linux or ⇧⌘P on OS X)
Search for "Monokai Extended" and click enter.

Then inside Sublime Text, go to Preferences -> Color Scheme -> User -> Monokai Extended


Markdown
--------
Select "Install Package" from the Command Palette: Ctrl+Shift+P on Windows and Linux or ⇧⌘P on OS X)
Search for "Markdown Extended" and click enter.

Activate this Language

After installing this package, open a markdown file and switch the language to Markdown Extended, using one of the following methods:

Select from the list of supported languages in your status bar at the bottom right corner of your editor
ctrl + shift + p and search for "Markdown Extended"
3. Make "Markdown Extended" the default

To make Markdown Extended the default highlighting for the current extension:

Open a file with the extension you want to set a default for (i.e. .md)
Navigate through the following menus in Sublime Text: View -> Syntax -> Open all with current extension as... -> Markdown Extended

Jade
------
Jade
Jade Snippets https://github.com/P233/Jade-Snippets-for-Sublime-Text-2
Bootstrap Jade https://github.com/rs459/bootstrap3-jade-sublime-plugin

Stylus
------
Stylus

Haiku
---- 
https://github.com/hayaku/hayaku#readme

Emmet
------
http://docs.emmet.io/


