import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { Album, Artist } from '../../models';
import { finalize } from 'rxjs/operators';
import { AlbumCardComponent } from '../../components/album-card/album-card.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-albums',
  standalone: true,
  imports: [CommonModule, RouterModule, AlbumCardComponent, FormsModule],
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {
  albums: Album[] = [];
  filteredAlbums: Album[] = [];
  isLoading: boolean = true;
  error: string | null = null;
  searchQuery: string = '';

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadAlbums();
  }

  loadAlbums(): void {
    this.isLoading = true;
    this.error = null;
    
    this.api.getAlbums()
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (response) => {
          this.albums = response;
          this.filteredAlbums = [...this.albums];
        },
        error: (error) => {
          console.error('Error loading albums:', error);
          this.error = 'Failed to load albums. Please try again.';
        }
      });
  }

  onSearchChange(): void {
    this.filteredAlbums = this.albums.filter(album => {
      const artistName = typeof album.artist === 'object' 
        ? (album.artist as Artist).name 
        : '';
      
      return !this.searchQuery || 
        album.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        artistName.toLowerCase().includes(this.searchQuery.toLowerCase());
    });
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.filteredAlbums = [...this.albums];
  }
}