from django.views.generic.base import TemplateView
from my_publications.models import User_Post

class HomeView(TemplateView):
    template_name='home_app/home.html'
        
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["page"] = 'home' 
        return context