from django.shortcuts import render


def legal(request):
    return render(request, 'legal/legal_base.html')