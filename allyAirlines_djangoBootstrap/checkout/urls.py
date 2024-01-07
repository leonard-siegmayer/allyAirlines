from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('success', views.checkoutSuccessful),
    path('', views.checkout),
]
