from django.views.generic import ListView
from my_publications.models import User_Post
from django.contrib.auth.mixins import LoginRequiredMixin

class HomeView(LoginRequiredMixin, ListView):
    model = User_Post
    template_name = "home_app/home.html"
    context_object_name = 'posts'
        
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["page"] = 'home' 
        return context