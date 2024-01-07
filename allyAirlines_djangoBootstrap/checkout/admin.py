from django.contrib import admin
from .models import Booking, Passenger, PaymentInformation

admin.site.register(Passenger)
admin.site.register(PaymentInformation)