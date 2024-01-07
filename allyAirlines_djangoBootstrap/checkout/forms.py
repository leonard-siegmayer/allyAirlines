from django import forms
from .models import PaymentInformation, Passenger
from django.forms.widgets import TextInput
from django.forms.widgets import DateInput


class PaymentForm(forms.ModelForm):
    class Meta:
        model = PaymentInformation
        fields = ('creditCardOwner', 'creditCardNumber',
                  'controlNumber', 'validUntil')
        widgets = {
            'creditCardOwner': TextInput(attrs={'autocomplete': 'cc-name'}),
            'creditCardNumber': TextInput(attrs={'aria-describedby': 'error_1_id_creditCardNumber', 'autocomplete': 'cc-number'}),
            'controlNumber': TextInput(attrs={'aria-describedby': 'error_1_id_controlNumber', 'autocomplete': 'cc-csc'}),
            'validUntil': TextInput(attrs={'aria-describedby': 'hint_id_validUntil error_1_id_validUntil', 'autocomplete': 'cc-exp'})
        }
        labels = {
            'creditCardOwner': 'Kreditkarteninhaber',
            'creditCardNumber': 'Kreditkartennummer',
            'controlNumber': 'Prüfnummer',
            'validUntil': 'Gültig bis',
        }
        help_texts = {
            'validUntil': '(Monat/Jahr)'
        }
        error_messages = {
            'creditCardNumber': {
                'nomatch': 'Kreditkartennummer muss aus 16 Ziffern bestehen.'
            },
            'controlNumber': {
                'nomatch': 'Prüfnummer muss aus 3 Ziffern bestehen.'
            },
            'validUntil': {
                'nomatch': 'Ungültiges Format (MM/JJ).'
            },
        }


class PassengerForm(forms.ModelForm):
    class Meta:
        model = Passenger
        fields = ('firstName', 'lastName', 'streetAndNumber',
                  'postalCode', 'city', 'dayOfBirth')
        # aria-, type- and autocomplete-attributes are defined for each widget
        widgets = {
            'firstName': TextInput(attrs={'autocomplete': 'given-name'}),
            'lastName': TextInput(attrs={'autocomplete': 'family-name'}),
            'city': TextInput(attrs={'autocomplete': 'address-level2'}),
            'dayOfBirth': DateInput(attrs={'type': 'date', 'aria-describedby': 'error_1_id_dayOfBirth', 'autocomplete': 'bday'}),
            'streetAndNumber': TextInput(attrs={'aria-describedby': 'error_1_id_streetAndNumber', 'autocomplete': 'billing address-line1'}),
            'postalCode': TextInput(attrs={'aria-describedby': 'error_1_id_postalCode', 'autocomplete': 'billing postal-code'}),
        }
        labels = {
            'firstName': 'Vorname',
            'lastName': 'Nachname',
            'postalCode': 'Postleitzahl',
            'city': 'Stadt',
            'streetAndNumber': 'Straße und Hausnummer',
            'dayOfBirth': 'Geburtsdatum',
        }
        help_texts = {}
        error_messages = {
            'postalCode': {
                'nomatch': 'Ungültige Postleitzahl.'
            },
            'streetAndNumber': {
                'nomatch': 'Straße und Hausnummer werden benötigt.'
            },
            'dayOfBirth': {
                'nomatch': 'Das Geburtsdatum muss in der Vergangenheit liegen.'
            },
        }
