"""
URL configuration for Messenger project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path
from . import settings

from login.views import authorization, LogOutView
from reg.views import RegistrationView
from home.views import HomeView
from settings_app.views import SettingsView
from my_publications.views import CreatePublicationView
from settings_app.views import update_profile


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', HomeView.as_view(), name='home'),
    path('register/', RegistrationView.as_view(), name='reg'),
    path('login/', authorization, name='auth'),
    path('log-out/', LogOutView.as_view(), name='logout'),
    path('create/', CreatePublicationView.as_view(), name = 'create'),
    path('settings/', SettingsView.as_view(), name='settings'),
    path('update-profile/', update_profile, name='update_profile'),
]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)