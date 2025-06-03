from django.shortcuts import render
from django.views.generic.edit import FormView
from django.views.generic.edit import CreateView
from django.contrib.auth.models import User
from .forms import RegistrationForm, CodeForm
from django.core.mail import send_mail
from django.core.exceptions import ValidationError
from .models import RegistrationCodes
from django.http import HttpRequest, HttpResponse
import secrets, string

from django.shortcuts import render, redirect
from django.views.generic import CreateView
from django.http import HttpRequest, HttpResponse
from django.core.mail import send_mail
from .forms import RegistrationForm, CodeForm
from .models import RegistrationCodes
from django.contrib.auth.models import User
import secrets, string, random

def generate_code(length=5):
    return ''.join(random.choices('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ', k=length))

def registration(request):
    context = {}
    if request.method == 'POST' and request.POST.get('submitform') == 'codeform':
        code_entered = ''.join([
            request.POST.get('num1', ''),
            request.POST.get('num2', ''),
            request.POST.get('num3', ''),
            request.POST.get('num4', ''),
            request.POST.get('num5', '')
        ]).upper()

        correct_code = request.session.get('auth_code')
        email = request.session.get('email')
        password = request.session.get('password')

        if code_entered == correct_code and email and password:
            User.objects.create_user(username=email, email=email, password=password)
            request.session.pop('auth_code', None)
            request.session.pop('email', None)
            request.session.pop('password', None)
            return redirect('auth')
        else:
            context['codeform'] = True
            context['code_error'] = 'Код невірний'

    elif request.method == 'POST':
        form = RegistrationForm(request.POST)
        if form.is_valid():
            email = form.cleaned_data['email']
            password = form.cleaned_data['password']

            code = generate_code()
            request.session['auth_code'] = code
            request.session['email'] = email
            request.session['password'] = password

            try:
                send_mail(
                    subject='Код підтвердження',
                    message=f'Ваш код підтвердження: {code}',
                    from_email=None,
                    recipient_list=[email],
                    fail_silently=False,
                )
            except Exception as e:
                print(e)

            context['codeform'] = True
        else:
            context['form'] = form
    else:
        context['form'] = RegistrationForm()

    context.update({'page': 'register'})

    return render(request, 'reg/reg.html', context)