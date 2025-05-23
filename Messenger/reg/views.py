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

from django.shortcuts import render
from django.views.generic import CreateView
from django.http import HttpRequest, HttpResponse
from django.core.mail import send_mail
from .forms import RegistrationForm, CodeForm
from .models import RegistrationCodes
from django.contrib.auth.models import User
import secrets
import string

class RegistrationView(CreateView):
    template_name = 'reg/reg.html'
    context = {'form': RegistrationForm(), 'page': 'reg'}

    def get(self, request: HttpRequest):
        return render(request, self.template_name, self.context)

    def post(self, request: HttpRequest):
        button = request.POST.get('submitform')
        
        if button == 'mainform':
            return self._handle_main_form(request)
        elif button == 'codeform':
            return self._handle_code_form(request)
        return render(request, self.template_name, self.context)

    def _handle_main_form(self, request: HttpRequest):
        form = RegistrationForm(request.POST)
        if not form.is_valid():
            return render(request, self.template_name, self.context)
        
        if form.cleaned_data['password'] != form.cleaned_data['confirm_password']:
            return HttpResponse("Паролі не співпадають")

        email = form.cleaned_data['email']
        code = ''.join(secrets.choice(string.digits) for _ in range(6))
        
        RegistrationCodes.objects.create(email=email, code=code)
        send_mail(
            'Підтвердіть Електронну Адресу',
            f'Дякуємо що користуєтесь World IT Messenger!\nКод підтвердження реєстрації: {code}',
            None,
            [email],
        )
        
        response = render(request, self.template_name, {
            'form': RegistrationForm(),
            'codeform': CodeForm()
        })
        response.set_cookie('email', email)
        response.set_cookie('password', form.cleaned_data['password'])
        return response

    def _handle_code_form(self, request: HttpRequest):
        form = CodeForm(request.POST)
        context = {'form': RegistrationForm(), 'codeform': CodeForm(), 'page': 'reg'}
        
        if not form.is_valid():
            return render(request, self.template_name, context)
        
        email = request.COOKIES.get('email')
        if not email or not RegistrationCodes.objects.filter(email=email).exists():
            return render(request, self.template_name, context)

        if User.objects.filter(username=email).exists():
            return render(request, self.template_name, context)

        auth_code = RegistrationCodes.objects.get(email=email).code
        if form.cleaned_data['code'] != auth_code:
            return render(request, self.template_name, context)

        User.objects.create_user(
            username=email,
            email=email,
            password=request.COOKIES.get('password')
        )
        
        response = render(request, self.template_name, context)
        response.delete_cookie('email')
        response.delete_cookie('password')
        return response