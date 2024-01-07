"""allyAirlines_djangoBootstrap URL Configuration"""

from django.contrib import admin
from django.urls import path, include
import home, manageBookings, booking, contact, about, legal, checkout, offers

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('home.urls')),
    path('myBookings/', include('manageBookings.urls')),
    path('flights/', include('booking.urls')),
    path('contact/', include('contact.urls')),
    path('about/', include('about.urls')),
    path('legal/', include('legal.urls')),
    path('legal/', include('legal.urls')),
    path('checkout/', include('checkout.urls')),
    path('offers/', include('offers.urls')),
]
