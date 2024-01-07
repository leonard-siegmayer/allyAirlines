from django.shortcuts import redirect, render
from booking.models import Flight
from .models import Booking
from .forms import PaymentForm, PassengerForm
from django.http import HttpResponseRedirect

# A view for the checkout process of a booking. It's split into multiple steps, to make it more overseeable for the user.
def checkout(request):
    # this view only works with POST
    if not (request.method == 'POST'):
        return redirect('/flights')

    helper = CheckoutHelper()
    step = request.POST.get("step")
    max_step = request.POST.get('max_step')
    previous_step = request.POST.get('previous_step')
    error = False
    previousForm = None
    form = None

    # if step 3 has been reached, the checkout was successful
    if step == '3':
        helper.saveOrder(request)
        return HttpResponseRedirect('/checkout/success')

    # look for errors in the given form data, except the user requested a form, which has already been filled
    if (float(step) > float(max_step)) and (float(previous_step) >= 0):
        previousForm = helper.getFormByStep(previous_step)(request.POST)
        if not previousForm.is_valid():
            error = True

    # Collecting the remaining necessary parameters for the template.
    if error:
        form = previousForm
        step = previous_step
    else:
        form = helper.getFormByStep(step)(request.POST)
        if (not form.is_valid()) and (float(max_step) < float(step)):
            form = helper.getFormByStep(step)()

    header = helper.getHeaderByStep(step)
    flight_id = request.POST.get('flight_id')
    flight = Flight.objects.get(pk=request.POST.get('flight_id'))
    date = request.POST.get('date')
    passenger = None
    payment = None
    nextButtonText = helper.getNextButtonTextByStep(step)

    if (not error) and (float(max_step) < float(previous_step)) and (float(step) > float(previous_step)):
        max_step = previous_step

    # Get the already given information about the passenger and the payment for the overview.
    if float(max_step) >= 0:
        if PassengerForm(request.POST).is_valid():
            passenger = PassengerForm(request.POST).save(commit=False)
    if float(max_step) >= 1:
        if PaymentForm(request.POST).is_valid():
            payment = PaymentForm(request.POST).save(commit=False)

    return render(request, 'checkout/checkout_base.html/', {'form': form, 'date': date, 'header': header, 'step': int(step) + 1, 'previous_step': step, 'max_step': max_step, 'flight_id': flight_id, 'flight': flight, 'passenger': passenger, 'payment': payment, 'nextButtonText': nextButtonText})


# A helper class, to get context information for the checkout view. Also provides a function to save bookings in the database.
class CheckoutHelper():
    def __init__(self):
        self.headerList = ['Fluggast Informationen',
                           'Zahlungsinformationen', 'Angaben Überprüfen']
        self.formList = [PassengerForm, PaymentForm, PaymentForm]
        self.buttonTextList = [
            'Weiter (Zahlungsinformationen)', 'Weiter (Angaben überprüfen)', 'Flug kostenpflichtig buchen']

    # Returns the heading of the checkout view, depending on the current step.
    def getHeaderByStep(self, step):
        return self.headerList[int(step)]

    # Returns the form, depending on the current step.
    def getFormByStep(self, step):
        return self.formList[int(step)]

    # Returns the description of the 'next'-Button, depending on the current step.
    def getNextButtonTextByStep(self, step):
        return self.buttonTextList[int(step)]

    # Saves a booking in the database. The request must have the necessary values of the payment, passenger, flight and date.
    def saveOrder(self, request):
        payment = PaymentForm(request.POST).save()
        passenger = PassengerForm(request.POST).save()
        flight = Flight.objects.get(pk=request.POST.get('flight_id'))
        date = request.POST.get('date')
        Booking(flight=flight, payment=payment,
                passenger=passenger, date=date).save()


# Renders a success message, if the booking of a flight was successful.
def checkoutSuccessful(request):
    return render(request, 'checkout/checkoutSuccessful_base.html/')
