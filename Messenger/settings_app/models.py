from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    birth_date = models.DateField(null=True, blank=True)

    def __str__(self):
        return f"{self.user.username} Profile"
    
class Album(models.Model):
    TOPIC_CHOICES = [
        ('nature', 'Природа'),
        ('travel', 'Подорож'),
        ('art', 'Мистецтво'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='albums')
    name = models.CharField(max_length=100)
    topic = models.CharField(default='nature', max_length=50, choices=TOPIC_CHOICES)
    year = models.PositiveIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} ({self.user.username})"
    
class Image(models.Model):
    album = models.ForeignKey(Album, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='album_images/')

    def __str__(self):
        return f"Image in {self.album.title}"