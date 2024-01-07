from django.urls import path
from . import views

urlpatterns = [
    path('', views.booking),
    path('autocomplete/', views.autocomplete, name='autocomplete'),
]
