import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-artist-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './artist-card.component.html'
})
export class ArtistCardComponent {
  @Input() artist!: { name: string; debut_year: number };
}


