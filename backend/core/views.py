from rest_framework import viewsets, permissions, status
from rest_framework.generics import CreateAPIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.contrib.auth import get_user_model

from .models import Artist, Album, Song, Video, Genre
from .serializers import (
    ArtistSerializer, AlbumSerializer,
    SongSerializer, VideoSerializer,
    UserRegisterSerializer, GenreSerializer
)

User = get_user_model()

class UserRegisterView(CreateAPIView):
    serializer_class = UserRegisterSerializer
    permission_classes = [permissions.AllowAny]

@api_view(['GET', 'POST'])
@permission_classes([permissions.IsAuthenticatedOrReadOnly])
def genre_list_create(request):
    if request.method == 'GET':
        genres = Genre.objects.all()
        serializer = GenreSerializer(genres, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = GenreSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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


@api_view(['GET', 'POST'])
@permission_classes([permissions.IsAuthenticated])
def video_list_create(request):
    if request.method == 'GET':
        videos = Video.objects.all()
        serializer = VideoSerializer(videos, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = VideoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(uploaded_by=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
