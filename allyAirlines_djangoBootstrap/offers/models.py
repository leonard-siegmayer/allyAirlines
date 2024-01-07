from django.db import models
from booking.models import Flight

# A campaign for special offers.
class Campaign(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name


# A discounted flight, which is part of a campaign.
class SpecialOffer(models.Model):
    flight = models.ForeignKey(Flight, on_delete=models.CASCADE)
    campaign = models.ForeignKey(Campaign, on_delete=models.CASCADE)
    discount = models.DecimalField(max_digits=2, decimal_places=0, default=10)

    def __str__(self):
        return self.campaign.__str__() + ": " + self.flight.__str__()