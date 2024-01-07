# Ally Airlines (Bootstrap/Django)

Ally Airlines is a Web-Application for a fictional airline made with [Bootstrap](https://getbootstrap.com/docs/4.5/getting-started/introduction/) and [Django](https://www.djangoproject.com/). Its goal is to showcase, how accessibility can be realized with these two frameworks.
Its main features are the search, booking and management of flights.

## Installation
- [Python](https://www.python.org/downloads/) is required to run the application.  
- A virtual environment can be activated by entering `myvenv\Scripts\activate` in the command line.
- Run `pip install -r requirements.txt`.
- Execute `python manage.py makemigrations` and `python manage.py migrate` to create the tables for the database.
- To fill the database with example data, run `python manage.py loaddata data.json`.

## Usage
### Running the application
- To start the application, execute `python manage.py runserver` .
- The application can then be accessed on port 8000.
### Using the admin interface
- First, create a new superuser by running `python manage.py createsuperuser` and providing a username, email adress and password.
- The admin interface can then be accessed on the subdomain '/admin'.

## Remarks about the accessibility in the application, related to the frameworks
### Screen Reader and Focusmanagement
Some screen reader use caching to remember the last focused element. After navigating to an already visited domain, this element will be focused again.
This functionality overrides the focusmanagement functionality in applications and can lead to unexpected changes of the focus.  
When testing the focusmanagement of this application, it is recommended by doing so without running a screen reader software like this in the background.
### Bootstrap Colors
The bootstrap file with the configured color scheme is located in `static\bootstrap\bootstrap.min.css`.  
The updated scss-variables are located in `static\bootstrap\_variables.scss`.
### Admin Interface
The overridden admin files are located in `templates\admin`:  
- Skip-links and descriptions for visual-only icons were added in `index.html`.
- Translations for those skip-links and descriptions are defined in `locale\admin\de\LC_MESSAGES\django.po`.
- CSS rules to improve the color contrast and to change the visual order of the save- and delete-buttons were added in `base_site.html`.
- The logical order of some elements was changed in `submit_line.html` to achieve a more intuitiv tab-order.
### Form Fields
- Form fields in the checkout are prepopulated after returning to a previous step. This can be found in the checkout-view in `checkout\views.py`.
- Forms in Django were provided with validators, to reduce erroneous inputs.
- 'Autocomplete'- and 'aria-describedby' attributes for the form fields were added in `checkout\forms.py`. 
### Pause button for the carousel on the homepage
The carousel displaying popular destinations was extended with a pause button in `home\templates\home\popularDestinations.html`. Also its speed was reduced to 10 seconds per slide in `home\static\home\script.js`.
### 'Humanize'-Filter
The naturaltime-filter which provides relative representations of dates can be found in `manageBookings\templates\manageBookings\myBookings.html`.
### Further Remarks
- The screen-reader classes of bootstrap were used in numerous templates.
- The bootstrap grid-system was used to achieve responsiveness.
- Inheritance in the django template system was used in combination with the bootstrap breadcrumb-component. Its scaffold is located in `templates\base.html`.
- Some UI-components help reducing the content displayed simultaneously and providing guidance (e.g. 'Breadcrumbs' and 'ScrollSpy').
- The template-system helped structuring the application, such that a logicial hierarchy of headings and landmarks could be realized.
- The template-system also helped achieving consistency, by reusing the search-form and keeping the navigation-bar and footer in the same location for each sub-page.
- UI-components provided by Bootstrap are keyboard accessible. ARIA-attributes were manually added.
- Animations are disabled for devices with an activated 'reduced motion'-mode. Some small animations are not affected by this.

## License
[MIT](https://choosealicense.com/licenses/mit/)
