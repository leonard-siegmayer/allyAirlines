from django.db import models
from django.core.validators import RegexValidator
import json
from django.utils import timezone
from django.core.exceptions import ValidationError
import datetime
from booking.models import Flight

# Validator to check, if the day of birth is in the past.
def validate_day_of_birth(dayOfBirth):
    now = datetime.date.today()
    if now <= dayOfBirth:
        raise ValidationError(
            ('The day of birth must be in the past'), code="nomatch")

# The person associated with a booking.
class Passenger(models.Model):
    firstName = models.CharField(max_length=30)
    lastName = models.CharField(max_length=30)
    postalCode = models.CharField(max_length=5, validators=[RegexValidator(
        regex='\A\d{5}\Z', message='Must consist of 5 digits.', code='nomatch')])
    city = models.CharField(max_length=30)
    streetAndNumber = models.CharField(max_length=70, validators=[RegexValidator(
        regex='.*((\D+\d+)|(\d+\D+)).*', message='Requires street AND number.', code='nomatch')])
    dayOfBirth = models.DateField(
        default=timezone.now, validators=[validate_day_of_birth])

    def __str__(self):
        return self.lastName + " " + self.firstName

# Includes information about the credit card of a user.
class PaymentInformation(models.Model):
    creditCardOwner = models.CharField(max_length=60)
    creditCardNumber = models.CharField(max_length=16, validators=[RegexValidator(
        regex='\A\d{16}\Z', message='Must consist of 16 digits.', code='nomatch')])
    controlNumber = models.CharField(max_length=3, validators=[RegexValidator(
        regex='\A\d{3}\Z', message='Must consist of 3 digits.', code='nomatch')])
    validUntil = models.CharField(max_length=9, default="12/21", validators=[RegexValidator(
        regex='\A(20)?(0[1-9]|1[0-2])\W?(20)?[2-9][0-9]\Z', message='Date not valid', code='nomatch')])

    def __str__(self):
        return self.creditCardOwner

    class Meta:
        verbose_name_plural = "Payment Information"


# The booking of a flight.
class Booking(models.Model):
    flight = models.ForeignKey(Flight, on_delete=models.CASCADE)
    payment = models.ForeignKey(PaymentInformation, on_delete=models.PROTECT)
    passenger = models.ForeignKey(Passenger, on_delete=models.PROTECT)
    date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.passenger.__str__() + ": " + self.flight.__str__()