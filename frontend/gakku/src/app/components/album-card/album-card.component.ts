import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-album-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './album-card.component.html'
})
export class AlbumCardComponent {
  @Input() album!: { title: string; released_at: string };
}

