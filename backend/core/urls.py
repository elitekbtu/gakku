from django.urls import path
from .views import (
    ArtistListCreateView,
    AlbumListCreateView,
    SongListCreateView,
    VideoListCreateView,
    UserRegisterView
)

urlpatterns = [
    path('artists/', ArtistListCreateView.as_view(), name='artist-list'),
    path('albums/', AlbumListCreateView.as_view(), name='album-list'),
    path('songs/', SongListCreateView.as_view(), name='song-list'),
    path('videos/', VideoListCreateView.as_view(), name='video-list'),
    path('register/', UserRegisterView.as_view(), name='user-register'),
]