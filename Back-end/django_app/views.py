from rest_framework.viewsets import ModelViewSet
from rest_framework import permissions
from .serializers import *
from .views_auth import *

class UserViewset(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
    def get_permissions(self):
        if self.request.method == "POST":  # if the user is making a POST request it means they're signing up 
            return (permissions.AllowAny(),)  # this lets unauthorized users make POST request i.e. sign up, login, logout
        elif self.request.method == "PATCH":
            return (permissions.IsAuthenticated(),)
        elif self.request.method == "GET":
            return (permissions.AllowAny(),)
        return (permissions.IsAdminUser(),) 

class UserProfileViewset(ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer

    def perform_update(self, serializer):
        print("USER:", self.request.user)
        return super().perform_update(serializer)

    def get_permissions(self):
        if self.request.method == "GET":
            return (permissions.AllowAny(),)
        # elif self.request.method == "POST":
        #     return (permissions.AllowAny(),)
        elif self.request.method == "DELETE":
            return (permissions.IsAuthenticated(),)
        elif self.request.method == "PATCH":
            return (permissions.IsAuthenticated(),)
        return (permissions.AllowAny(),)

class DogViewset(ModelViewSet):
    queryset = Dog.objects.all()
    serializer_class = DogSerializer

    def perform_update(self, serializer):
        print("USER:", self.request.user)
        return super().perform_update(serializer)

    def get_permissions(self):
        if self.request.method == "GET":
            return (permissions.AllowAny(),)
        # elif self.request.method == "POST":
        #     return(permissions.IsAuthenticated(),)
        elif self.request.method == "DELETE":
            return (permissions.IsAuthenticated(),)
        elif self.request.method == "PATCH":
            return (permissions.IsAuthenticated(),)
        return (permissions.IsAuthenticatedOrReadOnly(),)  

class MarkerViewset(ModelViewSet):
    queryset = Marker.objects.all()
    serializer_class = MarkerSerializer

class PostViewset(ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class CommentViewset(ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

class InviteViewset(ModelViewSet):
    queryset = Invite.objects.all()
    serializer_class = InviteSerializer
    
    def get_permissions(self):
        if self.request.method == 'POST':
            return (permissions.AllowAny(),)
        elif self.request.method == "GET":
            return (permissions.AllowAny(),)