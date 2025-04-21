from django.contrib import admin
from .models import Artist, Album, Song, Video, Genre

class GenreAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)

class ArtistAdmin(admin.ModelAdmin):
    list_display = ('name', 'debut_year', 'user')
    search_fields = ('name',)
    list_filter = ('genres',)
    filter_horizontal = ('genres',)

class AlbumAdmin(admin.ModelAdmin):
    list_display = ('title', 'artist', 'released_at')
    list_filter = ('artist', 'released_at')
    search_fields = ('title', 'artist__name')

class SongAdmin(admin.ModelAdmin):
    list_display = ('title', 'album', 'artist', 'duration', 'is_published')
    list_filter = ('album__artist', 'is_published', 'genres')
    search_fields = ('title', 'album__title', 'artist__name')
    filter_horizontal = ('genres',)

class VideoAdmin(admin.ModelAdmin):
    list_display = ('song', 'uploaded_by', 'uploaded_at')
    readonly_fields = ('uploaded_at',)
    search_fields = ('song__title', 'uploaded_by__username')

admin.site.register(Genre, GenreAdmin)
admin.site.register(Artist, ArtistAdmin)
admin.site.register(Album, AlbumAdmin)
admin.site.register(Song, SongAdmin)
admin.site.register(Video, VideoAdmin)