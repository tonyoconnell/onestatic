Git
===
Quick start
-----------
    cd ~/Websites/one/
    git checkout -b slideshow
    git add --all
    git commit -m "message"
    git push -u origin importing
    git checkout master
    git merge importing
    git push -u origin master

Get software
---------------
Go into the folder where you want to place the software

    cd ~/Websites/

Clone the software from GitHub to your machine

    git clone https://github.com/tonyoconnell/one.git one

Navigate
---------
Branches make it easy to add, integrate and undo changes. Create one for each new each feature, app or design. Checking out a branch makes the entire working folder match that branch. This can be used to view a different state of your project without altering your current state in any way. Lets make a new branch for a slideshow and check it out.

    git checkout -b slideshow

Adding -b tells git to make a new branch. It is the same as ...

    git branch slideshow
    git checkout slideshow

Make sure you are working in (have checked out) the right branch while you make your changes.

    git branch    

Stage your changes
------------------
The staging area allows you to save changes until you are ready to commit them. Add changes into your staging area using git add.

    git add --all
    git add directory
    git add file

Commit your changes
-------------------
Commit your staged snapshot to the project.

    git commit -m "message"

Add extra files to your commit from your staged area

    git commit --amend    

Undo
-----------------

Revert to old repo

    git reset --hard 70be30bf41
    git push –f origin master


Return to the master branch. All files on in your local folder will be the same as the last time you committed 
    
    git checkout master (makes everything like your master repo on GitHub)
    git checkout HEAD^ file.zip (for one revision back)
    git checkout engineering/gulpfile.js 
    git checkout 324234324 
    git checkout master~5 image.png
    

### Undo git add -all

Unstage changes added to the staging area. Move mistakenly committed files back to the staging area from the previous commit, without cancelling the changes done to them. 

    git reset


Rollback 
---------
Delete all changes (not committed) and return to the last committed state. WARNING: you will loose all work that has not been committed. 

    git reset --hard HEAD

    git checkout 4353453 .

The . at the end will apply changes to the whole tree. 

Remove Untracked Changes
-----------------------
Delete all (untracked) local files from current branck
git clean -f -d 

Try a dry run first by adding -n to it

git clean -f works only in the directory where it's called (and subdirectories). If you want to clean the whole working copy, you should call it in its root directory


Merge a branch
---------------
Merge work from slideshow branch and its parents into master. You can merge into any branch

    git merge master

Deploy
------ 
Git add moves local changes into the staging area. 
    cd ~/Websites/one/
    git add --all
    git commit -m "one"
    git push -u origin master

Observe
------- 
Show what files changed

    git status 

Show files committed to the staging server

    git diff --cached 

git log --oneline | shows the log of comits. q quits out of it
git show –format=oneline a3456456 | show what happened
git diff | what’s different in all files
gif diff file.text 
git diff --staged | show difference between working and staging
git branch | lists branches 








Then reset the unwanted files in order to leave them out from the commit:

git reset HEAD path/to/unwanted_file

Now commit again.


Undo a commit - move mistakenly 
   git push -u origin master


git rm file.txt | removes file from pc and repo

git checkout | go to repo get the named thing and make local system look like it
git checkout -- file.html | get that file. the dash says stay in that branch
git reset HEAD file.html | unstage that file



escape + :q | quits vim

git clean -f | removes files in staging directory

git branch | lists branches 
git branch new-branch | creates a new branch
git checkout new-branch
git checkout -b new-branch | create new branch and checkout
git diff master..new-branch
git diff color-words master..new-branch
git branch -merged | shows the branches that are merged into the current branch
git branch -m new-branch newname | rename branch
git branch -d delete-this | delete branch

to merge
git checkout master 
git merge new-branch
to exit vim press ESC > ZZ



pulling down repo for the first time

git init .
cd ~/.ssh
ssh-keygen -t rsa -C "tony@one.ie"
less id_rsa.pub 
copy the key and add it to github https://github.com/tonyoconnell/one/settings/keys
git pull git@github.com:tonyoconnell/mco.git
password 1hundred$

git clone git@github.com:tonyoconnell/one.git public_html
git clone git@github.com:tonyoconnell/mco.git html one2345$
git clone https://github.com/sferik/sign-in-with-twitter.git newfolder (sets name of folder) 


git clone git@github.com:tonyoconnell/nilpeter.git www	

git reset --hard HEAD~5 | go back 5

To Remove All gitignored files on Github
git rm -r --cached . 
git add . 
git commit -m ".gitignore is now working"

# This will detach your HEAD, i.e. leave you with no branch checked out:
git checkout 0d1d7fc32
or if you want to make commits while you're there, go ahead and make a new branch while you're at it:

git checkout -b old-state 0d1d7fc32
If, on the other hand, you want to really get rid of everything you've done since then, there are two possibilities. One, if you haven't published any of these commits, simply reset:

# This will destroy any local modifications.
# Don't do it if you have uncommitted work you want to keep.
git reset --hard 0d1d7fc32

# Alternatively, if there's work to keep:
git stash
git reset --hard 0d1d7fc32
git stash pop
# This saves the modifications, then reapplies that patch after resetting.
# You could get merge conflicts, if you've modified things which were
# changed since the commit you reset to
On the other hand, if you've published the work, you probably don't want to reset the branch, since that's effectively rewriting history. In that case, you could indeed revert the commits. With git, revert has a very specific meaning: create a commit with the reverse patch to cancel it out. This way you don't rewrite any history.

# This will create three separate revert commits:
git revert 0766c053 25eee4ca a867b4af

# It also takes ranges. This will revert the last two commits:
git revert HEAD~2..HEAD

# To get just one, you could use `rebase -i` to squash them afterwards
# Or, you could do it manually (be sure to do this at top level of the repo)
# get your index and work tree into the desired state, without changing HEAD:
git checkout 0d1d7fc32 .
# and then commit
git commit    # be sure and write a good message describing what you just did

Troubleshooting

    .git/index.lock

