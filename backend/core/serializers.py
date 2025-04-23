from rest_framework import serializers
from .models import Artist, Album, Song, Video, Genre
from django.contrib.auth import get_user_model

User = get_user_model()


class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'confirm_password']
    
    def validate(self, data):
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError("Passwords don't match")
        return data
    
    def create(self, validated_data):
        validated_data.pop('confirm_password')
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email'),
            password=validated_data['password']
        )
        return user

# Serializer 1
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)
    
    def validate(self, data):
        username = data.get('username')
        password = data.get('password')
        
        if not username or not password:
            raise serializers.ValidationError("Both username and password are required")
        return data

# ModelSerializer 2
class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ['id', 'name']

# Serializer 2
class StatsSerializer(serializers.Serializer):
    artist_count = serializers.IntegerField()
    album_count = serializers.IntegerField()
    song_count = serializers.IntegerField()
    
    def to_representation(self, instance):
        return {
            'artist_count': instance['artist_count'],
            'album_count': instance['album_count'],
            'song_count': instance['song_count'],
        }

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