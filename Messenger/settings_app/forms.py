from django import forms
from .models import Album

class AlbumForm(forms.ModelForm):
    class Meta:
        model = Album
        fields = ['name', 'topic', 'year']
        widgets = {
            'name': forms.TextInput(attrs={'id': 'album-name', 'class': 'form-control'}),
            'topic': forms.Select(attrs={'id': 'album-topic', 'class': 'form-select'}),
            'year': forms.NumberInput(attrs={'id': 'album-year', 'class': 'form-control'}),
        }