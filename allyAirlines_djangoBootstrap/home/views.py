from django.shortcuts import render
from django import forms


def home(request):
    selectedOffers = ['Europa', 'Amerika', 'Asien', 'Afrika', 'Ozeanien']

    class Review():
        def __init__(self, author, description, fileName):
            self.author = author
            self.description = description
            self.fileName = fileName

    reviews = [Review("Emma", "Meine Familie und ich waren sehr zufrieden mit unserer Buchung bei 'Ally Airlines'!", "face1"),
               Review("Tom", "Ally Airlines bietet außergewöhnlich guten Service zum kleinen Preis.", "face2"),
               Review("Klaus", "Ich würde jeder Zeit wieder mit Ally Airlines fliegen.", "face3"),
               Review("Claudia", "Ich habe hier bereits mehrere Flüge gebucht und werde das in Zukunft noch öfter machen.!", "face4"),
               Review("Louise", "Einfach nur fantastisch!", "face5"), ]
               
    return render(request, 'home/home_base.html', {'selectedOffers': selectedOffers, 'reviews': reviews})
