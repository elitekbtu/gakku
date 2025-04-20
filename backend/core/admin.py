from django.contrib import admin
from .models import Artist, Album, Song, Video,Genre

@admin.register(Artist)
class ArtistAdmin(admin.ModelAdmin):
    list_display = ('name', 'debut_year')
    search_fields = ('name',)

@admin.register(Album)
class AlbumAdmin(admin.ModelAdmin):
    list_display = ('title', 'artist', 'released_at')
    list_filter = ('artist',)

@admin.register(Song)
class SongAdmin(admin.ModelAdmin):
    list_display = ('title', 'album', 'duration')
    list_filter = ('album__artist', 'is_published')

@admin.register(Video)
class VideoAdmin(admin.ModelAdmin):
    list_display = ('song', 'uploaded_by', 'uploaded_at')
    readonly_fields = ('uploaded_at',)

admin.site.register(Genre)