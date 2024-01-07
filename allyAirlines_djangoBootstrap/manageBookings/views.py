from django.shortcuts import render, redirect
from booking.models import Flight
from checkout.models import Booking, PaymentInformation, Passenger
from django.http import JsonResponse

# This view displays all bookings of the user.
def manageBookings(request):
    bookings = Booking.objects.all()
    return render(request, 'manageBookings/manageBookings_base.html', {'bookings': bookings})

# Receives the id of a booking in a get-request, removes it from the database and returns it again in a JSON-Response
def cancelBooking(request):
    id = request.GET.get('id')
    booking = list(Booking.objects.filter(pk=id).values())
    Booking.objects.filter(pk=id).delete()

    return JsonResponse({'booking': booking}, safe=False)
