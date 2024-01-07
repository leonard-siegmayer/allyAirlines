from django.shortcuts import render
from .models import Flight, Airport
from checkout.models import Booking
from django.http import JsonResponse
import datetime
from django.db.models import Q


# Renders the view for the searching of flights. In case all necessary information are provided in the get-parameters,
# the result of the search will be rendered as well.
def booking(request):
    form_data = request.GET
    flights = []
    date = form_data.get('date')
    fullForm = False
    if request.method == 'GET' and form_data.get('date'):
        departureAirport = form_data.get('firstFlight')
        arrivalAirport = form_data.get('secondFlight')
        date = form_data.get('date')
        if departureAirport and date and arrivalAirport:
            fullForm = True

        flights = Flight.objects.all()
        if departureAirport:
            flights = flights.filter(
                departureAirport__name__icontains=departureAirport)
        if arrivalAirport:
            flights = flights.filter(
                arrivalAirport__name__icontains=arrivalAirport)

    context = {'flights': flights, 'date': date, 'fullForm': fullForm}
    return render(request, 'booking/booking_base.html', context)


# Returns the options for the autocompletion of the search form
# as JSON-Response, depending on the input term in the GET-Parameters
def autocomplete(request):
    inputTerm = request.GET.get('search', False)
    # Filters airports, which names or countries include the search term
    fittingAirports = Airport.objects.filter(
        Q(name__icontains=inputTerm) | Q(country__icontains=inputTerm))
    return JsonResponse({'options': list(fittingAirports.values())}, safe=False)
