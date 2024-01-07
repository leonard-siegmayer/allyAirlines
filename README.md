# ba-siegmayer

Ally Airlines is a fictional airline, for which two web application were developed in two distinct projects, each utilizing different technologies. The goal of the projects is to show, how accessibility can be achieved with these technologies.  
One project uses [Angular](https://angular.io/) and [Angular Material](https://material.angular.io/), the other one [Bootstrap](https://getbootstrap.com/docs/4.5/getting-started/introduction/) and [Django](https://www.djangoproject.com/).  
This file describes the main functionalities. Details about the respective projects can be found in their own READMEs.

## Main Functionalities
The projects provide functions to search for flights, make and manage bookings and to view special offers. The login functionalities are just dummies, which succeed with every username and password.  

## Views
The applications consist of nine views:

### Home
Shows a form to search for flights, popular travel destinations, selected offers, recommendations for places to travel to and reviews from the community.

### Flights
Includes a form to search for flights and shows the corresponding results. A booking for one of them can be made by clicking on it.

### Checkout
Leads the user through the checkout process. Information about the passenger and the payment information are required.

### Checkout Successful
After successfully  finishing the checkout process and simulating a loading time, this view displays a success message.

### My Bookings
Displays a list of all bookings. Includes the functionalities to show more details and to cancel bookings.

### Offers
Includes multiple offers of different campaigns. Mainly sorted by continents.

### About
Describes the vision of the airline and provides answers for important questions in a FAQ section.

### Contact
Provides several ways to contact the airline: By phone, e-mail, mail or by using a contact form.

### Legal
Shows legal information about the website, e.g. privacy information.

## Background
This project is part of the bachelor thesis 'Possibilities for the Implementation of Accessible Web Applications Using Current Web Frameworks' written by Leonard Paul Siegmayer at the University of Bamberg.

## License
[MIT](https://choosealicense.com/licenses/mit/)
