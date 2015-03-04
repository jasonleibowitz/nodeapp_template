# Node App Template Readme

## Project Information

### Tools
This project uses the following tools for development.
* [Node.js](http://nodejs.org/)
* [Ruby](https://www.ruby-lang.org/en/)
* [CSS](http://www.w3.org/Style/CSS/Overview.en.html) via [SASS Transpilation](http://sass-lang.com/)
* [EC5 JavaScript](http://www.ecma-international.org/publications/standards/Ecma-262.htm) via [EC6 *("Harmony")*](http://wiki.ecmascript.org/doku.php?id=harmony:specification_drafts#draft_specification_for_es.next_ecma-262_edition_6) [Transpilation](https://babeljs.io/)
* [Grunt](http://gruntjs.com/)


### Directory Structure
The following describes the directory structure for this project, beginning at the root. Files or folders that are omitted or without annotation are unrelated to application development and should not be modified.

- **/path**
	- **/assets**
		- **/images** - *All static assets live here*
		- **/js** - *The final destination for compiled / minified js files and sourcemaps*
		- **/styles** - *The final destination for compiled / minified css files and sourcemaps*
	- **/views**
		- **/layout**
			- **layout.ejs** - *The master layout file (html, head, body, script / css inclusions). Individual screen ejs files are included in the body here.*
			- **global.js** - *JavaScript pertaining to all screens.<sup>**1**</sup>*
			- **global.scss** - *SASS pertaining to all screens.<sup>**1**</sup>*
			- **reset.scss** - *CSS resets*
			- **mixins.scss** - *SASS Mixins and functions for global use*
			- **vars.scss** - *SASS variables and maps for global use*
		- **/&lt;screen&gt;** - *All files pertaining to a particular screen (html, js, sass) live here.<sup>**1**</sup>*
			- **&lt;filename&gt;.js** - *JavaScript particular to this screen.<sup>**1**</sup>*
			- **&lt;filename&gt;.ejs** - *The HTML body for this individual screen (included in the main layout file's body tag).*
			- **&lt;filename&gt;.scss** - *SASS particular to this screen.<sup>**1**</sup>*

<sup>**1**</sup> *Note: All JavaScript and SASS files are concatenated and included / available on every screen. The global and screen-specific file hierarchy is purely for organizational purposes.*



## Getting Started

This repository contains all of the commands needed to set up its own environment, and build all necessary phases of the project.

After cloning this repo, and before you get started making changes, please do the following:


#### Install Node.js

This project uses [Node.js](http://nodejs.org/) and [NPM](https://www.npmjs.com/) for:
* Package management
* Task running
* As a development web server

If you do not already have Node installed, you can find binary downloads [Here](http://nodejs.org/download). Alternatively, you may install it with your favorite package manager ([Homebrew](http://brew.sh/), [Macports](https://www.macports.org), etc.)


#### Install Ruby

This project requires [Ruby](https://www.ruby-lang.org) for SASS transpilation.

If you do not already have Ruby installed, you can find binary downloads [Here](https://www.ruby-lang.org/en/downloads/). Alternatively, you may install it with your favorite package manager ([Homebrew](http://brew.sh/), [Macports](https://www.macports.org), etc.)


#### Initialize Your Environment

* Run the command ```npm run init``` from the project root.

*Note: Requires super user privileges*

This command will install all locally and globally dependent node modules / ruby gems, and configure git hooks to ensure repository cleanliness.

*Note: You will not be able to lift the server for development until you run this command*


## Development

To being development:

* Run the command ```grunt dev``` from the project root.

This will do the following:
* Ensure your environment is properly initialized
* Start the web server
* Open your default browser to the home page
* Begin watching files for changes<sup>**1**</sup>

<sup>**1**</sup> *When grunt recognizes that dependant file has been modified, it will:*
* *Rebuild the project via the ```build:dev``` task*
* *Reload the browser to reflect file changes*


### Building The Application
To build the application manually, the following grunt commands are available:

* ```grunt build:dev``` - This concatenates and transpiles all neccesary JavaScript and SASS files for development.
* ```grunt build:prod``` - This lints, concatenates, transpiles, and minifies all necessary JavaScript and SASS files for release.


### Linting the Application Source

To confirm code quality, cleanliness, and formatting, the following grunt commands are available.

* ```grunt lint:sass``` - Lints all SASS files *(via scss-lint)*
* ```grunt lint:js``` - Lints all JavaScript files *(via jshint)*
* ```grunt lint``` - Runs both ```grunt lint:sass``` and ```grunt lint:js```.


### Git Hooks
This repository has git hooks in place to ensure that only code following various quality, cleanliness, and formatting standards may be committed.

Attempts to commit code that does not pass the ```grunt lint``` command will fail, and provide an error report to assist in making your code compliant.

See "Linting the Application Source" for more details.

## Lazard Website Best Practices

We've spent a lot of time thinking about the best way to build the Lazard website logically and efficiently. The following guidelines represent that thinking.

#### Global Styles

All global styles should live in the ```global.scss``` document. You can further edit global styles on specific page sass files.

#### Main

The main content of a page, i.e. everything except the nav, header, and footer, sits inside a ```<main>``` tag.

#### Modules

Each page is made up of at least one module. A module is like a tile, a white box that contains some kind of information. Modules are section elements and contain a type attribute that you can access in the sass file.

	home.ejs

	<section class="module" type="about">
	</section>

The style for modules and their titles and content are global. Specific module's can by styled in the sass file.

	home.scss

	.module[type=about] {
		@include size(100%);
		background-color: $background-color;
		padding-top: 10px;
	}

#### Contacts Module

There is a pre-defined contacts module in the ```global.scss``` file because it is used a number of time. To properly use this module, follow the following ```ejs``` template

	home.ejs

	<section class="module" type="contacts">
		<h2 class="title">{{page.title}}</h2>
		<div class="contact-wrap">
			<div class="name">{{contact.name}}</div>
			<div class="phone">
				<span class="phone-number">{{contact.phone.number}}</span>
				<span class="label">{{contact.phone.label}}</span>
			</div>
			<div class="email"><a href="mailto:{{contact.email}}">{{contact.email}}></div>
		</div>
	</section>

#### Sass Mixins

**style** - we have created a custom mixin that will load all attributes for a specific element from the [Lazard Style Guide](http://internal.tigerspike.com/client/lazard/design-guide/wireframes/styleguide.html). When calling the style mixin the first argument is the element type, and all subsequent elements are what properties you want to load. You can put ```all``` as the second argument to load all attributes.

	@include style(h2, all);

	==Output==>

	color: rgb(0, 0, 0);
	font-size: 24px,
	font-weight: 200;
	font-style: italic;

In the above example we're loading all elements of h2. Elements to be loaded are defined in the styleguide map, which can be found in vars.scss.

Most styleguide elements are already loaded in ```global.scss```.

**font-size** - we are using ```rem``` to define font size. Rather than figuring out the math yourself, we have created a Sass mixin to calculate it for you.

	@include font-size(12px);

	==Output==>

	1.2rem

**border** - we have global style elements for borders under ```<hr>```

**size** - we have created a mixin to define width and height. The first argument is width, and the second is height. If you only specify one argument, width and height are both set to that.

	@include size(20px)

	==Output==>

	width: 20px;
	height: 20px;

**color** - When defining color you can use this custom function to easily convert any color type (hex, hsl, rgb[a] named) and opacity into rgba.

	color: color(#fff, 1);

	==Output==>

	color: rgba(255, 255, 255, 1);

**color functions** - We also defined a number of color functions that take an opacity argument:

* black() => #000
* white() => #fff
* red() => rgb(255, 0, 0)
* green() => rgb(0, 255, 0)
* blue() => rgb(0, 0, 255)

	```
	color: black(0.8);

	==Output==>

	color: rgba(0, 0, 0, 0.8);
	```

**images** - Only static images can be background images. All other images should be inline

**paragraph tags** - all ```<p>``` tags are styles after the stylemap's ```body-text```

**HTML5 tags** - use HTML5 elements whenever possible. Instead of using ```<div>``` for every element, try to use ```<section```, ```<header>```, etc. [More info here](http://websitesetup.org/html5-cheat-sheet/).

**raw text with siblings** - Do not place raw text with sibling elements, i.e.

	<div>text<span>text2</span></div>

