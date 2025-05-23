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

def generate_code(length=5):
    return ''.join(random.choices('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ', k=length))

def authorization(request):
    context = {}

    # Проверка ввода кода
    if request.method == 'POST' and request.POST.get('submitform') == 'codeform':
        code_entered = ''.join([
            request.POST.get('num1', ''),
            request.POST.get('num2', ''),
            request.POST.get('num3', ''),
            request.POST.get('num4', ''),
            request.POST.get('num5', '')
        ]).upper()

        correct_code = request.session.get('auth_code')
        if code_entered == correct_code:
            request.session.pop('auth_code', None)
            request.session.pop('code_sent', None)
            return redirect('home')
        else:
            context['codeform'] = True
            context['code_error'] = 'Код невірний'

    # Авторизация
    elif request.method == 'POST':
        form = AuthorizationForm(request, data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)

            code = generate_code()
            request.session['auth_code'] = code
            request.session['code_sent'] = True

            try:
                send_mail(
                    subject='Код підтвердження авторизації',
                    message=f'Ваш код підтвердження: {code}',
                    from_email=None,
                    recipient_list=[user.email],
                    fail_silently=False,
                )
            except Exception as e:
                print(e)

            context['codeform'] = True  # показать форму с кодом
        else:
            context['form'] = form

    else:
        context['form'] = AuthorizationForm()

    return render(request, 'login/login.html', context)


class LogOutView(LogoutView):
    next_page = 'register'