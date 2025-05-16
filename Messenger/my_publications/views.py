from django.shortcuts import render
from django.views import View
from django.http import HttpRequest


class CreatePuplicationView(View):
    template_name = "my_publications/create.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["page"] = 'create'
        return context
    
    def get(self, request: HttpRequest):
        return render(request, 'my_publications/create.html')