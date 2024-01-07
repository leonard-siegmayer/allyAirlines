# Ally Airlines (Angular)

Ally Airlines is a Web-Application for a fictional airline made with [Angular](https://angular.io/) and [Angular Material](https://material.angular.io/). Its goal is to showcase, how accessibility can be realized with this framework.
Its main features are the search, booking and management of flights.

## Installation

- [Node.js](https://nodejs.org/en/) is required to run the application.
- Before launching the application for the first time, run `npm install`.
- If Angular is not yet installed, run `npm install -g @angular/cli`.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Remarks about the accessibility in the application, related to the framework
### Codelyzer
Codelyzer can be executed with `ng lint`. The activated rules can be found in `tslint.json`.
### Theme
The file `src/ally-theme.scss` specifies the color theme used for the application.  
The colors in the application achieve WCAG AAA-Conformity.
### Skip-Links
The skip-link-component located in `src/app/skip-link` can be used for skip-links. This makes use of the 'InteractivityChecker' and the 'cdk-visually-hidden' class.
### FocusKeyManager
The 'FocusKeyManager' from the a11y-package is used in the recommendations-component located in `src/app/recommendations/`.
### FocusTrap
The 'FocusTrap' from the a11y-package is used for a custom overlay in manage-bookings-component located in `src\app\manage-bookings`.
### LiveAnnouncer
The 'LiveAnnouncer' from the a11y-package is used in various components to provide additional context information for screen reader user.  
Those locations are `src\app\user-management.service.ts`, `src\app\manage-bookings\manage-bookings.component.ts` and `src\app\search-results\search-results.component.ts`.
### Animations
Functions for disabling animations are located in `src\app\app.component.ts`. Some small animations can't be disabled.
### Title
The title of the application changes after each navigation. For this the Title-Service is used in the main components of sub-pages.
### Focusmanagement
The primary heading will be focused after each navigation. For this the NavigationEnd-Event is used in the root component `app.component.ts`.
### Relativedate-Pipe
A pipe which provides relative representations of dates can be found in `src\app\relativedate.pipe.ts`.
### Further Remarks
- The template-system helped structuring the application, such that a logicial hierarchy of headings and landmarks could be realized.
- The template-system also helped achieving consistency, by reusing the search-form and keeping the navigation-bar and footer in the same location for each sub-page.
- UI-components provided by angular material are keyboard accessible and often have initial ARIA-attributes. More concrete attributes were manually added.
- Some UI-components help reducing the simultaneously displayed content and providing guidance (e.g. 'Stepper' and 'Expansion Panel').

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## License
[MIT](https://choosealicense.com/licenses/mit/)
