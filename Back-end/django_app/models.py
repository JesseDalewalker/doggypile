from django.db import models
from django.contrib.auth.models import User

class Marker(models.Model):
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    longitude = models.FloatField(null=True, blank=True, default=None)
    lattitude = models.FloatField(null=True, blank=True, default=None)
    time = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, models.SET_NULL, null=True, blank=True, related_name="marker")

    def __str__(self):
       return f'User: {self.user}, Marker: {self.name}'


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile", primary_key=True)
    about = models.TextField(null=True, blank=True, default=None)
    gender = models.CharField(max_length=30)
    city = models.CharField(max_length=100, null=True, blank=True)
    state = models.CharField(max_length=100, null=True, blank=True)

    def __str__(self):
       return f'User: {self.user}, City: {self.city}'

class Dog(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="dog")
    name = models.CharField(max_length=255)
    gender = models.CharField(max_length=255)
    friendly_with = models.CharField(max_length=255)
    age = models.IntegerField()
    breed = models.CharField(max_length=255)
    size = models.CharField(max_length=255)
    vaccinated = models.BooleanField(default=False)

    def __str__(self):
       return f'User: {self.user}, Dog: {self.name}'

class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="post")
    headline = models.CharField(max_length=255)
    content = models.TextField()

    def __str__(self):
       return f'User: {self.user}, Post: {self.headline}'
class Comment(models.Model):
    user = models.ForeignKey(User, models.SET_NULL, blank=True, null=True, related_name="comment")
    comment = models.TextField()
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="comment", null=True)

    def __str__(self):
       return f'User: {self.user}, Post: {self.comment}'

