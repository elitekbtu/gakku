// src/app/components/artist-card/artist-card.component.ts
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Artist } from '../../models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-artist-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './artist-card.component.html',
  styles: []
})
export class ArtistCardComponent {
  @Input() artist!: Artist;
  @Input() showDetails: boolean = false;

  getPhotoUrl(photo: string): string {
    return photo.startsWith('http') ? photo : `http://localhost:8000${photo}`;
  }
}