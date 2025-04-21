import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { PlayerService } from '../../service/player.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SongItemComponent } from '../../components/song-item/song-item.component'; 
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-songs',
  standalone: true,
  imports: [CommonModule, FormsModule, SongItemComponent],
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.css']
})
export class SongsComponent implements OnInit {
  songs: any[] = [];
  filteredSongs: any[] = [];
  genres: any[] = [];
  isLoading = false;
  error: string | null = null;
  searchQuery = '';
  selectedGenreIds: number[] = [];

  constructor(
    private apiService: ApiService,
    private playerService: PlayerService
  ) {}

  ngOnInit(): void {
    this.loadSongs();
    this.loadGenres();
  }

  loadSongs(): void {
    this.isLoading = true;
    this.error = null; 
    this.apiService.getSongs()
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (response) => {
          this.songs = response;
          this.filteredSongs = [...this.songs];
        },
        error: (error) => {
          console.error('Error loading songs:', error);
          this.error = 'Failed to load songs. Please try again.'; 
        }
      });
  }

  loadGenres(): void {
    this.apiService.getGenres().subscribe({
      next: (genres) => {
        this.genres = genres;
      },
      error: (error) => {
        console.error('Error loading genres:', error);
      }
    });
  }

  playSong(song: any, index: number): void {
    this.playerService.setPlaylist(this.filteredSongs, index);
    this.playerService.play();
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  onGenreFilterChange(genreId: number, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;

    if (isChecked) {
      this.selectedGenreIds.push(genreId);
    } else {
      this.selectedGenreIds = this.selectedGenreIds.filter(id => id !== genreId);
    }

    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredSongs = this.songs.filter(song => {
      const matchesSearch = this.searchQuery === '' ||
        song.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        (song.artist?.name && song.artist.name.toLowerCase().includes(this.searchQuery.toLowerCase())) ||
        (song.album?.title && song.album.title.toLowerCase().includes(this.searchQuery.toLowerCase()));
      const matchesGenre = this.selectedGenreIds.length === 0 ||
        (song.genres && song.genres.some((genre: any) => this.selectedGenreIds.includes(genre.id)));

      return matchesSearch && matchesGenre;
    });
  }

  clearFilters(): void {
    this.searchQuery = '';
    this.selectedGenreIds = [];
    this.applyFilters();
  }
}