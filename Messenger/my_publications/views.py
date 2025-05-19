from django.shortcuts import render, redirect
from django.views.generic import ListView
from my_publications.models import User_Post

class CreatePublicationView(ListView):
    model = User_Post
    template_name = "my_publications/create.html"
    context_object_name = 'posts'

    def post(self, request, *args, **kwargs):
        title = request.POST.get('title')
        topic = request.POST.get('topic')
        description = request.POST.get('description')
        link = request.POST.get('link')
        image = request.FILES.get('img')

        if title and topic and description:
            User_Post.objects.create(
                title=title,
                topic=topic,
                description=description,
                link=link,
                img=image,
                user=request.user  
            )

        elif any(k.startswith("del-") for k in request.POST):
            for k in request.POST:
                if k.startswith("del-"):
                    post_id = k.split("-")[1]
                    User_Post.objects.filter(pk=post_id).delete()
                    break
                
        return redirect('create') 

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["page"] = 'create'
        context["show_modal"] = False
        return context
    
