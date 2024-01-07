from django.shortcuts import render
from .models import Campaign, SpecialOffer


# Renders the offers. If a filter is provided in the get-parameters, only corresponding offers will be rendered.
def offers(request):
    associated_offers = []

    class CampaignAndOffers:
        def __init__(self, campaign):
            self.campaign = campaign
            self.offers = self.campaign.specialoffer_set.all()

    campaigns = None
    getRequestFilter = request.GET.get('filter', False)
    if getRequestFilter:
        campaigns = Campaign.objects.filter(name__icontains=getRequestFilter)
    else:
        campaigns = Campaign.objects.all()

    for campaign in campaigns:
        associated_offers.append(CampaignAndOffers(campaign))

    associated_offers.sort(key=lambda e: e.campaign.name)

    return render(request, 'offers/offers_base.html', {'associated_offers': associated_offers})
