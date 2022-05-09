from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register("users", UserViewset, basename="user")
router.register("user_profile", UserProfileViewset, basename="user_profile")
router.register("dogs", DogViewset, basename="dog")
router.register("marker", MarkerViewset, basename="marker")
router.register("post", PostViewset, basename="post")
router.register("comment", CommentViewset, basename="comment")
router.register("invite", InviteViewset, basename="invite")


urlpatterns = [
    path('', include(router.urls)),
    path("login/", handle_login),
    path("logout/", handle_logout)
]