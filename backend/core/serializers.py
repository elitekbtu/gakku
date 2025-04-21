from rest_framework import serializers
from .models import Artist, Album, Song, Video, Genre
from django.contrib.auth import get_user_model

User = get_user_model()

class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = ['username', 'email', 'password']
    
    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email'),
            password=validated_data['password']
        )
        return user

class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ['id', 'name']

class ArtistSerializer(serializers.ModelSerializer):
    genres = GenreSerializer(many=True, read_only=True)
    
    class Meta:
        model = Artist
        fields = ['id', 'user', 'name', 'bio', 'debut_year', 'photo', 'genres', 'created_at', 'updated_at']
        read_only_fields = ('user', 'created_at', 'updated_at')

class AlbumSerializer(serializers.ModelSerializer):
    artist = ArtistSerializer(read_only=True) 
    class Meta:
        model = Album
        fields = '__all__'

class SongSerializer(serializers.ModelSerializer):
    album = AlbumSerializer(read_only=True)
    artist = ArtistSerializer(read_only=True)
    genres = GenreSerializer(many=True, read_only=True)
    
    class Meta:
        model = Song
        fields = ['id', 'title', 'duration', 'album', 'artist', 'genres', 'audio_file', 
                 'is_published', 'created_at', 'updated_at']
        read_only_fields = ('created_at', 'updated_at')

class VideoSerializer(serializers.ModelSerializer):
    uploaded_by = serializers.StringRelatedField()
    
    class Meta:
        model = Video
        fields = ['id', 'song', 'url', 'uploaded_by', 'uploaded_at']
        read_only_fields = ('uploaded_by', 'uploaded_at')