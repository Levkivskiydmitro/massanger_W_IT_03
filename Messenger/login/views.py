from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.views.generic.edit import FormView
from django.contrib.auth.views import LoginView,LogoutView
from django.contrib.auth.models import User
from django.urls import reverse_lazy
from .forms import AuthorizationForm
# Create your views here.

'''class AuthorizationView(LoginView):
    template_name = "login/login.html"
    form_class = AuthorizationForm
    success_url = reverse_lazy('home')

    def get_success_url(self):
        return reverse_lazy('home')

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["page"] = 'reg'
        return context'''

def authorization(request):
    if request.method == 'POST':
        form = AuthorizationForm(request, data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            return redirect('home')
    else:
        form = AuthorizationForm()
    return render(request, 'login/login.html', {'form': form})


class LogOutView(LogoutView):
    next_page = 'register'