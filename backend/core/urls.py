from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    AlbumListCreateView,
    SongListCreateView,
    VideoListCreateView,
    UserRegisterView,
    ArtistViewSet,
    GenreListView
)

router = DefaultRouter()
router.register(r'artists', ArtistViewSet)  #

urlpatterns = [
    path('albums/', AlbumListCreateView.as_view(), name='album-list'),
    path('songs/', SongListCreateView.as_view(), name='song-list'),
    path('videos/', VideoListCreateView.as_view(), name='video-list'),
    path('register/', UserRegisterView.as_view(), name='user-register'),
     path('genres/', GenreListView.as_view(), name='genre-list'),
    
    path('', include(router.urls)), 
]
