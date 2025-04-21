import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ApiService } from '../../service/api.service';
import { Artist, Album, Song } from '../../models';
import { CommonModule } from '@angular/common';
import { SongItemComponent } from '../../components/song-item/song-item.component';
import { AlbumCardComponent } from '../../components/album-card/album-card.component';
import { finalize } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-artist-details',
  standalone: true,
  imports: [CommonModule, RouterModule, SongItemComponent, AlbumCardComponent],
  templateUrl: './artist-detail.component.html',
  styles: []
})
export class ArtistDetailsComponent implements OnInit {
  artist: Artist | null = null;
  albums: Album[] = [];
  songs: Song[] = [];
  isLoading: boolean = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private location: Location 
  ) {}

  ngOnInit(): void {
    this.loadArtist();
  }

  loadArtist(): void {
    const artistId = this.route.snapshot.paramMap.get('id');
    if (!artistId) return;

    this.isLoading = true;
    this.error = null;

    this.apiService.getArtist(+artistId)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (artist) => {
          this.artist = artist;
          this.loadAlbums(+artistId);
          this.loadSongs(+artistId);
        },
        error: (err) => {
          console.error('Error loading artist:', err);
          this.error = 'Failed to load artist details.';
        }
      });
  }

  loadAlbums(artistId: number): void {
    this.apiService.getAlbums({ artist_id: artistId }).subscribe({
      next: (albums) => {
        this.albums = albums;
      },
      error: (err) => {
        console.error('Error loading albums:', err);
      }
    });
  }

  loadSongs(artistId: number): void {
    this.apiService.getSongs({ artist_id: artistId }).subscribe({
      next: (songs) => {
        this.songs = songs;
      },
      error: (err) => {
        console.error('Error loading songs:', err);
      }
    });
  }

  getPhotoUrl(photo: string): string {
    return photo.startsWith('http') ? photo : `http://localhost:8000${photo}`;
  }

  goBack(): void {
    this.location.back();
  }
}