from rest_framework import viewsets, permissions
from .models import Artist, Album, Song, Video, Genre
from .serializers import (
    ArtistSerializer, AlbumSerializer,
    SongSerializer, VideoSerializer,
    UserRegisterSerializer, GenreSerializer
)
from rest_framework.generics import CreateAPIView
from django.contrib.auth import get_user_model

User = get_user_model()

class UserRegisterView(CreateAPIView):
    serializer_class = UserRegisterSerializer
    permission_classes = [permissions.AllowAny]

class GenreViewSet(viewsets.ModelViewSet):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class ArtistViewSet(viewsets.ModelViewSet):
    queryset = Artist.objects.all()
    serializer_class = ArtistSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        if self.request.user.is_authenticated:
            serializer.save(user=self.request.user)

class AlbumViewSet(viewsets.ModelViewSet):
    queryset = Album.objects.all()
    serializer_class = AlbumSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        queryset = super().get_queryset()
        artist_id = self.request.query_params.get('artist_id')
        if artist_id:
            queryset = queryset.filter(artist_id=artist_id)
        return queryset

    def perform_create(self, serializer):
        if hasattr(self.request.user, 'artist'):
            serializer.save(artist=self.request.user.artist)

class SongViewSet(viewsets.ModelViewSet):
    queryset = Song.objects.select_related('album', 'artist')
    serializer_class = SongSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        queryset = super().get_queryset()
        album_id = self.request.query_params.get('album_id')
        artist_id = self.request.query_params.get('artist_id')
        genre_id = self.request.query_params.get('genre_id')
        
        if album_id:
            queryset = queryset.filter(album_id=album_id)
        if artist_id:
            queryset = queryset.filter(artist_id=artist_id)
        if genre_id:
            queryset = queryset.filter(genres__id=genre_id)
        return queryset

class VideoViewSet(viewsets.ModelViewSet):
    serializer_class = VideoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Video.objects.filter(uploaded_by=self.request.user)

    def perform_create(self, serializer):
        serializer.save(uploaded_by=self.request.user)