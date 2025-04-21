import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../service/api.service';
import { Artist, Album, Song, Genre } from '../../models';
import { HttpClientModule } from '@angular/common/http';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  featuredArtists: Artist[] = [];
  popularAlbums: Album[] = [];
  latestSongs: Song[] = [];
  genres: Genre[] = [];
  isLoading = true;
  error: string | null = null;

  // Constants for display limits
  readonly ARTISTS_LIMIT = 6;
  readonly ALBUMS_LIMIT = 6;
  readonly SONGS_LIMIT = 8;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;
    this.error = null;

    // Use forkJoin to load all data in parallel
    forkJoin({
      genres: this.apiService.getGenres().pipe(
        catchError(err => this.handleError('genres', err))
      ),
      artists: this.apiService.getArtists().pipe(
        catchError(err => this.handleError('artists', err))
      ),
      albums: this.apiService.getAlbums().pipe(
        catchError(err => this.handleError('albums', err))
      ),
      songs: this.apiService.getSongs().pipe(
        catchError(err => this.handleError('songs', err))
      )
    }).subscribe({
      next: (results) => {
        this.genres = results.genres || [];
        this.featuredArtists = (results.artists || []).slice(0, this.ARTISTS_LIMIT);
        this.popularAlbums = (results.albums || []).slice(0, this.ALBUMS_LIMIT);
        this.latestSongs = (results.songs || []).slice(0, this.SONGS_LIMIT);
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load some data. Please try again later.';
        this.isLoading = false;
      }
    });
  }

  private handleError(context: string, error: any): Observable<null> {
    console.error(`Error loading ${context}:`, error);
    return of(null); // Return null to keep forkJoin working
  }

  formatDuration(duration: number): string {
    if (!duration) return '0:00';
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  getArtistName(artist: Artist | number): string {
    return typeof artist === 'object' ? artist.name : '';
  }

  getAlbumTitle(album: Album | number | undefined): string {
    if (!album) return 'Single';
    return typeof album === 'object' ? album.title : '';
  }
}