#Room Booking App

## How to start project:
1. download and install [Ruby] (http://rubyinstaller.org/downloads/) - it will allow usage of SASS in project
2. instal NPM - installation guide can be found on [NPM site] (https://docs.npmjs.com/getting-started/installing-node) (skip this step if you have npm installed)
3. when you have npm installed open command line in folder with project
4. from command line run command **npm install -g bower** - bower will be responsible for managing dependencies, libraries, etc.
5. from command line run command **npm install -g grunt-cli** - grunt handle tasks like starting project, running test and other things that can be made automatically.
6. from command line run command **gem update --system**
7. from command line run command **gem install compass**
8. from command line run command **npm install compass** - facilitates managing css 
9. from command line run command **npm install** and **bower install** - they will download and insall all plugins and dependencies for project.
10. Run project using grunt command: **grunt serve** - this command will automatically start app and open default page of application (login page)

### DON'T USE ANY LANGUAGE NATIVE LETTERS IN FOLDER NAME!!!###
If you use any language native letters (like Ł, Ę, Ą, etc.) in project folder name **compasss** will fail to launch properly and will return error "incompatible encoding"

## Making changes
When you make changes in html, css, js files just refresh page and all changes will be applied.

## Stop running application
To stop application use shortcut **ctrl + c**
