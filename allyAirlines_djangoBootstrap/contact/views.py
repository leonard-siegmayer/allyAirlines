from django.shortcuts import render
from django import forms
from .forms import ContactForm

# Renders the contact view. If the contact form was used, the received message will be saved in the database.
def contact(request):
    formSent = False
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            form.save()
            formSent = True

    form = ContactForm()

    return render(request, 'contact/contact_base.html', {'form': form, 'formSent': formSent})
