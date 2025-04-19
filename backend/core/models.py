from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Artist(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='artist')
    name = models.CharField(max_length=120)
    bio = models.TextField(blank=True)
    debut_year = models.PositiveIntegerField()

    def __str__(self):
        return self.name

class Album(models.Model):
    title = models.CharField(max_length=160)
    released_at = models.DateField()
    artist = models.ForeignKey(Artist, related_name="albums", on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.title} ({self.artist.name})"

class Song(models.Model):
    title = models.CharField(max_length=160)
    album = models.ForeignKey(Album, related_name="songs", on_delete=models.CASCADE)
    duration = models.PositiveIntegerField(help_text="Duration in seconds")
    is_published = models.BooleanField(default=False)

    def __str__(self):
        return self.title

class Video(models.Model):
    song = models.OneToOneField(Song, related_name="video", on_delete=models.CASCADE)
    url = models.URLField()
    uploaded_by = models.ForeignKey(User, related_name="videos", on_delete=models.CASCADE)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Video for {self.song.title}"