from django.contrib import admin
from .models import *

admin.site.register([Marker, UserProfile, Dog, Post, Comment])

# Register your models here.
