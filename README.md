# MOONSAULT

A super lightweight framework for building applications with native web components and ES6 modules. Moonsault has a few goals:

1. Use native web technologies to create a framework for building applications. Nothing proprietary. Nothing special.
2. Allow individual applications within the framework to set up public APIs to allow for data sharing. Moonsault does not have restrictions on how data can be shared since any public method could be used to send data to another public method.
3. Pages and components are simple web components with their own public and private APIs.
4. ES6 modules and imports can be leveraged to split up the codebase into easy to manage parts.
5. Build processes are supported, but not required in order to facilitate deployment to any environment.

# Table of Contents

- [Getting Started](#getting-started)
- [Application Architecture](#application-architecture)
  - [Assets](#application---assets)
  - [Components and Pages](#application---components-and-pages)
  - [app.js](#application---appjs)
  - [config.js](#application---configjs)
  - [index.html](#application---indexhtml)
  - [localization.js](#application---localizationjs)
  - [routes.js](#application---routesjs)
- [Deployment](#deployment)
- [Dependencies](#dependencies)
- [Example Components](#examples)

# Getting Started

You will need node.js installed in order to run the moonsault create command line app.  
Node.js allows you to run JavaScript code outside of the browser.  
You can download node.js [here](https://nodejs.org).

After installing node.js, you'll need to download moonsault to your computer.  
The download link is [here](https://codeload.github.com/eibonlabs/moonsault/zip/refs/heads/main).

Unzip the moonsault-main.zip file to a location on your computer.

After unzippng moonsault-main.zip, open a terminal (or command prompt), and navigate to the directory where you unzipped the archive.

Now you need to install the dependencies needed in order to build applications locally on your computer. In the terminal, run the following command:  
`npm install`

Next, you'll need to create an application. Creating applications is done through the moonsault create command line application. In the terminal, run the following command:  
`node create`.

You'll be presented with a list of options. Choose `1. Create an application.` by typing in `1` and presssing Enter.

Next, you'll be asked to name your application. For this example, we'll call the application TestApp. Type in `TestApp`, and press Enter.

You should see that the application was created. You will then be asked if you want the app to be the default. Type `y` and then press Enter.

Press Enter again, to go back to the main menu.

Choose `5. Quit` by typing in `5` and pressing Enter.

Next, you'll need start the server. In the terminal, run the following command:  
`npm run start`

You should see that the build completed, and that it is watching for changes.

Open the web browser of your choice and navigate to [http://localhost:8080](http://localhost:8080).

You should see that the application is up and running!

[⬆ Back to TOC](#table-of-contents)

# Application Architecture

The moonsault framework allows developers to host multiple applications under one framework. These applications are stored in the src/apps directory.

The default application (defined in the body tag of `src/index.html`) will get loaded when navigating to [http://localhost:8080](http://localhost:8080), but you can also go directly to an application through the url using the following pattern `http://localhost:8080/apps/APP_NAME`.

Within each application is a common set of directories and initial files:

- assets
  - css
    - app.css
  - fonts
  - lib
- components
  - ComponentName
    - css.js
    - html.js
    - index.js
- pages
  - PageName
    - css.js
    - html.js
    - index.js
- app.js
- config.js
- favicon.png
- index.html
- localization.js
- routes.js

The moonsault API is available through the `moonsault` object. Type `moonsault` into your web developer tools to see the public portions of the API!

[⬆ Back to TOC](#table-of-contents)

## Application - assets

This directory contains assets that can be used by your application. Assets would include things like stylesheets that apply to the entire application (apps.css), fonts, images, and external libraries (like jQuery).

[⬆ Back to TOC](#table-of-contents)

## Application - components and pages

All components and pages within moonsault are native [web components](https://developer.mozilla.org/en-US/docs/Web/API/Web_Components). The components and pages in moonsault are separated into three files:

- css.js
- html.js
- index.js

The `css.js` and `html.js` files are used to style the component or page and to also set its initial template. These files are setup as standard [ES6 modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules), and simply export template literals that will be used by the component defined in the `index.js` file.

Inside the index.js file of your component or page, you'll see where the web component name is defined (in the `componentName` variable), and also where some imports occur.

```
import { buildComponent } from '../../../../lib/moonsault.js';
import html from './html.js';
import css from './css.js';
```

The `buildComponent` method is imported from the moonsault framework, and is used set up the web component. The `buildComponent` method does the following:

1. Sets the name of the web component.
2. Sets the web components template to the value returned from html.js.
3. Adds a style tag to the head of the document that contains the value returned from css.js
4. Makes the web component available to the moonsault API. This allows you to call the web component's methods through JavaScript, and this facilitates operatons such as passing data from one component to another.

To import a component into a page, just use the `import` statement in a component or page's html.js file, and then use that tag in the template literal. For example, lets say I have an html.js file where I want to import a component called `c-helloWorld`. My html.js file could look like this:

```
import '../HelloWorld/index.js';

const html =`
<div class="example">
    <c-helloWorld></c-helloWorld>
</div>`;

export default html;
```

Components that are outside of the `#page` element will be added to the `moonsault.staticComponents` object.

Components and pages will be added to the `moonsault.pageComponents` object. Pages are usually prefixed with `p-`, while components are prefixed with `c-`. This is using the `componentName` defined in your page or component. Note that you can name it whatever you want, but this is the convention used by default in the framework.

Whenver a route is resolved, `moonsault.pageComponents` will be updated with the components for that page (and the page component itself).

Components and pages can have public APIs, and this will allow you to access methods on the components.

For example, the HelloWorld component has a `helloWorld` public method. To access it, you could run `moonsault.pageComponents["c-hello-world"].helloWorld()` in your web developer tools console, when on the `#/home` route. This would then display "You called the public API!".

[⬆ Back to TOC](#table-of-contents)

## Application - app.js

The entry point of the application is `app.js`. This module does a few things:

1. Imports the `setupApp` from the moonsault framework.
2. Imports the applications's `localization.js` module.
3. Imports the applications `routes.js` module.
4. Imports components that are used outside of the `#page` element.
5. Passes in a template that is used as the overall layout of the application, and is appended to the `body` of the document. This template must include a `#page` element in order for routing to work correctly.

[⬆ Back to TOC](#table-of-contents)

## Application - config.js

`config.js` is a simple module that exports key/value pairs that can be used to configure your application. An example use case for this module would be placing all of your application endpoints here.

You can access the config through JavaScript with `moonsault.config`.

[⬆ Back to TOC](#table-of-contents)

## Application - index.html

This is the default file loaded by the server, and uses a data-app attribute in the body tag in order to instruct moonsault on which application should be loaded from the apps directory. Here is an example:

```
<body class="ExampleApplication" data-app="ExampleApplication">
```

Note that this same method of application loading is used in `src/index.html`.

You can also go directly to an application through the url using the following pattern `http://localhost:8080/apps/APP_NAME`.

[⬆ Back to TOC](#table-of-contents)

## Application - localization.js

The localization.js module exports keyvalue pairs that can be used by elements in your template that have the `data-localize` attribute. For example, lets say your localization.js module looks like this:

```
const localization = {
    en: {
        "hello": "Hello!",
    },
    sp: {
        "hello": "Hola!"
    },
    ja: {
        "hello": "おはようございます"
    }
};

export { localization };
```

[⬆ Back to TOC](#table-of-contents)

In your component, you could have `<span data-localize="hello"></span>`, and depending on what the `lang` attribute is set to in your index.html file, you could have a greeting in different languages. If your index.html file contains `<html lang="en">`, it will output Hello, `lang="sp"` would output the spanish version, and `lang="ja"` would output the japanese version.

[⬆ Back to TOC](#table-of-contents)

## Application - routes.js

The routes.js module sets up all of the routes available in your application. It uses imports to import the pages (and their components), and then sets up key/value pairs to map a hash in the URL to the web component that should be displayed for the page. Pages are populated in the `#page` element that is defined in `app.js`. Here is an example:

```
/* import pages here */
import './pages/Error/index.js';
import './pages/Home/index.js';
import './pages/About/index.js';

const routes = {
    '#/error': 'p-error',
    '/': 'p-home',
    '#/home': 'p-home',
    '#/about': 'p-about'
};

export { routes };
```

When a page is imported through the routes module, it is also importing all of the components in the page. This means that all components for the application are ready for use on application start.

[⬆ Back to TOC](#table-of-contents)

# Deployment

Moonsault uses [esbuild](https://esbuild.github.io) to produce a distributable build of the framework that is placed in the `public` directory. This is produced any time a change is made to a file in the `src` directory.

The contents of the `public` directory can then be copied over to the server of your choice.

Although builds are automatically generated, you can also just copy over the contents of the `src` directory to the server of your choice, as well. This provided flexibility for environments that may have not approved the use of esbuild.

[⬆ Back to TOC](#table-of-contents)

# Dependencies

Moonsault itself does not have dependencies, but the tooling that goes along with it, does. For example, in order to use the moonsault create command line application, you need to have [node.js](https://nodejs.org) installed, along with the [fs-extra](https://github.com/jprichardson/node-fs-extra) package. Some components, such as the markdown component may include their own libraries, as well.

Dependecies that are included in this repo are:

- [concurrently](https://github.com/open-cli-tools/concurrently)
- [esbuild](https://esbuild.github.io)
- [express](https://github.com/expressjs/express)
- [fs-extra](https://github.com/jprichardson/node-fs-extra)
- [jsdoc](https://github.com/jsdoc/jsdoc)
- [swagger-jsdoc](https://github.com/Surnet/swagger-jsdoc)
- [swagger-ui-express](https://github.com/scottie1984/swagger-ui-express)
- [marked.js](https://github.com/markedjs/marked)

## Server Side (Development Environment)

JSDoc and swagger are used for code documentation, and are not real dependencies in the framework.

Express is used for setting up a local server for hosting the framework, and also provides and easy way for mocking up endpoints for your applications.

Fs-extra is used by the moonsault create command line app for copying files from the template into the target application.

## Client Side

Marked.js is part of the markdown component, and is used for parsing markdown files and converting them to HTML.

It's completely possible to build moonsault applications without these dependencies, but they do make life a little easier :)

**The framework itself does not have any dependencies, so feel free to remove any depedencies that aren't needed.**

Moonsault has been scanned with [sonarqube](https://www.sonarsource.com/products/sonarqube/), and should pass the scan locally without any problems.

[⬆ Back to TOC](#table-of-contents)

# Examples

## Markdown

This component is used for displaying markdown content. Markdown files go in your application's `assets/content` directory, but you can also point to any URL that you want. The following code shows how you would use the component:

`<c-markdown data-src="HelloWorld.md"></c-markdown>`

Make sure that you `import` the markdown component in any page (or component) that is using it, like this:

page level import inside your page's html.js file
`import '../../components/Markdown/index.js';`

component level import inside your component's html.js file

`import '../Markdown/index.js';`

## AnimateInView

This component allows you to wrap another component and place an animation on it that will play when the element comes into view.

Make sure that you `import` the AnimateInView component in any page (or component) that is using it, like this:

page level import inside your page's html.js file
`import '../../components/AnimateInView/index.js';`

component level import inside your component's html.js file

`import '../AnimateInView/index.js';`

To use the component, wrap another component with the AnimateInView component.

```
<c-animate-in-view data-transition="slideInFromLeft" data-reset="true">
  <c-markdown data-src="HelloWorld.md"></c-markdown>
</c-animate-in-view>
```

The data-transition attribute tells the component which transition to apply. These transitions are defined in the component's css.js file. The following transitions are available by default:

- slideInFromLeft
- slideInFromRight
- slideInFromBottom
- slideInFromTop
- flipOverVertical
- flipOverHorizontal
- zoomIn
- zoomOut
- unblur

The data-reset attribute tells the component to reset the animation when the element is no longer on screen. This allows the component to replay the transition any time the component comes into view.

## Look At Cursor

This component allows you to wrap another component and have that component rotate to look at the cursor as it moves around.

Make sure that you `import` the LookAtCursor component in any page (or component) that is using it, like this:

page level import inside your page's html.js file
`import '../../components/LookAtCursor/index.js';`

component level import inside your component's html.js file

`import '../LookAtCursor/index.js';`

To use the component, wrap another component with the LookAtCursor component.

```
<c-look-at-cursor data-parent="">
  <c-markdown data-src="HelloWorld.md"></c-markdown>
</c-look-at-cursor>
```

The component provides a data-origin-element attribute that will let you define where the cursor should be tracking from. For example, you could set data-origin-element="body". This is useful for doing things like having a group of elements all keep perspective while scrolling down the page.

If no data-origin-element attribute is specifed, or it is empty, it will track from the parent of the component.

## Window (Beta)

This is a component that can be used to wrap an existing component in a window GUI. It provides functionality for maximizing, minimizing, resizing, and closing windows. In order for maximizing and minimizing to work correctly, you'll need to make sure the parent container of the window is positioned in a way to allow for maximizing and minimizing to work (this usually means setting positioning to fixed, with a width and height to defined).

Here is an example of the html used for including a windowed component:

```
<c-window
  data-x-position="200"
  data-y-position="100"
  data-width="300px"
  data-height="300px"
  data-draggable="true"
  data-resizable="true"
  data-maximize="true"
  data-minimize="true"
  data-close="true"
  data-pin="true"
>
  <c-hello-world></c-hello-world>
</c-window>
```

Simply put the component you want windowed as a child of your c-window tag, and you are good to go!

## Data Binding (Beta)

Data binding is provided through the bind module, and there is a full example in the BindingExample component. You can test this component by including it in your page, just as you would any other component.

In your page's `html.js` file, include the following at the top of the file:  
`import '../../components/BindingExample/index.js';`

And then include the component tag within your html variable:

`<c-binding-example></c-binding-example>`

You can bind data in your component to an element in your page, or pass the updated data to a function. The bind function requires four parameters:

- context: the object that your changing properties are attached to
- property name: the name of the property on your object that you want to change
- initial value: the initial value of the property
- element or callback: the element that you want to update as data changes, or function to pass the updated value to.

Please see the BindingExample component for more examples.

[⬆ Back to TOC](#table-of-contents)
