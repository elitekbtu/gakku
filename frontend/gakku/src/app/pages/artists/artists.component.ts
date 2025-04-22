import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { Artist } from '../../models';
import { finalize } from 'rxjs/operators';
import { ArtistCardComponent } from '../../components/artist-card/artist-card.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-artists',
  standalone: true,
  imports: [CommonModule, RouterModule, ArtistCardComponent, FormsModule],
  templateUrl: './artists.component.html',
  styles: []
})
export class ArtistsComponent implements OnInit {
  artists: Artist[] = [];
  filteredArtists: Artist[] = [];
  isLoading: boolean = true;
  error: string | null = null;
  selectedGenreIds: number[] = [];
  genres: any[] = [];
  searchQuery: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadArtists();
    this.loadGenres();
  }

  loadArtists(): void {
    this.isLoading = true;
    this.error = null;
    
    this.apiService.getArtists()
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (response) => {
          this.artists = response;
          this.filteredArtists = [...this.artists];
        },
        error: (error) => {
          console.error('Error loading artists:', error);
          this.error = 'Failed to load artists. Please try again.';
        }
      });
  }

  loadGenres(): void {
    this.apiService.getGenres().subscribe({
      next: (response) => {
        this.genres = response;
      },
      error: (error) => {
        console.error('Error loading genres:', error);
      }
    });
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

  onSearchChange(): void {
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredArtists = this.artists.filter(artist => {
      const matchesSearch = !this.searchQuery || 
        artist.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        (artist.bio && artist.bio.toLowerCase().includes(this.searchQuery.toLowerCase()));
      
      const matchesGenres = this.selectedGenreIds.length === 0 ||
        (artist.genres && artist.genres.some(genre => 
          this.selectedGenreIds.includes(genre.id)));
      
      return matchesSearch && matchesGenres;
    });
  }

  clearFilters(): void {
    this.selectedGenreIds = [];
    this.searchQuery = '';
    this.filteredArtists = [...this.artists];
  }
}