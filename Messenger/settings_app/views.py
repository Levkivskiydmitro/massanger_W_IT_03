from django.views.generic import TemplateView
from django.shortcuts import redirect, render
from django.contrib.auth.models import User
from django.views import View
from django.views.generic.base import TemplateView
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from .models import Profile
from django.core.exceptions import ObjectDoesNotExist
from .forms import AlbumForm
from datetime import datetime

class SettingsView(TemplateView):
    template_name='settings_app/settings.html'

@login_required
def update_profile(request):
    if request.method == 'POST':
        user = request.user
        profile = user.profile
        user.first_name = request.POST.get('first_name')
        user.last_name = request.POST.get('last_name')
        user.email = request.POST.get('email')
        if request.POST.get('password'):
            user.set_password(request.POST.get('password'))

        birth_date_str = request.POST.get('birth_date')
        if birth_date_str:
            try:
                birth_date = datetime.strptime(birth_date_str.strip('“”"'), '%Y-%m-%d').date()
                profile.birth_date = birth_date
            except ValueError:
                pass
        user.save()
        profile.save()
        return render(request, "settings_app/settings.html", {"page": "settings"})
    
class AlbumsView(TemplateView):
    template_name = "settings_app/albums.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["page"] = 'albums'
        context["form"] = AlbumForm()
        return context