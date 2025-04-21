from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ArtistViewSet,
    AlbumViewSet,
    SongViewSet,
    VideoViewSet,
    GenreViewSet,
    UserRegisterView
)

router = DefaultRouter()
router.register(r'artists', ArtistViewSet, basename='artist')
router.register(r'albums', AlbumViewSet, basename='album')
router.register(r'songs', SongViewSet, basename='song')
router.register(r'videos', VideoViewSet, basename='video')
router.register(r'genres', GenreViewSet, basename='genre')

urlpatterns = [
    path('register/', UserRegisterView.as_view(), name='user-register'),
    path('', include(router.urls)),
]