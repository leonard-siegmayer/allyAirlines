from django import forms
from .models import ContactMessage
from django.forms.widgets import Textarea, EmailInput


# Defines the fields of the contact form, adds help texts and connects them to the input field via aria attributes.
class ContactForm(forms.ModelForm):
    class Meta:
        model = ContactMessage
        fields = ('email', 'subject', 'body')
        widgets = {
            'body': Textarea(attrs={'rows': 5}),
            'email': EmailInput(attrs={'aria-describedby': 'hint_id_email'})
        }
        labels = {
            'subject': 'Betreff',
            'body': 'Nachricht'
        }
        help_texts = {
            'email': 'Wir geben Ihre E-Mail Adresse nicht an Dritte weiter.',
        }
        error_messages = {}
