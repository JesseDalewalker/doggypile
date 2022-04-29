from rest_framework import serializers
from .models import *
from django.contrib.auth.hashers import make_password

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'first_name', 'last_name', 'email']
    
    password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        validated_data["password"] = make_password(validated_data["password"])
        print(validated_data)
        return super().create(validated_data)


class DogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dog
        fields = '__all__'


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = '__all__'

class MarkerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Marker
        fields = '__all__'