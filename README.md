Before you can build The JHipster Mini-Book, you must install and configure the following dependencies on your machine:

* [Git|http://git-scm.com/]: [The Github Guide to Installing Git|https://help.github.com/articles/set-up-git/] is a good source of information.
* Node.js: We use Node to run a development web server. Depending on your system, you can install Node either from source or as a pre-packaged bundle.

After installing Node, you should be able to run the following command to install development tools (like BrowserSync). You will only need to run this command when dependencies change in package.json.
```
#!shell
npm install
```
We use Grunt as our build system. Install the grunt command-line tool globally with:
```
#!shell
npm install -g grunt-cli
```
Run the following grunt command to create a blissful development experience where your browser auto-refreshes when files change on your hard drive.

grunt serve