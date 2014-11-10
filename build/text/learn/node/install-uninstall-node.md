Mac OSX Preperation
http://bevry.me/learn/node-install

Download & Install Git
Download & Install Xcode
Install Xcode Command Line Tools:

xcode-select --install

//Install homebrew then Node
ruby -e "$(curl -fsSL https://raw.github.com/Homebrew/homebrew/go/install)"
brew install node



Install Node.js Via Mac OSX Installer

Uninstall any previous Node.js versions you may already have
Download & Install the Node.js Mac OSX Installer http://nodejs.org/dist/v0.10.25/node-v0.10.25.pkg
Ensure the correct permissions are set by running the following in Terminal:

sudo chown -R $USER /usr/local

Other ways

https://gist.github.com/isaacs/579814


Install Node Version Manager
============================
Uninstall any previous Node.js versions you may already have
Install NVM by running the following in Terminal:

git clone git://github.com/creationix/nvm.git ~/.nvm
printf "\n\n# NVM\nif [ -s ~/.nvm/nvm.sh ]; then\n\tNVM_DIR=~/.nvm\n\tsource ~/.nvm/nvm.sh\nfi" >> ~/.bashrc
NVM_DIR=~/.nvm
source ~/.nvm/nvm.sh
Install Node.js by running the following in Terminal:

nvm install v0.10.25
nvm alias default 0.10
nvm use 0.10


Fix Permissions
=================
whoami
sudo chown -R tony /usr/local

export PATH=./node_modules/.bin:$PATH


Uninstall Node
==============

wget https://gist.github.com/nicerobot/2697848/raw/uninstall-node.sh
chmod +x ./uninstall-node.sh
./uninstall-node.sh
rm uninstall-node.sh

If you installed node from their website can try this

sudo rm -rf /usr/local/{bin/{node,npm},lib/node_modules/npm,lib/node,share/man/*/node.*}


