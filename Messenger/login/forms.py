from django import forms
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError

class AuthorizationForm(AuthenticationForm):
    username = forms.EmailField(label="Email", max_length=255)
    password = forms.CharField(widget=forms.PasswordInput(), label="Password")

    def clean(self):
        email = self.cleaned_data.get('username')
        password = self.cleaned_data.get('password')

        try:
            user = User.objects.get(email=email)
            self.cleaned_data['username'] = user.username
        except User.DoesNotExist:
            raise ValidationError("Користувача з таким email не існує")

        return super().clean()