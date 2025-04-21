from django.db import models
from django.contrib.auth import get_user_model
from django.utils import timezone

User = get_user_model()

class Genre(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name

class Artist(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, blank=True)
    name = models.CharField(max_length=120)
    bio = models.TextField(blank=True)
    debut_year = models.PositiveIntegerField()
    photo = models.ImageField(upload_to='artists/', blank=True, null=True)
    genres = models.ManyToManyField(Genre, blank=True, related_name='artists')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class Album(models.Model):
    title = models.CharField(max_length=160)
    released_at = models.DateField(default=timezone.now)
    artist = models.ForeignKey(Artist, related_name="albums", on_delete=models.CASCADE)
    cover = models.ImageField(upload_to='albums/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title} ({self.artist.name})"

class Song(models.Model):
    title = models.CharField(max_length=255)
    duration = models.PositiveIntegerField(help_text="Duration in seconds")
    album = models.ForeignKey(Album, on_delete=models.CASCADE, related_name='songs', blank=True, null=True)
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE, related_name='songs')
    genres = models.ManyToManyField(Genre, related_name='songs')
    audio_file = models.FileField(upload_to='songs/')
    is_published = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

class Video(models.Model):
    song = models.OneToOneField(Song, related_name="video", on_delete=models.CASCADE)
    url = models.URLField()
    uploaded_by = models.ForeignKey(User, related_name="videos", on_delete=models.CASCADE)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Video for {self.song.title}"