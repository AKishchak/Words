#!/bin/bash
set -e # exit with nonzero exit code if anything fails

# go to the out directory and create a *new* Git repo
cd dist
git init

# inside this git repo we'll pretend to be a new user
git config user.name "Travis CI"
git config user.email ""

# The first and only commit to this new Git repo contains all the
# files present with the commit message "Deployed: DATE".
git add .
NOW=$(date +"%m-%d-%Y %T")
git commit -m "Deployed: $NOW"

# Force push from the current repo's master branch to the remote
# repo. (All previous history on the gh-pages branch
# will be lost, since we are overwriting it.) We redirect any output to
# /dev/null to hide any sensitive credential data that might otherwise be exposed.

git push --force --quiet "https://${GITHUB_TOKEN}@${GITHUB_REPOSITORY}" gh-pages > /dev/null 2>&1

#Source https://gist.github.com/domenic/ec8b0fc8ab45f39403dd
