from django.shortcuts import render
from django.views.generic import TemplateView

class FriendsView(TemplateView):
    template_name = 'friends_app/friends.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['friend_requests'] = [
            {'id': 1, 'name': 'Yehor Aung', 'username': 'theliii', 'avatar_url': 'https://via.placeholder.com/100'},
            {'id': 2, 'name': 'Ann Ann', 'username': 'theliii', 'avatar_url': 'https://via.placeholder.com/100'},
        ]
        context['recommendations'] = [
            {'id': 3, 'name': 'Ann Ann', 'username': 'theliii', 'avatar_url': 'https://via.placeholder.com/100'},
        ] * 6
        context['all_friends'] = [
            {'id': 4, 'name': 'Le Sya', 'username': 'theliii', 'avatar_url': 'https://via.placeholder.com/100'},
        ] * 6
        return context