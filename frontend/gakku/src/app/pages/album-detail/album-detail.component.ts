import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ApiService } from '../../service/api.service';
import { Album, Song } from '../../models';
import { CommonModule } from '@angular/common';
import { SongItemComponent } from '../../components/song-item/song-item.component';
import { finalize } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-album-detail',
  standalone: true,
  imports: [CommonModule, SongItemComponent, RouterModule],
  templateUrl: './album-detail.component.html',
  styleUrls: ['./album-detail.component.css']
})
export class AlbumDetailComponent implements OnInit {
  album: Album | null = null;
  songs: Song[] = [];
  isLoading: boolean = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.loadAlbum();
  }

  loadAlbum(): void {
    const albumId = Number(this.route.snapshot.paramMap.get('id'));
    if (!albumId) return;

    this.isLoading = true;
    this.error = null;

    this.api.getAlbum(albumId)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (album) => {
          this.album = album;
          this.loadSongs(albumId);
        },
        error: (err) => {
          console.error('Error loading album:', err);
          this.error = 'Failed to load album details.';
        }
      });
  }

  loadSongs(albumId: number): void {
    this.api.getSongs({ album_id: albumId }).subscribe({
      next: (songs) => {
        this.songs = songs;
      },
      error: (err) => {
        console.error('Error loading songs:', err);
      }
    });
  }

  getCoverUrl(): string {
    if (!this.album?.cover) return '';
    return this.album.cover.startsWith('http')
      ? this.album.cover
      : `http://localhost:8000${this.album.cover}`;
  }

  getArtistName(): string {
    return this.album?.artist?.name || 'Unknown Artist';
  }

  goBack(): void {
    this.location.back();
  }
}