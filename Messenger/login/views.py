from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.views.generic.edit import FormView
from django.contrib.auth.views import LoginView,LogoutView
from django.contrib.auth.models import User
from django.urls import reverse_lazy
from django.core.mail import send_mail
from .forms import AuthorizationForm
from reg.models import RegistrationCodes

import random

def authorization(request):
    context = {}

    if request.method == 'POST':
        form = AuthorizationForm(request, data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            return redirect('home')
        else:
            context['form'] = form
    else:
        context['form'] = AuthorizationForm()

    context.update({'page': 'login'})

    return render(request, 'login/login.html', context)

class LogOutView(LogoutView):
    next_page = 'register'