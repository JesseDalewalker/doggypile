from django.shortcuts import render
from .serializers import *
from rest_framework.viewsets import ModelViewSet
from rest_framework import permissions

class UserViewset(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
    # def get_permissions(self):
    #     if self.request.method == "POST":  # if the user is making a POST request it means they're signing up 
    #         return (permissions.AllowAny(),)  # this lets unauthorized users make POST request i.e. sign up, login, logout
    #     return (permissions.IsAdminUser(),) # this makes sure that only admin users have access to CRUD users i.e. if submitting a request other than a POST request 

class UserProfileViewset(ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer    


class DogViewset(ModelViewSet):
    queryset = Dog.objects.all()
    serializer_class = DogSerializer

class MarkerViewset(ModelViewSet):
    queryset = Marker.objects.all()
    serializer_class = MarkerSerializer