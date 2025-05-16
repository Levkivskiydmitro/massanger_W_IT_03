from django.db import models
from django.contrib.auth.models import User 

TAG_VARIANTS = [
    ('відпочинок', 'відпочинок'),
    ('натхнення', 'натхнення'),
    ('життя', 'життя'),
    ('природа', 'природа'),
    ('читання', 'читання'),
    ('спокій', 'спокій'),
    ('гармонія', 'гармонія'),
    ('музика', 'музика'),
    ('фільми', 'фільми'),
    ('подорожі', 'подорожі'),
]

class User_Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length= 100, null=False)
    description = models.CharField(max_length=255, null=True)
    topic = models.CharField(max_length= 100, null=False)
    tags = models.CharField(max_length=20, choices=TAG_VARIANTS)
    link = models.URLField(max_length=200, null=True, blank=True)
    img = models.ImageField(upload_to='post_images/', null=True, blank=True)
    views = models.PositiveIntegerField(default=0)
    likes = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.name