from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ArtistViewSet,
    AlbumViewSet,
    SongViewSet,
    UserRegisterView,
    genre_list_create,
    video_list_create,
)

router = DefaultRouter()
router.register(r'artists', ArtistViewSet, basename='artist')
router.register(r'albums', AlbumViewSet, basename='album')
router.register(r'songs', SongViewSet, basename='song')


urlpatterns = [
    path('register/', UserRegisterView.as_view(), name='user-register'),
    path('genres/', genre_list_create, name='genre-list-create'),
    path('videos/', video_list_create, name='video-list-create'),
    path('', include(router.urls)),
]
