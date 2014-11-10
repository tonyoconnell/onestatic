Sublime Text 3
iTerm
Bash Profile
------------
Since Mac OS X is a full 64-bit system, we’ll save some headaches by letting our compiler know that all compilation should assume 64 bits. Also, since Mac OS X’s default PATH is /usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin, we’ll want to change it so that certain Homebrew installations (e.g., Python) will take precedence over stock OS X binaries. To make these changes, open ~/.bash_profile 

nano ~/.bash_profile

# Set architecture flags
export ARCHFLAGS="-arch x86_64"
# Ensure user-installed binaries take precedence
export PATH=/usr/local/bin:$PATH
# Load .bashrc if it exists
test -f ~/.bashrc && source ~/.bashrc

Since the above directives will take effect on the next login, let’s go ahead and source the file to ensure it takes effect for the current session:

. ~/.bash_profile

XCode
-----
xcode-select --install

Click install to install command line developer tools

OhMyZSH
-------
http://ohmyz.sh/

ls -al
.zshrc (Configure Here)
.om-my-zsh/custom/plugins

.zshrc

export PATH=/usr/local/bin:$PATH


Homebrew 
---------
ruby -e "$(curl -fsSL https://raw.github.com/mxcl/homebrew/go/install)"

brew doctor



Git
===

brew install git

git config --global user.name "tonyoconnell"
git config --global user.email "tony@one.ie"

git credential-osxkeychain

git config --global credential.helper osxkeychain


Setup Keys
----------
cd ~/.ssh
cd:cd:13: no such file or directory: /Users/tony/.ssh
ONE ➜  ~  ssh-keygen -t rsa -C "tony@one.ie"
Generating public/private rsa key pair.
Enter file in which to save the key (/Users/tony/.ssh/id_rsa):
Created directory '/Users/tony/.ssh'.
Enter passphrase (empty for no passphrase):

ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC8RE2hfeTpBYoMa3dV1wmpqg5CeW1u2DxFhFnqSxesGo9enrT6/8uZAv6ZNR0J4x9Qaij3A4JflJG1kM73fFuxPWIuMuuu/cyZHchDIGLTvnpg6WfmLOQ/kQIHfohN1glimg4luapm1Oqedw36TPlbLBW8UhIltvK0ApjtwyrrbnH24N/xGtF05vYWdI5b//knoTEGdPQdG6ipwtjk1Lx1JWH4wGbkUeA+dHkvUmLpsJ5tOoFKhXBme+RAFS97mEk4/iXm1SpVzCIWCZbyJtC+72NG3RlGzVx+hx90Tf0cepg/WRaJGbuYnvaMhWAwXs6Yz8LJpaLHSJsA81C6fJq/ tony@one.ie

Visit your account settings.
Click Add SSH key.
Enter a descriptive title for the computer you’re currently on, e.g. “Work iMac” into the Title field.
Paste your key into the Key field (it has already been copied to your clipboard).
Click Add Key.
Enter your Github password.
Now let’s test that it all worked.

ssh -T git@github.com

SSHPASS
brew install https://raw.github.com/eugeneoden/homebrew/eca9de1/Library/Formula/sshpass.rb

Shuttle
-------



Node
----

brew install node

npm install -g gulp

Sublime Text
------------




dnsmasq
alfred





http://clickontyler.com/virtualhostx/

http://www.damln.com/log/setup/

Gas Mask - Edit Hosts

Sequel Pro


Integrity

Alfred scripts
http://jdfwarrior.tumblr.com/post/7380798414/alfred-0-9-9-scripts-now-available
http://aiyo.dk/alfredapp/
https://github.com/aiyodk/Alfred-Extensions/tree/master/AlfredApp_2.x