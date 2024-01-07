from django.db import models

class Airport(models.Model):
    name = models.CharField(max_length=30, unique=True)
    country = models.CharField(max_length=30, unique=False, default='country')

    def __str__(self):
        return self.name + ", " + self.country

class Flight(models.Model):
    departureAirport = models.ForeignKey(
        Airport, on_delete=models.CASCADE, related_name="departure")
    arrivalAirport = models.ForeignKey(
        Airport, on_delete=models.CASCADE, related_name="arrival")
    price = models.DecimalField(max_digits=6, decimal_places=2)
    departureTime = models.TimeField()
    arrivalTime = models.TimeField()

    def __str__(self):
        return self.departureAirport.__str__() + " -> " + self.arrivalAirport.__str__() + " (" + self.price.__str__() + "€)"
