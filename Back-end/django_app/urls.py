from posixpath import basename
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register("users", UserViewset, basename="user")
router.register("user_profile", UserProfileViewset, basename="user_profile")
router.register("dogs", DogViewset, basename="dog")
router.register("marker", MarkerViewset, basename="marker")

urlpatterns = [
    path('', include(router.urls))
]