# Changelog

## v1.3.5
- added moonsault create GUI
- update command line app to automatically add new pages into routes.js.
- update warning message when no apps are set as the default.
- if only one app available after creating an app, make it the default.
- fix bug where an application is not displayed when using /apps/ in the url
- update build to deploy apps when server is running.
- update build to deploy routes, localization and config when changed when server is running.

## v.1.3.4
- add wiki docs
- add PropUpdateExample component. This component shows how to set a property on a web component, and have that trigger a render to update data.

## v.1.3.3

- add moonsault.currentRoute and moonsault.previousRoute properties
- add moonsault.urlParams.set and moonsault.urlParams.delete for managing URL parameters
- add moonsault.buildRoute for building paramater list and and navigating to a route
- add support for data-hash-change property on components.

## v.1.3.2

- modify router to scroll to top of page after loading. this applies to the window, and also the #page element.
- modify server to not return 403 if requesting JSON, XML, or CSV files from an API directory.

## v.1.3.1

- fix bug with moonsault.currentAppPath having an extra forward slash
- check if file exists before copying (build.js)
- add example component that requests plain html and css files for use within compoents and pages
- add support for copying index.html and index.css from components and pages
- update express version

## v.1.3.0

- move buildComponent() to connectedCallback(). this fixes an issue with dynamically injecting child components.
- refactor window component

## v.1.2.9

- refactor how backend services are organized and loaded

## v.1.2.8

- fix bug for going directly to an app through the URL
- remove marked.js from lib directory since it is part of the component
- fix transition bug

## v.1.2.7

- refactor build process

## v.1.2.6

- support loading from sub directories on server

## v.1.2.5

- update build process
- minify moonsault libraries
- update template
- update markdown component to accept remote urls

## v.1.2.4

- hot reloading of assets directory

## v.1.2.3

- added server side dependency for concurrently in order to make development on Windows a little easier.
- removed the docs generation from the start task.
- added support for electron

## v.1.2.2

- added unblur, zoomIn, and zoomOut transitions for the AnimateInView component
- update overflow on AnimateInView component to be visible
- fix margin in header component
- remove height from framework.css
- added LookAtCursor component. This component allows you to wrap another component and have that component rotate to look at the cursor as it moves around. The component provides a data-origin-element attribute that will let you define where the cursor should be tracking from. For example, you could set data-origin-element="body". This is useful for doing things like having a group of elements all keep perspective while scrolling down the page.

## v.1.2.1

- added the AnimateInView component. This component allows you to wrap another component and place an animation on it that will play when the element comes into view.

## v.1.2.0

- added data binding
- updated how components are constructed and removed exports. customElements.define gets called when the module is loaded, so there is nothing to export.
- new window component can load components into a moveable window
  - the window component is in beta
  - the window component requires a parent element that is set to the size you want the window to maximize to. for example, if you want the window to maximize to full screen and minimize to the bottom of the screen, you will need a parent element that is set to those dimensions.
  - more concrete examples will be made available once the component is out of beta, but feel free to poke around and take a look at how it works!
- updated README.md to include the above updates with more documentation.

## v.1.1.1

- fixed sonarqube issues with moonsault create command line app

## v.1.1.0

- add event listener to hello world component
- add marked library for markdown parsing. this is a library used by the markdown component. more info is available here: https://github.com/markedjs/marked
- add content directory for markdown files
- fix issue with stylesheet naming when creating new components and pages
- remove CSS reset
- fix incorrect naming of components when creating them from the create app
- updates / spelling corrections for README.md
- updated moonsault create command line application to ask if the user would like the newly created app to be the default.

## v.1.0.0

- initial release
