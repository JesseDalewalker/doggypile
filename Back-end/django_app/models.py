from django.db import models
from django.contrib.auth.models import User

class Marker(models.Model):
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    longitude = models.FloatField(null=True, blank=True, default=None)
    lattitude = models.FloatField(null=True, blank=True, default=None)
    time = models.DateTimeField(auto_now_add=True)


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile", primary_key=True)
    about = models.TextField(null=True, blank=True, default=None)
    gender = models.CharField(max_length=255)
    location = models.CharField(max_length=255)


class Dog(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="dog")
    name = models.CharField(max_length=255)
    gender = models.CharField(max_length=255)
    friendly_with = models.CharField(max_length=255)
    age = models.IntegerField()
    breed = models.CharField(max_length=255)
    size = models.CharField(max_length=255)
    vaccinated = models.BooleanField(default=False)