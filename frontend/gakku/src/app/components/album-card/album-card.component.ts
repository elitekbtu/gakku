import { Component, Input } from '@angular/core';
import { Album, Artist } from '../../models';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-album-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './album-card.component.html',
  styles: []
})
export class AlbumCardComponent {
  @Input() album!: Album;

  getCoverUrl(cover: string | undefined): string {
    if (!cover) return '';
    return cover.startsWith('http') ? cover : `http://localhost:8000${cover}`;
  }

  getArtistName(): string {
    if (typeof this.album.artist === 'object') {
      return (this.album.artist as Artist).name;
    }
    return 'Unknown Artist';
  }
}